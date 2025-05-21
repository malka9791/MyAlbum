using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.Services
{
    public interface IReplicateService
    {
         Task<string> GenerateImageAsync(string imageUrl);

    }
}
