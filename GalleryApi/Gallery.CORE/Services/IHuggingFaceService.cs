using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.Services
{
    public interface IHuggingFaceService
    {
        Task<string> EnhanceImageAsync(string imageUrl);
    }
}
