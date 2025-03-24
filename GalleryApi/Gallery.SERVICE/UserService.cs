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
    public class UserService : IUserService
    {
        private readonly IRepositoryManager _userRepository;
        public UserService(IRepositoryManager userRepository)
        {
            _userRepository = userRepository;   
        }
        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await Task.Run(() => _userRepository.Users.GetAll());
        }
        public async Task<User> GetByIdAsync(int id)
        {
            return await Task.Run(() => _userRepository.Users.GetById(id));
        }
        public async Task AddValueAsync(User user)
        {
            _userRepository.Users.Add(user);
            await _userRepository.SaveAsync();
        }
        public async Task UpdateValueAsync(User user)
        {
            _userRepository.Users.Update(user);
            await _userRepository.SaveAsync();
        }
        public async Task DeleteValueAsync(User user)
        {
            _userRepository.Users.Delete(user);
            await _userRepository.SaveAsync();
        }
        public async Task<User> GetByEmailAsync(string email)
        {

            return await Task.Run(() => _userRepository.UserRepository.GetByEmail(email));
        }
    }

}
