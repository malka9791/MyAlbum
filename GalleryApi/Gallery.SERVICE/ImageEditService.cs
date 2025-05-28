using System.Net.Http;
using System.Text;
using System.Text.Json;
using Gallery.CORE.Models;
using Gallery.CORE.Services;
using Microsoft.Extensions.Configuration;

public class ImageEditService : IImageEditService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;
    private readonly string _apiKey = Environment.GetEnvironmentVariable("API_KEY");


    public ImageEditService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }

    public async Task<AiAnalysisResult> AnalyzeAndDecorateImageAsync(string imageUrl, string description)
    {
        // 1. קריאה ל־OpenAI
        var request = new
        {
            model = "gpt-4o-mini",
            messages = new[]
            {
            new { role = "system", content = "אתה עוזר גרפי מוסמך. לפי תיאור טקסטואלי של תמונה, תציע אלמנט גרפי (אימוג'י, טקסט, מסגרת) לדוכמא שמש לב סמיילי או כיתוב כלשהו להוסיף לתמונה." },
            new { role = "user", content = $"התיאור של התמונה הוא: {description}. מה כדאי להוסיף כאלמנט גרפי?" }
        }
        };

        var json = JsonSerializer.Serialize(request);
        var httpRequest = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions");
        httpRequest.Headers.Add("Authorization", $"Bearer {_apiKey}");
        httpRequest.Content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await _httpClient.SendAsync(httpRequest);
        var responseContent = await response.Content.ReadAsStringAsync();
        await Console.Out.WriteLineAsync(responseContent);
        string transformation = "";
        var suggestion = "";
        using var doc = JsonDocument.Parse(responseContent);
        if (doc.RootElement.TryGetProperty("choices", out var choicesElement) &&
            choicesElement.GetArrayLength() > 0 &&
            choicesElement[0].TryGetProperty("message", out var messageElement) &&
            messageElement.TryGetProperty("content", out var contentElement))
        {
            suggestion = contentElement.GetString()?.ToLower() ?? "";

            // 2. תרגום ההצעה לטרנספורמציה ב־Cloudinary
            string lower = suggestion?.ToLower() ?? "";

            transformation =
            lower.Contains("heart") || lower.Contains("לב") ? "l_emoji_heart_diy6wg,w_300,g_south_east" :
            lower.Contains("text") || lower.Contains("טקסט") ? "l_text:Arial_60:Hello!,co_white,g_south" :
            lower.Contains("star") || lower.Contains("כוכב") ? "l_star_icon,w_400,h_400,g_north_west" :
            lower.Contains("smile") || lower.Contains("חיוך") ? "smile,w_400,g_south_east" :
            lower.Contains("frame") || lower.Contains("מסגרת") ? "l_frames:fancy_border,g_center" :
            lower.Contains("party") || lower.Contains("מסיבה") ? "l_party_icon,w_300,g_center" :
            lower.Contains("flower") || lower.Contains("פרח") ? "l_flower_icon,w_400,h_400,g_north" :
            lower.Contains("balloon") || lower.Contains("בלון") ? "l_balloon_icon,w_300,g_south_west" :
            lower.Contains("gift") || lower.Contains("מתנה") ? "l_gift_icon,w_350,g_south_east" :
            lower.Contains("love") || lower.Contains("אהבה") ? "l_text:Arial_50:Love,co_red,g_center" :
            "";


        }
        else
        {
            throw new Exception("תשובת ה־AI לא הכילה מבנה צפוי. התגובה הייתה:\n" + responseContent);
        }

        Console.WriteLine("Image URL: " + imageUrl);

        if (string.IsNullOrEmpty(transformation))
            return new AiAnalysisResult(imageUrl, suggestion);
        ;

        // 3. יצירת URL חדש עם טרנספורמציה מסוג fetch
        var cloudName = _config["Cloudinary:CloudName"];
        var encodedImageUrl = Uri.EscapeDataString(imageUrl);
        var decoratedUrl = $"https://res.cloudinary.com/{cloudName}/image/fetch/{transformation}/{encodedImageUrl}";

        AiAnalysisResult res= new AiAnalysisResult(decoratedUrl, suggestion);
        return res;
    }

    private string GetPublicIdFromUrl(string imageUrl)
    {
        try
        {
            var uri = new Uri(imageUrl);
            var path = uri.AbsolutePath;

            var index = path.IndexOf("/upload/");
            if (index == -1)
                return null;

            var publicId = path.Substring(index + "/upload/".Length);

            // הסר סיומות קובץ
            publicId = publicId.Replace(".jpg", "")
                               .Replace(".jpeg", "")
                               .Replace(".png", "")
                               .Replace(".webp", "")
                               .Replace(".JPG", "");

            return publicId.Trim('/');
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error in GetPublicIdFromUrl: " + ex.Message);
            return null;
        }
    }

}
