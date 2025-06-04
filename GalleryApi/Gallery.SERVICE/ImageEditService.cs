using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
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
            new { role = "system", content = "אתה עוזר גרפי מוסמך. לפי תיאור טקסטואלי של תמונה, תציע אלמנט גרפי (אימוג'י, טקסט, מסגרת) לדוגמה  בלון לב סמיילי או כיתוב אבל אני כן מעדיף שיהיה משהו שלא דוקא כיתוב.  אם אתה כותב כיתוב שיהיה מקסימום 2 מילים ותכתוב אותו באותיות גדולות באנגלית, כלשהו להוסיף לתמונה.." },
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
        string englishText = "";
        if (doc.RootElement.TryGetProperty("choices", out var choicesElement) &&
            choicesElement.GetArrayLength() > 0 &&
            choicesElement[0].TryGetProperty("message", out var messageElement) &&
            messageElement.TryGetProperty("content", out var contentElement))
        {

            suggestion = contentElement.GetString()?.ToLower() ?? "";
            var match = Regex.Match(suggestion, @"[a-z\s]+");
            if (match.Success)
            {
                englishText = match.Value.Trim();
            }

            // 2. תרגום ההצעה לטרנספורמציה ב־Cloudinary
            string lower = suggestion?.ToLower() ?? "";

            transformation =
          lower.Contains("heart") || lower.Contains("לב") ? "l_emoji_heart_diy6wg,w_300,g_south_east" :
          lower.Contains("smile") || lower.Contains("סמיילי") ? "l_smile_n6jsyt,w_400,g_south_east" :
          !string.IsNullOrWhiteSpace(englishText) ? $"l_text:Arial_100:{englishText},co_white,g_south" :
          lower.Contains("frame") || lower.Contains("מסגרת") ? "l_frame_xqrskn,w_1.0,h_1.0,g_center,fl_relative" :
          lower.Contains("balloon") || lower.Contains("בלון") ? "l_ballon_o8qebf,w_300,g_south_west" :
          "";



        }
        else
        {
            throw new Exception("תשובת ה־AI לא הכילה מבנה צפוי. התגובה הייתה:\n" + responseContent);
        }

        Console.WriteLine("Image URL: " + imageUrl);

        if (string.IsNullOrEmpty(transformation))
            return new AiAnalysisResult(imageUrl, $"{suggestion} ");
        ;
        await Console.Out.WriteLineAsync(transformation);

        // 3. יצירת URL חדש עם טרנספורמציה מסוג fetch
        var cloudName = _config["Cloudinary:CloudName"];
        var encodedImageUrl = Uri.EscapeDataString(imageUrl);
        var decoratedUrl = $"https://res.cloudinary.com/{cloudName}/image/fetch/{transformation}/{encodedImageUrl}";

        AiAnalysisResult res = new AiAnalysisResult(decoratedUrl, $"{suggestion} ");
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
