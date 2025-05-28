using Gallery.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.Services
{
    public interface IAiService
    {
        Task<AiAnalysisResult> AnalyzeImageDescriptionAsync(string descriptionText);

    }
}
