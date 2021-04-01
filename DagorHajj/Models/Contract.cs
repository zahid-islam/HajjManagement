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
    
    public partial class Contract
    {
        public int ID { get; set; }
        public int HajjiID { get; set; }
        public int GroupLeaderID { get; set; }
        public int ContractAmount { get; set; }
        public int CompanyID { get; set; }
        public Nullable<int> AddedBy { get; set; }
        public Nullable<System.DateTime> AddedAt { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedAt { get; set; }
    
        public virtual GroupLeader GroupLeader { get; set; }
        public virtual Hajji Hajji { get; set; }
    }
}
