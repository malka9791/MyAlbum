using Gallery.CORE.Services;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

public class HuggingFaceService:IHuggingFaceService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public HuggingFaceService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _apiKey = Environment.GetEnvironmentVariable("HU_AI")!;
    }

    public async Task<string?> EnhanceImageAsync(string imagePath)
    {
        var modelUrl = "https://api-inference.huggingface.co/models/microsoft/bringing-old-photos-back-to-life";
        var apiKey = Environment.GetEnvironmentVariable("HU_AI")!;

        using var request = new HttpRequestMessage(HttpMethod.Post, modelUrl);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

        var imageBytes = await File.ReadAllBytesAsync(imagePath);
        request.Content = new ByteArrayContent(imageBytes);
        request.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");

        var response = await _httpClient.SendAsync(request);

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            throw new Exception($"HuggingFace API Error: {response.StatusCode} - {error}");
        }

        var enhancedBytes = await response.Content.ReadAsByteArrayAsync();
        var fileName = $"enhanced_{Guid.NewGuid()}.jpg";
        var filePath = Path.Combine("wwwroot", "images", fileName);
        await File.WriteAllBytesAsync(filePath, enhancedBytes);

        return $"/images/{fileName}";
    }


}
