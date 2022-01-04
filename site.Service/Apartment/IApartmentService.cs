using site.Model.ApartmentModels;

namespace site.Service.Apartment
{
    public interface IApartmentService
    {
        public bool Insert(site.DB.Models.Apartment newApartment);
        public bool UpdateApartment(UpdateApartmentModel updatedApartment, string block, int no);
        public bool DeleteApartment(string block, int no);
        public ApartmentListModel<ApartmentViewModel> Get();

    }
}