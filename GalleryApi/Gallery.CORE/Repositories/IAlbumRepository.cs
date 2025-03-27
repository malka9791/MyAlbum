using Gallery.CORE.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.Repositories
{
    public interface IAlbumRepository
    {
        IEnumerable<Album> GetAlbumOfUser(int UserId);

    }
}
