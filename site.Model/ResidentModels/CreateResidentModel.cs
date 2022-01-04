using site.DB.Models;
namespace site.Model.ResidentModels
{
    public class CreateResidentModel : IResidentModel
    {
        public string TcNo { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string VecihlePlate { get; set; }
        public decimal? Dues { get; set; }
        public bool? DueIsPaid { get; set; }
        public string Message { get; set; }
        public bool? MessageIsRead { get; set; }
        public bool IsOwner { get; set; }
        public bool? IsAdmin { get; set; }

    }
}