using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.Services
{
    public interface IRepositoryService<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task AddValueAsync(T entity);
        Task UpdateValueAsync(T entity);
        Task DeleteValueAsync(T image);

    }
}
