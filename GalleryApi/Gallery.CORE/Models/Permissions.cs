using Gallery.CORE.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.Models
{
    
    public class Permissions
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int AlbumId { get; set; }
        public string Permission { get; set; }
        public DateTime Validity { get; set; }//תוקף ההרשאה
        //Relationships
        public User User { get; set; }
        public Album Album { get; set; }
    }
}
