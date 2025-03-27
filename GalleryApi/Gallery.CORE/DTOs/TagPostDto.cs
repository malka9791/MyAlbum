using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.DTOs
{
    public class TagPostDto
    {
        public string Name { get; set; }
        public DateTime? UpdateAt { get; set; }
        public TagPostDto()
        {
            UpdateAt ??= DateTime.UtcNow;
        }
    }
}
