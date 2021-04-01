using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DagorHajj.ViewModels
{
    public class MenuPrivilege
    {
        public int Id { get; set; }
        public int AdminSystemUserId { get; set; }
        public bool SelectedMenu { get; set; }
        public string ControllerName { get; set; }
        public string Menu { get; set; }
        public bool ListView { get; set; }
        public bool Create { get; set; }
        public bool Edit { get; set; }
        public bool ReportPreview { get; set; }
    }
}
