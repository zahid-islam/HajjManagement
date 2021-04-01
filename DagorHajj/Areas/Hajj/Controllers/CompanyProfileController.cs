using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DagorHajj.Models;
using DagorHajj.DAL;
using DagorHajj.Utility;
using System.IO;

namespace DagorHajj.Areas.Hajj.Controllers
{
    [SafelyAuthorize]
    public class CompanyProfileController : Controller
    {
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();
        // GET: Hajj/CompanyProfile
        public ActionResult Index()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            ViewBag.User = user.Role.Name;

                return View();
        }

        public ActionResult Create()
        {
            //if this user's role is SuperAdmin then only save
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            if (user.Role.Name != "Super Admin")
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }

            return View();
        }

        public ActionResult Edit(int id)
        {
            return View();
        }

        public ActionResult SaveCompanyProfile(CompanyProfile model)
        {
            try
            {
                //if this user's role is SuperAdmin then only save
                var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
                if (user.Role.Name != "Super Admin" && model.ID == 0)
                {
                    return Json(new { success = false }, JsonRequestBehavior.AllowGet);
                }

                if (model.ID == 0 && user.Role.Name == "Super Admin")
                {
                  
                    var userId = Convert.ToInt32(User.Identity.Name);
                    model.AddedBy = userId;
                    model.AddedAt = DateTime.Now;

                    if (Request.Files != null)
                    {
                        var year = DateTime.Now.Year;


                        if (model.ImageAttach != null && model.ImageAttach != "")
                        {
                            model.ImageAttach = year + "/" + model.ImageAttach;
                        }

                        foreach (string key in Request.Files)
                        {
                            var postedFile = Request.Files[key];
                            System.IO.Directory.CreateDirectory(Server.MapPath("~/UploadedFiles" + "\\" + year));
                            postedFile.SaveAs(Path.Combine(Server.MapPath("~/UploadedFiles"), year + "/" + postedFile.FileName));
                        }
                    }
                    var data = new
                    {
                        model.ImageAttach
                    };
                    _unitOfWork.CompanyProfileRepository.Insert(model);
                    _unitOfWork.Save();
                    return Json(new { model = data, Id = model.ID, Success = true, Msg = GlobalVariables.SuccessfulSavedMessage }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    if (model.ID > 0)
                    {

                        var companyProfile = _unitOfWork.CompanyProfileRepository.GetById(model.ID);

                        if (companyProfile.ID == user.ActiveBranchId || user.Role.Name == "Super Admin")
                        {
                            companyProfile.ConpanyName = model.ConpanyName;
                            companyProfile.Address = model.Address;
                            companyProfile.ContactNo = model.ContactNo;
                            companyProfile.Email = model.Email;
                            companyProfile.OwnersName = model.OwnersName;
                            companyProfile.OwnersContactNo = model.OwnersContactNo;
                            companyProfile.LicenseNo = model.LicenseNo;
                            companyProfile.Designation = model.Designation;
                            companyProfile.ModifiedBy = Convert.ToInt32(User.Identity.Name);
                            companyProfile.ModifiedAt = DateTime.Now;

                            if (Request.Files != null)
                            {

                                var year = DateTime.Now.Year;                                
                                var imageInfo = new string[] { };
                                                                                              
                                var imgTemp = "";
                              
                              
                                if (companyProfile.ImageAttach != null)
                                {
                                    imageInfo = companyProfile.ImageAttach.Split('/');
                                }
                               
                                
                                var imgFileName = imageInfo.FirstOrDefault() + "/" + model.ImageAttach;
                             
                               
                                var imagePath = "~/UploadedFiles/" + companyProfile.ImageAttach;                            

                                if (companyProfile.ImageAttach != null && companyProfile.ImageAttach != imgFileName)
                                {
                                    System.IO.File.Delete(Server.MapPath(imagePath));
                                    imgTemp = imageInfo.LastOrDefault();
                                }
                                if (model.ImageAttach != null)
                                {
                                    companyProfile.ImageAttach = year + "/" + model.ImageAttach;
                                }
                                

                                foreach (string key in Request.Files)
                                {
                                    var postedFile = Request.Files[key];
                                    var fileName = postedFile.FileName;
                                    if (fileName != imgTemp)
                                    {
                                        System.IO.Directory.CreateDirectory(Server.MapPath("~/UploadedFiles" + "\\" + year));
                                        postedFile.SaveAs(Path.Combine(Server.MapPath("~/UploadedFiles"), year + "/" + postedFile.FileName));
                                    }
                                }
                            }
                            var data = new
                            {
                               
                                companyProfile.ImageAttach
                            };

                            _unitOfWork.CompanyProfileRepository.Update(companyProfile);
                            _unitOfWork.Save();

                            return Json(new {model = data, Id = model.ID, Success = true, Msg = GlobalVariables.UpdateMessage }, JsonRequestBehavior.AllowGet);
                        }
                    }
                    return Json(new { Id = model.ID, Success = false, Msg = GlobalVariables.FailureMessage }, JsonRequestBehavior.AllowGet);
                }
            }
            catch
            {

                return Json(new { Id = model.ID, Success = false, Msg = GlobalVariables.FailureMessage }, JsonRequestBehavior.AllowGet);
            }
        }
      
        public ActionResult GetCompanyProfileById(int id)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));

            var companyProfile = _unitOfWork.CompanyProfileRepository.GetById(id);

            if (user.Role.Name == "Super Admin")
            {
                return Json(companyProfile, JsonRequestBehavior.AllowGet);
            }
            else if (companyProfile.ID == user.ActiveBranchId)
            {
                return Json(companyProfile, JsonRequestBehavior.AllowGet);
            }

            return Json(new { success = false, errorCode = 1001, errorMessage = "You have not permission to view this Company Profile." }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllCompanyProfile()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            var hajjis = _unitOfWork.HajjiRepository.GetAll();
            var umrahs = _unitOfWork.UmrahRepository.GetAll();
            var userList = _unitOfWork.UserRepository.GetAll();

            if (user.Role.Name == "Super Admin")
            {
                var CompanyProfiles = _unitOfWork.CompanyProfileRepository.GetAll();

                var data = (from companyProfile in CompanyProfiles
                            join hajji in hajjis on companyProfile.ID equals hajji.CompanyID into h
                            join umrah in umrahs on companyProfile.ID equals umrah.CompanyID into u
                            join User in userList on companyProfile.ID equals User.ActiveBranchId into g
                            select new
                            {
                                companyProfile.ID,
                                companyProfile.ConpanyName,
                                RegHajji = h.Count(),
                                RegUmrah = u.Count(),
                                NoAdmin = g.Count(d => d.Role.Name == "Admin"),
                                NoOfUser = g.Count(d => d.Role.Name == "User"),
                            }).OrderByDescending(companyProfile => companyProfile.ID).ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var CompanyProfiles = _unitOfWork.CompanyProfileRepository.GetAll()
                   .Where(companyProfile => companyProfile.ID == user.ActiveBranchId);

                var data = (from companyProfile in CompanyProfiles
                            join hajji in hajjis on companyProfile.ID equals hajji.CompanyID into h
                            join umrah in umrahs on companyProfile.ID equals umrah.CompanyID into u
                            join User in userList on companyProfile.ID equals User.ActiveBranchId into g
                            select new
                            {
                                companyProfile.ID,
                                companyProfile.ConpanyName,
                                RegHajji = h.Count(),
                                RegUmrah = u.Count(),
                                NoAdmin = g.Count(d => d.Role.Name == "Admin"),
                                NoOfUser = g.Count(d => d.Role.Name == "User"),
                            }).OrderByDescending(companyProfile => companyProfile.ID).ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }


    }
}