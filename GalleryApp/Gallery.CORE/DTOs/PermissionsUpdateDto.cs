using Gallery.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.DTOs
{
    public class PermissionsUpdateDto
    {
        public int Id { get; }
        public int UserId { get; set; }
        public int AlbumId { get; set; }
        public EPermission Permission { get; set; }
        public DateTime Validity { get; set; } 
    }
}
