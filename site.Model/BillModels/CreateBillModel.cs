namespace site.Model.BillModels
{
    public class CreateBillModel : IBillModel
    {
        public decimal Water { get; set; }
        public decimal Electric { get; set; }
        public decimal Gas { get; set; }
        public bool WaterIsPaid { get; set; }
        public bool ElectricIsPaid { get; set; }
        public bool GasIsPaid { get; set; }
    }
}