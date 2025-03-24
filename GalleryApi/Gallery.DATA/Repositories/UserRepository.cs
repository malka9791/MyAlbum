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
    public class UserRepository:Repository<User>,IUserRepository
    {
        public UserRepository(DataContext context):base(context)
        {
            
        }
        public User? GetByEmail(string email)
        {

            return this._dbSet.FirstOrDefault(user => user.Email == email);
        }
    }
}
