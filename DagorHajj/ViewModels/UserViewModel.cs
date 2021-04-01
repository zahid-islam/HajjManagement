using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DagorHajj.ViewModels
{
    public class UserViewModel
    {
        [Display(Name = "User ID")]
        [Required(ErrorMessage = "* User ID is required")]
        [StringLength(50, ErrorMessage = "* User ID can not be more than 50 characters")]
        public string UserID { get; set; }

        [Display(Name = "Password")]
        [Required(ErrorMessage = "* Password is required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}