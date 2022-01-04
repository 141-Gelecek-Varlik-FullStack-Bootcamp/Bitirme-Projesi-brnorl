using AutoMapper;
using site.DB.Models;
using site.Model.ApartmentModels;
using site.Model.BillModels;
using site.Model.ResidentModels;

namespace site.API.Infrastructure
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //APARTMENT
            CreateMap<Apartment, CreateApartmentModel>();
            CreateMap<CreateApartmentModel, Apartment>();

            CreateMap<Apartment, ApartmentViewModel>();
            CreateMap<ApartmentViewModel, Apartment>();

            CreateMap<Apartment, UpdateApartmentModel>();
            CreateMap<UpdateApartmentModel, Apartment>();

            //RESIDENTS
            CreateMap<Resident, CreateResidentModel>();
            CreateMap<CreateResidentModel, Resident>();

            CreateMap<Resident, ResidentViewModel>();
            CreateMap<ResidentViewModel, Resident>();

            CreateMap<Resident, UpdateResidentModel>();
            CreateMap<UpdateResidentModel, Resident>();

            CreateMap<Resident, ResidentInApartmentModel>();
            CreateMap<ResidentInApartmentModel, Resident>();

            CreateMap<Resident, LoginResidentModel>();
            CreateMap<LoginResidentModel, Resident>();

            //BILLS
            CreateMap<Bill, CreateBillModel>();
            CreateMap<CreateBillModel, Bill>();


        }
    }
}