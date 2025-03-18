using Gallery.CORE.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.DATA.Repositories
{
    public class Repository<T>:IRepository<T> where T : class
    {
        private readonly DataContext _context;
        protected readonly DbSet<T> _dbSet;
        public Repository(DataContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }
        public T Add(T entity)
        {
            _dbSet.Add(entity);
            return entity;
        }
        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }
        public IEnumerable<T> GetAll()
        {
            _context.Albums.Include(u => u.User).ToList();
            _context.Images.Include(u => u.User).ToList();
            _context.Permissions.Include(u => u.Album).Include(u => u.User).ToList();
          //  _context.Permissions..ToList();
            return _dbSet.ToList();
        }
        public T? GetById(int id)
        {
            _context.Albums.Include(u => u.User).FirstOrDefault((a)=>a.Id==id);
            _context.Images.Include(u => u.User).FirstOrDefault((i) => i.Id == id);
            _context.Permissions.Include(u => u.Album).FirstOrDefault((a)=>a.Id==id);
            _context.Permissions.Include(u => u.User).FirstOrDefault((u)=>u.Id==id);
            return _dbSet.FirstOrDefault(p => EF.Property<int>(p, "Id") == id);
        }
        public T Update(T entity)
        {
            _dbSet.Update(entity);
            return entity;
        }
    }
}
