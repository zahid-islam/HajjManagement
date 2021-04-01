using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DagorHajj.Utility
{
    public static partial class GlobalVariables
    {
        public enum IpdBillParticulars
        {
            AdmissionFee = 1
        }

        public enum IpdPaymentType
        {
            AdvanceReceipt = 1
        }
    }

    public enum StatusTypeForIpdPatient
    {
        Running = 1,
        TemporaryDischarged = 2,
        Billed = 3,
        PartialPaid = 4,
    }

    public enum OperationTeamMember
    {
        TeamLeader = 1
    }
}