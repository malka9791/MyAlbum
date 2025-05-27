using Gallery.CORE.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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
        public string Name { get; set; }
        public string? Description { get; set; }
        // זה מה שנשמר בפועל במסד (שדה מסוג string)
        public string? Emotions { get; set; }

        // זה שדה שנוח לעבוד איתו בקוד, אבל לא נשמר במסד
        [NotMapped]
        public List<string> EmotionsList
        {
            get => string.IsNullOrEmpty(Emotions)
                ? new List<string>()
                : Emotions.Split(',').ToList();

            set => Emotions = string.Join(",", value);
        }

        public int UserId { get; set; }
        public string ImgUrl { get; set; }
        public string ImgType { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdateAt { get; set; }

        public Image()
        {
            CreatedAt = DateTime.UtcNow;
            UpdateAt    = DateTime.UtcNow;
        }
        //Relationships
        public User User { get; set; }
        public int AlbumId { get; set; }
        public Album Album { get; set; }
        public int? TagId { get;set; }
        public Tag? Tag{ get; set; }
        public List<Permissions> Permissions { get; set; }

    }
}
