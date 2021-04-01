using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DagorHajj.Utility
{
    static public partial class GlobalVariables
    {
        public const string SuperUserName = "reza@autosoftbd.com";
        public const string SuperUserPassword = "ASL%123!@#";

        public static readonly int CurrentYear = DateTime.Now.Year;
        public static string CurrentYearCode = DateTime.Now.ToString("yy");
        public const string ActionModeAdd = "Add";
        public const string ActionModeEdit = "Edit";
        public const string QuotationPrefix = "QB";
        public const string RevisionPrefix = "RV";
        public const string QuotationCountry = "Bangladesh";
        public const string QuotationNationalPrefix = "QB";
        public const string QuotationInternationalPrefix = "QI";

        //Voucher Type
        public const string CashReceiptVoucherType = "Cash Receipt";
        public const string CashPaymentVoucherType = "Cash Payment";
        public const string BankReceiptVoucherType = "Bank Receipt";
        public const string BankPaymentVoucherType = "Bank Payment";
        public const string JournalVoucherVoucherType = "Journal Voucher";
        public const string OpeningBalanceVoucherType = "Opening Balance";
        public const string TransferVoucherVoucherType = "Transfer Voucher";
        public const string BulkTranactionVoucherType = "Bulk Transactions";

        public const string CashReceiptVoucherPrefix = "CR-";
        public const string CashPaymentVoucherPrefix = "CP-";
        public const string BankReceiptVoucherPrefix = "BR-";
        public const string BankPaymentVoucherPrefix = "BP-";
        public const string JournalVoucherVoucherPrefix = "JV-";
        public const string OpeningBalanceVoucherPrefix = "OB-";
        public const string TransferVoucherVoucherPrefix = "TV-";
        public const string BulkTranactionVoucherPrefix = "BT-";

        public const string HeadOfficeStock = "AdminStockRegister";

        public const string CashLedgers = "Cash";
        public const string BankLedgers = "Bank";
        public const string NoneLedgers = "None";

        //public const string DateFormat = "dd-MM-yyyy HH:mm:ss";
        public const string DateFormat = "dd-MM-yyyy";
        public const string DateTimeFormat = "{0:dd-MM-yyyy h:mm:ss tt}";
        public const string DateTimeFormat2 = "dd-MM-yyyy h:mm:ss tt";
        public const string DateFormatSlash = "dd/MM/yyyy";
        public const string DateTimeFormatAngularJs = "dd-MM-yyyy h:mm:ss a";

        public static string SuccessfulSavedMessage = "Data Saved Successfully";
        public static string SuccessfulDeletedMessage = "Data Deleted Successfully";
        public static string ItemExistMessage = "This item already exist. Please try another";
        public static string ValidationErrorMessage = "Some of data are not valid";
        public static string ErrorPrefixMessage = "Error: ";
        public static string FailureMessage = "Data Saving Failure! ";
        public static string UpdateMessage = "Data Update Successfully.";


        public static string OldPasswordNotExistMessage = "Old password is wrong. Please try again";
        public static string PasswordChangedMessage = "Password has been changed successfully";

        public static string CheckerReviewedMessage = "Data Reviewed & Submitted Successfully";
        public static string CheckerRejectedMessage = "Data Rejected Successfully";

        public static string ApproverApprovedMessage = "Data Approved & Saved Successfully";
        public static string ApproverRejectedMessage = "Data Rejected Successfully";


        public const decimal FirstLedgerId = 100000000000000000;

        public enum HumanResourceTab
        {
            PersonalData = 1,
            ProfessionalQualification = 2,
            TrainingInformation = 3,

        };
        public enum InventoryTabType
        {
            MaterialReceived = 3,
            MaterialIssued = 4,
            StockStaus = 5
        };

        public enum RFQTabType
        {
            RequestforQuotation = 6,
            WorkOrder = 7
        };

        public enum AccountPlanBudget
        {
            Planning = 8,
            Budget = 9
        };

        public enum AdminStockTabType
        {
            MaterialReceived = 10,
            MaterialIssued = 11,
            StockStaus = 12
        };

        public const int Fail = 0;
        public const int SaveSuccess = 1;
        public const int ItemExist = 2;
        public const int UpdateSuccess = 3;
        public const int ItemNameExist = 4;
        public const int DataFectFailure = 5;
        public const int IdParamNotNull = 6;
        public const int Required = 7;
    }

    public enum StatusCode
    {
        Fail = 0,
        SaveSuccess = 1,
    }

    //Diagnostic
    public enum TransactionTypeDiagnostic
    {
        Invoice = 1,
        Due = 2,
        Advance = 3,
        SecondDiscount = 4,
        IpdBill = 5
    }

    public enum InvoiceTypeDiagnostic
    {
        FullPaid = 1,
        Due = 2,
        Refund = 3,
        Cancelled = 4
    }

    public enum StatusTypeForLISReportPrint
    {
        Inprocess = 1,
        Ready = 2,
        Printed = 3
    }

   
    public enum TestStatusDiagnostic
    {
        Allow = 1,
        Cancelled = 2
    }

    public enum DiagnosticPatientType
    {        
        Ipd = 1,
        Opd = 2,
        Out = 3        
    }
}