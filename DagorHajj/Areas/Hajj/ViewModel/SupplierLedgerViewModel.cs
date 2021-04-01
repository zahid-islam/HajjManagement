using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DagorHajj.Areas.Hajj.ViewModel
{
    public class SupplierLedgerViewModel
    {
        public int ID { get; set; }
        public string Date { get; set; }
        public string PaymentFor { get; set; }
        public decimal PayableAmount { get; set; }
        public decimal PaidAmount { get; set; }
        public int Status { get; set; }
    }
}