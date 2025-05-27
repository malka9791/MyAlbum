using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.Models
{
    public class AiAnalysisResult
    {
        public string DecoratedUrl { get; set; }

        public string? Suggestion { get; set; }

        public AiAnalysisResult(string? decoratedUrl, string? suggestion)
        {
            DecoratedUrl = decoratedUrl;
            Suggestion = suggestion;
        }
    }
}
