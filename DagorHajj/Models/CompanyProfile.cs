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
    
    public partial class CompanyProfile
    {
        public int ID { get; set; }
        public string ConpanyName { get; set; }
        public string Address { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public string OwnersName { get; set; }
        public string OwnersContactNo { get; set; }
        public Nullable<int> AddedBy { get; set; }
        public Nullable<System.DateTime> AddedAt { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedAt { get; set; }
        public string LicenseNo { get; set; }
        public string Designation { get; set; }
        public string ImageAttach { get; set; }
    }
}
