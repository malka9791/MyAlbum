using Gallery.CORE.models;
using Gallery.CORE.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.DATA.Repositories
{
    public class AlbumRepository:Repository<Album>,IAlbumRepository
    {
        public AlbumRepository(DataContext context):base(context) { }
        public  IEnumerable<Album> GetAlbumOfUser(int UserId)
        {
            return this._dbSet.Where(a => a.UserId == UserId).ToList();
        }
      
    }
}
