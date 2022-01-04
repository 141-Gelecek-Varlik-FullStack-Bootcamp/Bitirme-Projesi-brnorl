using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using site.DB.Models;
using site.Model.BillModels;
using site.Model.Payment;
using site.Model.ResidentModels;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Text.Json;
using Newtonsoft.Json;

namespace site.Service.Resident
{
    public class ResidentService : IResidentService
    {
        private readonly IMapper mapper;
        public ResidentService(IMapper _mapper)
        {
            mapper = _mapper;
        }
        private string GeneratePassword()
        {//Generate random 4 digit password
            const string valid = "1234567890";
            var length = 4;
            StringBuilder generatedPassword = new StringBuilder();
            Random rnd = new Random();
            while (0 < length--)
            {
                generatedPassword.Append(valid[rnd.Next(valid.Length)]);
            }
            return generatedPassword.ToString();
        }
        public ResidentListModel<ResidentViewModel> Get()
        {
            var result = new ResidentListModel<ResidentViewModel>();
            using (var srv = new SiteContext())
            {
                var data = srv.Residents.Where(
                    r => r.IsActive && !r.IsDeleted
                ).Include(r => r.Apartment).Include(r => r.Bill)
                .OrderBy(r => r.Apartment.Block);
                result.residentList = mapper.Map<List<ResidentViewModel>>(data);
            }
            return result;
        }
        public bool Insert(site.DB.Models.Resident newResident, string block, int no)
        {
            bool result = false;
            using (var srv = new SiteContext())
            {
                newResident.IsActive = true;
                newResident.IsDeleted = false;
                newResident.Password = GeneratePassword();
                //Assign apartment to resident
                var residentApartment = srv.Apartments.Where(
                                                        a => !a.IsDeleted)
                                                        .SingleOrDefault(
                                                        a => a.Block == block && a.No == no);

                newResident.Apartment = residentApartment;
                newResident.ApartmentId = residentApartment.Id;
                srv.Add(newResident);
                srv.SaveChanges();
                result = true;
            }
            return result;
        }
        public bool Delete(string TcNo)
        {
            bool result = false;

            using (var srv = new SiteContext())
            {
                var data = srv.Residents.FirstOrDefault(r => r.TcNo == TcNo && !r.IsDeleted && r.IsActive);
                if (data is null)
                {
                    return result;
                }
                srv.Residents.FirstOrDefault(r => r.TcNo == TcNo && !r.IsDeleted && r.IsActive).IsDeleted = true;
                srv.Residents.FirstOrDefault(r => r.TcNo == TcNo && !r.IsDeleted && r.IsActive).IsActive = false;
                srv.SaveChanges();
                result = true;
            }
            return result;
        }
        public bool Update(UpdateResidentModel updatedResident, string TcNo)
        {
            bool result = false;
            using (var srv = new SiteContext())
            {
                var data = srv.Residents.Where(
                    r => !r.IsDeleted && r.IsActive
                ).SingleOrDefault(r => r.TcNo == TcNo);
                if (data is null)
                {
                    return result;
                }
                mapper.Map(updatedResident, data);
                srv.SaveChanges();
                result = true;
            }

            return result;
        }

        public bool AssignBill(CreateBillModel newBill, string TcNo)
        {
            bool result = false;

            using (var srv = new SiteContext())
            {
                var data = srv.Residents.Where(
                    r => !r.IsDeleted && r.IsActive
                ).SingleOrDefault(r => r.TcNo == TcNo);
                if (data is null)
                {
                    return result;
                }
                data.Bill = mapper.Map<Bill>(newBill);
                srv.SaveChanges();
                result = true;
            }
            return result;
        }

        public site.DB.Models.Resident Login(LoginResidentModel resident)
        {
            using (var srv = new SiteContext())
            {
                var data = srv.Residents.FirstOrDefault(
                r => !r.IsDeleted && r.IsActive && r.TcNo == resident.TcNo && r.Password == resident.Password
            );
                return data;

            }
        }
        public bool SendMessage(string TcNo, string message)
        {
            bool result = false;
            using (var srv = new SiteContext())
            {
                var data = srv.Residents.FirstOrDefault(
                    r => !r.IsDeleted && r.IsActive && r.TcNo == TcNo
                );
                if (data is null)
                {
                    return result;
                }
                srv.Residents.FirstOrDefault(
                    r => !r.IsDeleted && r.IsActive && r.TcNo == TcNo
                ).Message = message;
                srv.Residents.FirstOrDefault(
                    r => !r.IsDeleted && r.IsActive && r.TcNo == TcNo
                ).MessageIsRead = false;
                srv.SaveChanges();
            }
            return result;
        }

        public bool GetPayment(PaymentModel payment, string TcNo)
        {
            bool result = false;
            using (var srv = new SiteContext())
            {
                var resident = srv.Residents.Where(
                   r => !r.IsDeleted && r.IsActive
               ).Include(r => r.Bill).SingleOrDefault(r => r.TcNo == TcNo);

                if (resident is null)
                {
                    return result;
                }
                //Paid
                resident.DueIsPaid = true;
                resident.Bill.ElectricIsPaid = true;
                resident.Bill.GasIsPaid = true;
                resident.Bill.WaterIsPaid = true;
                srv.SaveChanges();

                //MongoDB
                var connectionString = "mongodb://localhost";
                var Client = new MongoClient(connectionString);
                var DB = Client.GetDatabase("Site");
                var collection = DB.GetCollection<BsonDocument>("Payments");
                var json = JsonConvert.SerializeObject(payment);
                var data = BsonDocument.Parse(json);
                collection.InsertOneAsync(data);
                result = true;
            }

            return result;
        }
    }

}