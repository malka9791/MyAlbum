using Gallery.CORE.DTOs;
using Gallery.CORE.models;
using Gallery.CORE.Models;
using Gallery.CORE.Repositories;
using Gallery.CORE.Services;

namespace Gallery.SERVICE
{
    public class ImageService:IImageService
    {
        private readonly IRepositoryManager _imageRepository;
        public ImageService(IRepositoryManager imageRepository)
        {
            _imageRepository = imageRepository;
        }
        public async Task<IEnumerable<Image>> GetAllAsync()
        {
            return await Task.Run(() => _imageRepository.Images.GetAll());
        }
        public async Task<Image> GetByIdAsync(int id)
        {
            return await Task.Run(() => _imageRepository.Images.GetById(id));
        }
        public async Task AddValueAsync(Image image)
        {
            _imageRepository.Images.Add(image);
            await _imageRepository.SaveAsync();
            
        }
        public async Task UpdateValueAsync(Image image)
        {
            _imageRepository.Images.Update(image);
            await _imageRepository.SaveAsync();
        }
        public async Task DeleteValueAsync(Image image)
        {
            _imageRepository.Images.Delete(image);
            await _imageRepository.SaveAsync();
        }
        public async Task<IEnumerable<Image>> GetImagesByAlbumIdAsync(int albumId)
        {
           return await Task.Run(()=> _imageRepository.ImageRepository.GetImagesByAlbumId(albumId));

        }

    }
}