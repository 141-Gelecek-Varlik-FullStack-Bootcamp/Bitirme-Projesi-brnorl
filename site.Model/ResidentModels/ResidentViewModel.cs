using site.DB.Models;
using site.Model.ApartmentModels;
using site.Model.BillModels;

namespace site.Model.ResidentModels
{
    public class ResidentViewModel : IResidentModel
    {
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
        public bool? IsAdmin { get; set; }
        public virtual ApartmentViewModel Apartment { get; set; }
        public virtual CreateBillModel Bill { get; set; }
    }
}