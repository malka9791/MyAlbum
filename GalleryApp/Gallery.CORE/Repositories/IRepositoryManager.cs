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
         IRepository<Image> Images { get; }
         IRepository<Album> Albums { get; }
        IRepository<User> Users { get; }
        IRepository<Tag> Tags { get; }
        IRepository<Permissions> Permissions { get; }
        Task SaveAsync();
    }
}
