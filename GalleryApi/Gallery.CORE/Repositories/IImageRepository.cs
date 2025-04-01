using Gallery.CORE.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.Repositories
{
    public interface IImageRepository
    {
       IEnumerable<Image> GetImagesByAlbumId(int  albumId);
    }
}
