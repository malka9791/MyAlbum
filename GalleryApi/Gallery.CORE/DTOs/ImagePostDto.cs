using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.DTOs
{
    public class ImagePostDto
    {
        public string Name { get; set; }
        public int UserId { get; set; }
        public int AlbumId { get; set; }
        public int TagId { get; set; }
        public string ImgUrl { get; set; }
        public string ImgType { get; set; }
        public DateTime? UpdateAt { get; set; }


    }
}
