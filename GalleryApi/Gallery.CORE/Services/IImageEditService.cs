﻿using Gallery.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.Services
{
    public interface IImageEditService
    {
        Task<AiAnalysisResult> AnalyzeAndDecorateImageAsync(string imageUrl, string description);

    }


}
