using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace site.DB.Models
{
    public partial class Apartment
    {
        public Apartment()
        {
            Residents = new HashSet<Resident>();
        }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public bool Occupied { get; set; }
        public string Block { get; set; }
        public string Type { get; set; }
        public int Floor { get; set; }
        public int No { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<Resident> Residents { get; set; }
    }
}
