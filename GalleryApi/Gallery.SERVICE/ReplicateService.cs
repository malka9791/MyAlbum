using Gallery.CORE.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Gallery.SERVICE
{

    public class ReplicateService:IReplicateService
    {
        private readonly HttpClient _httpClient;
        private static readonly string ReplicateToken = Environment.GetEnvironmentVariable("TOKEN_AI");
        private const string ModelVersion = "a7d8e6c0b9e959ce530fb772743eddf2469eebde08759ef8920cd6d5f047102f"; // לדוגמה בלבד

        public ReplicateService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Token", ReplicateToken);
        }

        public async Task<string> GenerateImageAsync(string imageUrl)
        {
            var requestBody = new
            {
                version = ModelVersion,
                input = new
                {
                    image = imageUrl,
                    scale = 2,
                    face_enhance = true
                }
            };

            var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("https://api.replicate.com/v1/predictions", content);
            if (!response.IsSuccessStatusCode)
                throw new Exception("Failed to start prediction: " + await response.Content.ReadAsStringAsync());

            using var resultJson = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
            var predictionId = resultJson.RootElement.GetProperty("id").GetString();

            // Polling
            while (true)
            {
                await Task.Delay(2000);

                var pollRes = await _httpClient.GetAsync($"https://api.replicate.com/v1/predictions/{predictionId}");
                var pollJson = JsonDocument.Parse(await pollRes.Content.ReadAsStringAsync());
                var status = pollJson.RootElement.GetProperty("status").GetString();

                if (status == "succeeded")
                {
                    var output = pollJson.RootElement.GetProperty("output")[0].GetString();
                    return output;
                }

                if (status == "failed")
                {
                    throw new Exception("Replicate prediction failed.");
                }
            }
        }
    }
}

