using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.DTOs
{
    public class AlbumPostDto
    {
       
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
