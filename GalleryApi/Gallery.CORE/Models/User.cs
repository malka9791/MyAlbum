using Gallery.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdatedAt { get; set;}
        public User()
        {
            CreatedAt =LastUpdatedAt= DateTime.UtcNow;
        }
        public string? Role { get; set; }
        //Relationships
        public List<Image> Images { get; set; }
        public List<Album> Albums { get; set; }
        public ICollection<Permissions> Permissions { get; set; }

    }
}
