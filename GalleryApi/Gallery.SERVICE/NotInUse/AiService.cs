using Gallery.CORE.Models;
using System.Text.Json;
using System.Text;
using Gallery.CORE.Services;

public class AiService : IAiService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public AiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _apiKey = Environment.GetEnvironmentVariable("API_KEY");
    }

    public async Task<AiAnalysisResult> AnalyzeImageDescriptionAsync(string descriptionText)
    {
        if (string.IsNullOrWhiteSpace(_apiKey))
            throw new InvalidOperationException("Missing OpenAI API key.");

        _httpClient.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _apiKey);

        var prompt = $" בהתבסס על התיאור הבא של תמונה, כתוב סיפור קצר או תיאור מורחב שמרחיב את הדמיון סביב התמונה ברוח יהודית:\n\n\"{descriptionText}\"";

        var requestBody = new
        {
            model = "gpt-4o-mini",
            messages = new[]
            {
            new {
                role = "user",
                content = prompt
            }
        },
            max_tokens = 300
        };

        var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
        var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();
        var result = JsonDocument.Parse(json);
        var text = result.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString();

        //return new AiAnalysisResult
        //{
        //    Description = text,
        //    Emotions = ExtractEmotions(text)
        //};
        return null;
    }
    private List<string> ExtractEmotions(string text)
    {
        var knownEmotions = new[] { "שמח", "עצוב", "כועס", "מפוחד", "מופתע", "נרגש", "עייף", "שליו", "מתוח" };
        var emotions = new List<string>();

        foreach (var emotion in knownEmotions)
        {
            if (text.Contains(emotion, StringComparison.OrdinalIgnoreCase))
                emotions.Add(emotion);
        }

        return emotions;
    }


}
