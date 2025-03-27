using Gallery.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Gallery.CORE.models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //Relationships

        public List<Image> Images { get; set; }
        public DateTime UpdateAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public Tag()
        {
            CreatedAt = DateTime.UtcNow;
            UpdateAt = DateTime.UtcNow;
        }

    }
}
