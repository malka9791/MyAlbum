using Gallery.CORE.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.Services
{
    public interface IImageService : IRepositoryService<Image>
    {
        Task<IEnumerable<Image>> GetImagesByAlbumIdAsync(int albumId);
    }
}
