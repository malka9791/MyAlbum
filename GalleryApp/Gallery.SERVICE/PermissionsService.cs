using Gallery.CORE.models;
using Gallery.CORE.Models;
using Gallery.CORE.Repositories;
using Gallery.CORE.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.SERVICE
{
    public class PermissionsService:IPermissionsService
    {
        private readonly IRepositoryManager _permissionsRepository;
        public PermissionsService(IRepositoryManager permissionsRepository)
        {
            _permissionsRepository = permissionsRepository;
        }
        public async Task<IEnumerable<Permissions>> GetAllAsync()
        {
            return await Task.Run(() => _permissionsRepository.Permissions.GetAll());
        }
        public async Task<Permissions> GetByIdAsync(int id)
        {
            return await Task.Run(() => _permissionsRepository.Permissions.GetById(id));
        }
        public async Task AddValueAsync(Permissions permissions)
        {
            _permissionsRepository.Permissions.Add(permissions);
            await _permissionsRepository.SaveAsync();
        }
        public async Task UpdateValueAsync(Permissions permissions)
        {
            _permissionsRepository.Permissions.Update(permissions);
            await _permissionsRepository.SaveAsync();
        }
        public async Task DeleteValueAsync(Permissions permissions)
        {
            _permissionsRepository.Permissions.Delete(permissions);
            await _permissionsRepository.SaveAsync();
        }

    }
}
