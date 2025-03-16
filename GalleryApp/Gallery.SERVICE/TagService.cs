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
    public class TagService:ITagService
    {
        private readonly IRepositoryManager _tagRepository;
        public TagService(IRepositoryManager tagRepository)
        {
            _tagRepository = tagRepository;
        }
        public async Task<IEnumerable<Tag>> GetAllAsync()
        {
            return await Task.Run(() => _tagRepository.Tags.GetAll());
        }
        public async Task<Tag> GetByIdAsync(int id)
        {
            return await Task.Run(() => _tagRepository.Tags.GetById(id));
        }
        public async Task AddValueAsync(Tag tag)
        {
            _tagRepository.Tags.Add(tag);
            await _tagRepository.SaveAsync();
        }
        public async Task UpdateValueAsync(Tag tag)
        {
            _tagRepository.Tags.Update(tag);
            await _tagRepository.SaveAsync();
        }
        public async Task DeleteValueAsync(Tag tag)
        {
            _tagRepository.Tags.Delete(tag);
            await _tagRepository.SaveAsync();
        }

    }
}
