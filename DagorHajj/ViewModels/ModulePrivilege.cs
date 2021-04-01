using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DagorHajj.ViewModels
{
    public class ModulePrivilege
    {
        public string ModuleName { get; set; }
        public bool SelectedModule { get; set; }
        public List<MenuPrivilege> MenuPrivileges { get; set; }
    }
}
