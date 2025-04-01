using Gallery.CORE.models;
using Gallery.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.DTOs
{
    public class ImageDto
    {
        
        public int Id { get; set; }
        public string Name { get; set; }

        public string ImgUrl { get; set; }
        public string ImgType { get; set; }
        public DateTime CreatedAt { get; set; }

        public TagDto Tag { get; set; }
    }
}
