using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace site.DB.Models
{
    public partial class Resident
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string TcNo { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string VecihlePlate { get; set; }
        public string Password { get; set; }
        public int? ApartmentId { get; set; }
        public int? BillId { get; set; }
        public decimal? Dues { get; set; }
        public bool? DueIsPaid { get; set; }
        public string Message { get; set; }
        public bool? MessageIsRead { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public bool IsOwner { get; set; }
        public bool IsAdmin { get; set; }

        public virtual Apartment Apartment { get; set; }
        public virtual Bill Bill { get; set; }
    }
}
