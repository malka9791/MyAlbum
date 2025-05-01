using Gallery.CORE.models;
using Gallery.CORE.Repositories;
using Gallery.CORE.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.SERVICE
{
    public class AlbumService : IAlbumService
    { 
        private readonly IRepositoryManager _albumRepository;
        public AlbumService(IRepositoryManager albumRepository)
        {
            _albumRepository = albumRepository;
        }
        public async Task<IEnumerable<Album>> GetAllAsync()
        {
            return await Task.Run(() => _albumRepository.Albums.GetAll());
        }
        public async Task<Album> GetByIdAsync(int id)
        {
            return await _albumRepository.AlbumRepository.GetAlbum(id);

        }
        public async Task AddValueAsync(Album album)
        {
            _albumRepository.Albums.Add(album);
            await _albumRepository.SaveAsync();
        }
        public async Task UpdateValueAsync(Album album)
        {
            _albumRepository.Albums.Update(album);
            await _albumRepository.SaveAsync();
        }
        public async Task DeleteValueAsync(Album album)
        {
            _albumRepository.Albums.Delete(album);
            await _albumRepository.SaveAsync();
        }
        public async Task<IEnumerable<Album>> GetAlbumOfUserAsync(int UserId)
        {
            return await Task.Run(()=> _albumRepository.AlbumRepository.GetAlbumOfUser(UserId));
        }
    }
}
