using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DagorHajj.DAL;
using DagorHajj.Models;

namespace DagorHajj.Utility
{
    public static class Helper
    {
        public static CompanyProfile GetCompanyInfo(int userId)
        {
            CompanyProfile companyProfile;

            using (var db = new DagorHajjEntities())
            {
                var user = db.Users.FirstOrDefault(x => x.Id == userId);
                companyProfile = db.CompanyProfiles.FirstOrDefault(x => x.ID == user.ActiveBranchId);
            }

            return companyProfile;
        }
        public static IEnumerable<string> GetMenuList(int userId)
        {
            var menuList = new List<string>();

            using (var db = new DagorHajjEntities())
            {
                var user = db.Users.FirstOrDefault(x => x.Id == userId);
                menuList = db.AdminSystemUserDetails
                    .Where(x => x.AdminSystemUser.UserId == userId)
                    .Select(x => x.ControllerName).ToList();
            }

            return menuList;
        }
        //public static CompanyProfile GetCompanyInfo(int id)
        //{

        //    var companyInfo = new CompanyProfile();

        //    using (var unitOfWork = new UnitOfWork())
        //    {

        //        var companyId = unitOfWork.UserRepository.GetById(id).ActiveBranchId;
        //        companyInfo = unitOfWork.CompanyProfileRepository.GetById(companyId);
        //    }
        //    return companyInfo;
        //}
        public static User GetUserInfo(int id)
        {
            var user = new User();

            using (var unitOfWork = new UnitOfWork())
            {
                user = unitOfWork.UserRepository.GetById(id);
            }

            return user;
        }
        public static string PartialView(Controller controller, string viewName, object model)
        {
            controller.ViewData.Model = model;

            using (var sw = new StringWriter())
            {
                var viewResult = ViewEngines.Engines.FindPartialView(controller.ControllerContext, viewName);
                var viewContext = new ViewContext(controller.ControllerContext, viewResult.View, controller.ViewData,
                                                  controller.TempData, sw);

                viewResult.View.Render(viewContext, sw);
                viewResult.ViewEngine.ReleaseView(controller.ControllerContext, viewResult.View);

                return sw.ToString();
            }
        }

        public static DateTime ConvertInputDateStringToServerDateFormat(string date)
        {
            return string.IsNullOrEmpty(date)
                ? new DateTime()
                : DateTime.ParseExact(date, GlobalVariables.DateFormat, CultureInfo.InvariantCulture);
        }

        public static List<string> GetGenders()
        {
            return new List<string> { "Male", "Female" };
        }

        public static List<string> GetHostelTypes()
        {
            return new List<string> { "A/C", "Non A/C" };
        }

        public static List<string> GetAdmissionProcesses()
        {
            return new List<string> { "Step 1", "Step 2" };
        }

        public static List<string> GetProgramLevels()
        {
            return new List<string> { "Diploma", "Undergratuate", "Graduate", "Postgraduate" };
        }

        public static List<string> GetResultStatus()
        {
            return new List<string> { "Declared", "Awaited" };
        }

        public static List<string> GetYesNoList()
        {
            return new List<string> { "Yes", "No" };
        }

        public static List<string> IdCardTypes()
        {
            return new List<string> { "Citizenship", "Passport", "Driving Licence" };
        }

        public static List<string> FollowUpMethods()
        {
            return new List<string> { "In-person Visit", "SMS", "Call" };
        }

        public static List<string> UniversityInterests()
        {
            return new List<string> { "Excellent", "Very Good", "Good", "Fair", "Not Okay" };
        }

        public static string UploadFile(HttpPostedFileBase file)
        {
            const int maxContentLength = 1024 * 1024 * 1; //1 MB
            var allowedFileExtensions = new[] { ".csv", ".jpeg", ".jpg", ".gif", ".png", ".dwg", ".xls", ".doc", ".pdf" };

            if (file == null)
            {
                throw new Exception("No file selected to upload. Please select a file.");
            }

            if (!allowedFileExtensions.Contains(file.FileName.Substring(file.FileName.LastIndexOf('.'))))
            {
                throw new Exception("Please upload Your Photo of type: " + string.Join(", ", allowedFileExtensions));
            }

            if (file.ContentLength > maxContentLength)
            {
                throw new Exception("Your Photo is too large, maximum allowed size is : " + (maxContentLength / 1024) +
                                    "MB");
            }

            var directory = HttpContext.Current.Server.MapPath("~/Uploads/" + DateTime.Today.Year);

            if (!Directory.Exists(directory))
                Directory.CreateDirectory(directory);

            var fileDirectory = Path.Combine(directory, file.FileName);

            //if (System.IO.File.Exists(fileDirectory))
            //{
            //    throw new Exception("The file already exists. Please try another file.");
            //}

            file.SaveAs(fileDirectory);

            //var fileName = Path.GetFileName(file.FileName);
            return file.FileName;
        }

        

        public static string NumberToLocalWords(int number)
        {

            if (number == 0)
                return "Zero";

            if (number < 0)
                return "Minus " + NumberToLocalWords(Math.Abs(number));

            string words = "";

            if ((number / 10000000) > 0)
            {
                words += NumberToLocalWords(number / 10000000) + " Crore ";
                number %= 10000000;
            }

            if ((number / 100000) > 0)
            {
                words += NumberToLocalWords(number / 100000) + " Lac ";
                number %= 100000;
            }

            if ((number / 1000) > 0)
            {
                words += NumberToLocalWords(number / 1000) + " Thousand ";
                number %= 1000;
            }

            if ((number / 100) > 0)
            {
                words += NumberToLocalWords(number / 100) + " Hundred ";
                number %= 100;
            }

            if (number > 0)
            {
                if (words != "")
                    words += "and ";

                var unitsMap = new[]
                                   {
                                       "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
                                       "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen"
                                       , "Eighteen", "Nineteen"
                                   };
                var tensMap = new[]
                                  {
                                      "zero", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty",
                                      "Ninety"
                                  };

                if (number < 20)
                    words += unitsMap[number];
                else
                {
                    words += tensMap[number / 10];
                    if ((number % 10) > 0)
                        words += "-" + unitsMap[number % 10];
                }
            }

            return words;
        }

        //public static CompanyInfo GetCompanyInfo()
        //{
        //    var companyInfo = new CompanyInfo();
        //    using (var unitOfWork = new UnitOfWork())
        //    {
        //        companyInfo = unitOfWork.CompanyInfoRepository.GetAll().FirstOrDefault();
        //    }

        //    return companyInfo;
        //}
    }
}