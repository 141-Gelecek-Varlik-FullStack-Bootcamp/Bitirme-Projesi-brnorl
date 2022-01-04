namespace site.Model.ApartmentModels
{
    public class UpdateApartmentModel : IApartmentModel
    {
        public bool Occupied { get; set; }
        public string Type { get; set; }
    }
}