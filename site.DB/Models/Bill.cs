using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace site.DB.Models
{
    public partial class Bill
    {
        public Bill()
        {
            Residents = new HashSet<Resident>();
        }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public decimal Water { get; set; }
        public decimal Electric { get; set; }
        public decimal Gas { get; set; }
        public bool WaterIsPaid { get; set; }
        public bool ElectricIsPaid { get; set; }
        public bool GasIsPaid { get; set; }

        public virtual ICollection<Resident> Residents { get; set; }
    }
}
