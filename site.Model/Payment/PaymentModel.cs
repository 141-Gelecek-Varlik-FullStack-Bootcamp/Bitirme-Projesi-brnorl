using System;

namespace site.Model.Payment
{
    public class PaymentModel : IPayment
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public decimal Amount { get; set; }
        public string CreditCardNumber { get; set; }
        public DateTime ExpirationDate { get; set; }
        public DateTime PaymentDate { get; set; }
    }
}