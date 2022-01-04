using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using site.API.Cache;
using site.DB.Models;
using site.Model.BillModels;
using site.Model.Payment;
using site.Model.ResidentModels;
using site.Service.Resident;

namespace site.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResidentController : ControllerBase
    {
        private readonly IResidentService residentService;
        private readonly IMapper mapper;
        private readonly IResidentCache residentCache;
        public ResidentController(IResidentService _residentService, IMapper _mapper, IResidentCache _residentCache)
        {
            residentService = _residentService;
            mapper = _mapper;
            residentCache = _residentCache;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(residentService.Get());
        }
        [HttpPost]
        public IActionResult CreateResident(string block, int no, [FromBody] CreateResidentModel newResident)
        {
            var data = mapper.Map<Resident>(newResident);
            return Ok(residentService.Insert(data, block, no));
        }
        [HttpDelete]
        public IActionResult DeleteResident(string TcNo)
        {
            return Ok(residentService.Delete(TcNo));
        }

        [HttpPut]
        public IActionResult UpdateResident(string TcNo, [FromBody] UpdateResidentModel updatedResident)
        {
            return Ok(residentService.Update(updatedResident, TcNo));
        }
        [HttpPost]
        [Route("Bill")]
        public IActionResult AssignBill(string TcNo, [FromBody] CreateBillModel newBill)
        {
            return Ok(residentService.AssignBill(newBill, TcNo));
        }
        [HttpPost]
        [Route("Login")]
        public IActionResult Login(LoginResidentModel resident)
        {
            var loginedResident = residentService.Login(resident);
            if (loginedResident is not null)
            {
                residentCache.Cache(loginedResident);
                return Ok("Login success");
            }
            return BadRequest("Invalid Account.");
        }
        [HttpPost]
        [Route("SendMessage")]
        public IActionResult SendMessage(string message)
        {
            string TcNo = residentCache.GetCachedResident().TcNo;
            return Ok(residentService.SendMessage(TcNo, message));
        }
        [HttpPost]
        [Route("Pay")]
        public IActionResult Pay(PaymentModel payment)
        {//Kullanıcı cacheden alınır.
            var TcNo = residentCache.GetCachedResident().TcNo;
            return Ok(residentService.GetPayment(payment, TcNo));

        }
    }
}