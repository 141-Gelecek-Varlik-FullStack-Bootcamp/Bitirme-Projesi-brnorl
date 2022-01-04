namespace site.Model.ApartmentModels
{
    public class CreateApartmentModel : IApartmentModel
    {
        public bool Occupied { get; set; }
        public string Block { get; set; }
        public string Type { get; set; }
        public int Floor { get; set; }
        public int No { get; set; }
    }
}