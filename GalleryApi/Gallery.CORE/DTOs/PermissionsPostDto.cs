using Gallery.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.DTOs
{
    public class PermissionsPostDto
    {
        public int UserId { get; set; }
        public int AlbumId { get; set; }
        public string Permission { get; set; }
        public DateTime Validity { get; set; } 
    }
}
