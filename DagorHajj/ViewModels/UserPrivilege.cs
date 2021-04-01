using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DagorHajj.ViewModels
{
    public class UserPrivilege
    {
        public int UserId { get; set; }
        public bool AllModule { get; set; }
        public List<ModulePrivilege> ModulePrivileges { get; set; }
    }
}
