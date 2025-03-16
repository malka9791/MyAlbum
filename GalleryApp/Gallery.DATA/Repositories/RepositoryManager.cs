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
    public class RepositoryManager
    {
        public readonly DataContext _context;
        public IRepository<Image> Images;
        public IRepository<Album> Albums;
        public IRepository<User> Users;
        public IRepository<Tag> Tags;
        public IRepository<Permissions> Permissions;

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
