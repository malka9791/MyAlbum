using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gallery.CORE.models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //Relationships
        public List<Image> Images { get; set; }

    }
}
