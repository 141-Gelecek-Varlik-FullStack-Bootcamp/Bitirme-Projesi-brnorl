using System.Collections.Generic;
using site.Model.ResidentModels;

namespace site.Model.ApartmentModels
{
    public class ApartmentViewModel : IApartmentModel
    {
        public bool Occupied { get; set; }
        public string Block { get; set; }
        public string Type { get; set; }
        public int Floor { get; set; }
        public int No { get; set; }
        public virtual ICollection<ResidentInApartmentModel> Residents { get; set; }
    }
}