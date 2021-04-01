using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DagorHajj.Areas.Hajj.ViewModel
{
    public class PartyLedgerVewiModel
    {
        public int ID { get; set; }
        public string Date { get; set; }
        public string PaymentFor { get; set; }
        public int ReceivableAmount { get; set; }
        public decimal ReceivedAmount { get; set; }
        public int Status { get; set; }
    }
}