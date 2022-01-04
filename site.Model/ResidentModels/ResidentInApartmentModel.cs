namespace site.Model.ResidentModels
{
    public class ResidentInApartmentModel : IResidentModel
    {
        public string Email { get; set; }
        public string Phone { get; set; }
        public string VecihlePlate { get; set; }
        public string Message { get; set; }
        public bool IsOwner { get; set; }
    }
}