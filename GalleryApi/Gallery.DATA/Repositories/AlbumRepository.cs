using Gallery.CORE.models;
using Gallery.CORE.Repositories;
using Microsoft.EntityFrameworkCore;
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
        public IEnumerable<Album> GetAlbumOfUser(int UserId)
        {
            return this._dbSet
                .Include(a => a.Images)
                .Where(a => a.UserId == UserId)
                .AsNoTracking()
                .ToList();
        }

        public async Task<Album> GetAlbum(int id)
        {
            return await this._dbSet
                .Include(a => a.Images)
                    .ThenInclude(i => i.Tag) // ← זה מוסיף את ה-Tag של כל תמונה
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == id);
        }

    }
}
