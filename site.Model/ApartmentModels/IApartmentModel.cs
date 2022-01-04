namespace site.Model.ApartmentModels
{
    public interface IApartmentModel
    {
        public bool Occupied { get; set; }
        public string Type { get; set; }
    }
}