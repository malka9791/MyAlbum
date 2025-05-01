using Gallery.CORE.models;
using Gallery.CORE.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.DATA.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
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
            // _context.Albums.Include(u => u.User).ToList();
            var images = _context.Images.Include(u => u.User).Include(a => a.Album).Include(t => t.Tag).ToList();
            var permissions = _context.Permissions.Include(u => u.Album).Include(u => u.User).ToList();
            // החזר את כל הנתונים או את כל הרשומות
            return _dbSet.ToList();
        }
        public T? GetById(int id)
        {

            var imageUser = _context.Images.Include(u => u.User).Include(u => u.Album).Include(u => u.Tag).FirstOrDefault(i => i.Id == id);
            //var album = _context.Albums.Include(a => a.Images).FirstOrDefault(a => a.Id == id);
            var permission = _context.Permissions.Include(u => u.Album).Include(u => u.User).FirstOrDefault(a => a.Id == id);
            //var userPermission = _context.Permissions.FirstOrDefault(u => u.Id == id);


            return _dbSet.FirstOrDefault(p => EF.Property<int>(p, "Id") == id);
        }
        //public T? GetById(int id)
        //{
        //    if (typeof(T) == typeof(Image))
        //    {
        //        var imageUser = _context.Images
        //            .Include(u => u.User)
        //            .Include(u => u.Album)
        //            .Include(u => u.Tag)
        //            .FirstOrDefault(i => i.Id == id);

        //        return imageUser as T; // המרה ל-T
        //    }
        //    else if (typeof(T) == typeof(Album))
        //    {
        //        var album = _context.Albums
        //            .Include(a => a.Images)
        //            .FirstOrDefault(a => a.Id == id);

        //        return album as T; // המרה ל-T
        //    }

        //    // הוספת אפשרויות נוספות לפי הצורך
        //    return null; // אם לא נמצא סוג תואם
        //}

        public T Update(T entity)
        {
            _dbSet.Update(entity);
            return entity;
        }
    }
}
