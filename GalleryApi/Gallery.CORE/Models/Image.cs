using Gallery.CORE.Models;
using System;
using System.Collections.Generic;
using System.Formats.Asn1;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Gallery.CORE.models
{
    public class Image
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string ImgUrl { get; set; }
        public string ImgType { get; set; }
        public DateTime CreatedAt { get; set; }
        public Image()
        {
            CreatedAt = DateTime.UtcNow;
        }
        //Relationships
        public User User { get; set; }
        public int AlbumId { get; set; }
        public Album Album { get; set; }
        public int TagId { get;set; }
        public Tag Tag{ get; set; }
        public List<Permissions> Permissions { get; set; }

    }
}
