using Gallery.CORE.models;
using Gallery.CORE.Models;
using Gallery.CORE.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.DATA.Repositories
{
    public class RepositoryManager : IRepositoryManager
    {
        public readonly DataContext _context;
        public IRepository<Image> Images { get; }
        public IRepository<Album> Albums { get; }
        public IRepository<User> Users { get; }
        public IRepository<Tag> Tags {get;}
        public IRepository<Permissions> Permissions { get; }

        public RepositoryManager(DataContext context, IRepository<Image> imagesRepository,
            IRepository<Album> albumsRepository, IRepository<User> usersRepository,
            IRepository<Tag> tagsRepository,IRepository<Permissions> permissionsRepository)
        {
            _context = context;
            Images = imagesRepository;
            Albums = albumsRepository;
            Users = usersRepository;
            Tags = tagsRepository;
            Permissions = permissionsRepository;
        }
        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
