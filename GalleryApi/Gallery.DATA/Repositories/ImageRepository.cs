using Gallery.CORE.models;
using Gallery.CORE.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.DATA.Repositories
{
    public class ImageRepository:Repository<Image>,IImageRepository
    {
        public ImageRepository(DataContext context):base(context){ }
        public IEnumerable<Image> GetImagesByAlbumId(int albumId)
        {
            return this._dbSet.Where(i=>i.AlbumId == albumId).ToList();
        }
        public IEnumerable<Image> GetImagesByUserId(int userId)
        {
            return this._dbSet.Where(i=>i.UserId == userId).ToList();
        }

    }
}
