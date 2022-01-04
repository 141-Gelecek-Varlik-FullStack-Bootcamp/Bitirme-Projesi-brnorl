using site.Model.BillModels;
using site.Model.ResidentModels;

namespace site.Service.Resident
{
    public interface IResidentService
    {
        public bool Insert(site.DB.Models.Resident newResident, string block, int no);
        public bool Delete(string TcNo);
        public bool Update(UpdateResidentModel updatedResident, string TcNo);
        public bool AssignBill(CreateBillModel newBill, string TcNo);
        public site.DB.Models.Resident Login(LoginResidentModel resident);
        public bool SendMessage(string TcNo, string message);



        public ResidentListModel<ResidentViewModel> Get();

    }
}