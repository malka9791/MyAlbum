using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.DTOs
{
    public class PermissionsDto
    {
        public int Id { get; set; }
        public string Permission { get; set; }
        public DateTime Validity { get; set; }

        // פרטי המשתמש והאלבום שאליהם מתייחסת ההרשאה
        public UserDto User { get; set; }
        public AlbumDto Album { get; set; }
    }
}
