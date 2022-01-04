using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using site.DB.Models;
using site.Model.ApartmentModels;

namespace site.Service.Apartment
{

    public class ApartmentService : IApartmentService
    {
        private readonly IMapper mapper;
        public ApartmentService(IMapper _mapper)
        {
            mapper = _mapper;
        }
        public bool Insert(site.DB.Models.Apartment newApartment)
        {
            bool result = false;
            using (var srv = new SiteContext())
            {
                newApartment.IsDeleted = false;
                srv.Apartments.Add(newApartment);
                srv.SaveChanges();
                result = true;
            }
            return result;
        }
        public ApartmentListModel<ApartmentViewModel> Get()
        {
            var result = new ApartmentListModel<ApartmentViewModel>();
            using (var srv = new SiteContext())
            {
                var data = srv.Apartments.Where(
                    a => !a.IsDeleted).Include(a => a.Residents.Where(
                        r => r.IsActive && !r.IsDeleted
                    ))
                    .OrderBy(a => a.Block);
                result.apartmentList = mapper.Map<List<ApartmentViewModel>>(data);
            }
            return result;
        }
        public bool UpdateApartment(UpdateApartmentModel updatedApartment, string block, int no)
        {
            bool result = false;
            using (var srv = new SiteContext())
            {
                var data = srv.Apartments.Where(
                    a => !a.IsDeleted).SingleOrDefault(a => a.Block == block && a.No == no);
                if (data is null)
                {
                    return result;
                }
                mapper.Map(updatedApartment, data);
                srv.SaveChanges();
                result = true;
            }
            return result;
        }

        public bool DeleteApartment(string block, int no)
        {
            bool result = false;
            using (var srv = new SiteContext())
            {
                var data = srv.Apartments.Where(
                    a => !a.IsDeleted).SingleOrDefault(a => a.Block == block && a.No == no);
                if (data is null)
                {
                    return result;
                }
                data.IsDeleted = true;
                srv.SaveChanges();
                result = true;
            }
            return result;
        }

    }
}