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
    
    public partial class AdminSystemUserDetail
    {
        public int Id { get; set; }
        public int AdminSystemUserId { get; set; }
        public string ControllerName { get; set; }
        public string ModuleName { get; set; }
        public bool ModuleStatus { get; set; }
        public string Menu { get; set; }
        public bool Create { get; set; }
        public bool Edit { get; set; }
        public bool Delete { get; set; }
        public bool ListView { get; set; }
        public bool ReportPreview { get; set; }
    
        public virtual AdminSystemUser AdminSystemUser { get; set; }
    }
}
