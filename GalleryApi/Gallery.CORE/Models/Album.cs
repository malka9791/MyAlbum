using Gallery.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Gallery.CORE.models
{
    public class Album
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdateAt { get; set; }

        public Album()
        {
            CreatedAt = DateTime.UtcNow;
            UpdateAt = DateTime.UtcNow;
        }
        //Relationships
        public int UserId { get; set; }
        public User User { get; set; }

        public List<Image> Images { get; set; }
        public List<Permissions> Permissions { get; set; }

    }
}
