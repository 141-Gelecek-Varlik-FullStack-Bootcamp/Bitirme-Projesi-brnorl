using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using site.API.Attributes;
using site.DB.Models;
using site.Model.ApartmentModels;
using site.Service.Apartment;

namespace site.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApartmentController : ControllerBase
    {
        private readonly IApartmentService apartmentService;
        private readonly IMapper mapper;
        public ApartmentController(IApartmentService _apartmentService, IMapper _mapper)
        {
            apartmentService = _apartmentService;
            mapper = _mapper;
        }


        [HttpGet]
        [ServiceFilter(typeof(LoginFilter))]
        [ServiceFilter(typeof(AdminFilter))]
        public IActionResult Get()
        {
            return Ok(apartmentService.Get());
        }

        [HttpPost]
        public IActionResult CreateApartment([FromBody] CreateApartmentModel newApartment)
        {
            var data = mapper.Map<Apartment>(newApartment);
            return Ok(apartmentService.Insert(data));
        }
        [HttpPut]
        public IActionResult UpdateApartment(string block, int no, [FromBody] UpdateApartmentModel updatedApartment)
        {
            return Ok(apartmentService.UpdateApartment(updatedApartment, block, no));
        }
        [HttpDelete]
        public IActionResult DeleteApartment(string block, int no)
        {
            return Ok(apartmentService.DeleteApartment(block, no));
        }

    }
}
