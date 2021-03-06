//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DagorHajj.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Other
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Other()
        {
            this.Payments = new HashSet<Payment>();
        }
    
        public int ID { get; set; }
        public Nullable<int> GroupLeaderID { get; set; }
        public string InitialName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Purpose { get; set; }
        public Nullable<decimal> PurchaseRate { get; set; }
        public Nullable<decimal> SellingRate { get; set; }
        public int CompanyID { get; set; }
        public Nullable<int> AddedBy { get; set; }
        public Nullable<System.DateTime> AddedAt { get; set; }
        public Nullable<System.DateTime> ModifiedAt { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public string PassportNo { get; set; }
        public Nullable<System.DateTime> DateOfExpiry { get; set; }
        public Nullable<System.DateTime> DoB { get; set; }
        public Nullable<int> SupplierID { get; set; }
        public string SellTo { get; set; }
        public Nullable<decimal> PaidAmount { get; set; }
        public Nullable<System.DateTime> IssueDate { get; set; }
    
        public virtual GroupLeader GroupLeader { get; set; }
        public virtual Supplier Supplier { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Payment> Payments { get; set; }
    }
}
