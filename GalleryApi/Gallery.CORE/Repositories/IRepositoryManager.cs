using Gallery.CORE.models;
using Gallery.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.Repositories
{
    public interface IRepositoryManager
    {
       public  IRepository<Image> Images { get; }
       public  IRepository<Album> Albums { get; }
       public IRepository<User> Users { get; }
       public IRepository<Tag> Tags { get; }
       public IRepository<Permissions> Permissions { get; }
        public IUserRepository UserRepository { get; }
        public IAlbumRepository AlbumRepository { get; }
        public IImageRepository ImageRepository { get; }

        public Task SaveAsync();
    }
}
