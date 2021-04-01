using DagorHajj.DAL;
using DagorHajj.Models;
using DagorHajj.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DagorHajj.Areas.Hajj.Controllers
{
    [SafelyAuthorize]
    public class UserController : Controller
    {
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();

        // GET: Hajj/User
        public ActionResult Index()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));

            ViewBag.UserRole = user.Role.Name;
            ViewBag.UserId = user.Id;
            return View();
        }
        public ActionResult Create()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));

            if (user.Role.Name == "User")
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }

            ViewBag.user = user.Role.Name;
            return View();
        }
        public ActionResult Edit(int id)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));            
            if (user.Id != id && user.Role.Name != "Super Admin")
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }

            return View();
        }
        public ActionResult SaveUserManager(User model)
        {
            try
            {
                var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
                if (model.Id == 0)
                {
                    if (user.Role.Name == "Super Admin")
                    {
                        if (IsExistEmail(model.Email, model.ActiveBranchId))
                        {
                            return Json(new { Success = false, Msg = "Email Already Exist" },
                                JsonRequestBehavior.AllowGet);

                        }
                        model.RoleId = _unitOfWork.RoleRepository.GetAll().Where(a => a.Name == "Admin").FirstOrDefault().Id;
                        model.IsActive = true;
                        _unitOfWork.UserRepository.Insert(model);
                        _unitOfWork.Save();
                        return Json(new { Id = model.Id, roleId = model.RoleId, Success = true, Msg = GlobalVariables.SuccessfulSavedMessage },
                            JsonRequestBehavior.AllowGet);
                    }
                    else if (user.Role.Name == "Admin")
                    {
                        if (IsExistEmail(model.Email, user.ActiveBranchId))
                        {
                            return Json(new { Success = false, Msg = "Email Already Exist" },
                                JsonRequestBehavior.AllowGet);

                        }
                        model.IsActive = true;
                        model.ActiveBranchId = user.ActiveBranchId;
                        model.RoleId = _unitOfWork.RoleRepository.GetAll().Where(a => a.Name == "User").FirstOrDefault().Id;
                        _unitOfWork.UserRepository.Insert(model);
                        _unitOfWork.Save();
                        return Json(new { Id = model.Id, roleId = model.RoleId, Success = true, Msg = GlobalVariables.SuccessfulSavedMessage },
                            JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new { success = false }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    if (model.Id > 0)
                    {
                        var userManager = _unitOfWork.UserRepository.GetById(model.Id);
                        if ((user.ActiveBranchId == userManager.ActiveBranchId && user.Role.Name == "Admin") || user.Role.Name == "Super Admin")
                        {
                            userManager.Name = model.Name;

                            if (userManager.Email != model.Email && IsExistEmail(model.Email, model.ActiveBranchId))
                            {
                                return Json(new { Id = model.Id, roleId = model.RoleId, Success = false, Msg = "Email Already Exist" },
                               JsonRequestBehavior.AllowGet);
                            }
                            else
                            {
                                userManager.Email = model.Email;
                            }

                            userManager.IsActive = model.IsActive;
                            userManager.RoleId = model.RoleId;
                            userManager.ActiveBranchId = user.Role.Name == "Super Admin" ? model.ActiveBranchId : userManager.ActiveBranchId;
                            userManager.Password = model.Password;
                            _unitOfWork.UserRepository.Update(userManager);
                            _unitOfWork.Save();
                            return Json(new { Id = model.Id, roleId = model.RoleId, Success = true, Msg = GlobalVariables.UpdateMessage },
                                   JsonRequestBehavior.AllowGet);
                        }
                    }
                    return Json(new { Id = model.Id, roleId = model.RoleId, Success = false, Msg = GlobalVariables.FailureMessage },
                            JsonRequestBehavior.AllowGet);
                }
            }
            catch
            {
                return Json(new { Id = model.Id, roleId = model.RoleId, Success = false, Msg = GlobalVariables.FailureMessage },
                        JsonRequestBehavior.AllowGet);
            }
        }
        private bool IsExistEmail(string email, int? companyId)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));

            if (user.Role.Name == "Super Admin")
            {
                var emailExist = _unitOfWork.UserRepository.GetAll()
                    .Where(e => e.Email == email)
                    .FirstOrDefault();
                if (emailExist != null)
                {
                    return true;
                }
                return false;
            }
            else
            {
                var emailExist = _unitOfWork.UserRepository.GetAll()
                    .Where(e => e.Email == email)
                    .FirstOrDefault();

                if (emailExist != null)
                {
                    return true;
                }
                return false;
            }
        }

        public ActionResult GetUserManagerById(int id)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));

            var userManager = _unitOfWork.UserRepository.GetById(id);
            var CompanyName = userManager.ActiveBranchId != 0 ? _unitOfWork.CompanyProfileRepository.GetById(userManager.ActiveBranchId).ConpanyName : "";

            if (user.ActiveBranchId == userManager.ActiveBranchId || user.Role.Name == "Super Admin")
            {
                var data = new
                {
                    userManager.Id,
                    userManager.Name,
                    userManager.Email,
                    RoleName = userManager.RoleId != 0 ? userManager.Role.Name : "",
                    userManager.RoleId,
                    userManager.ActiveBranchId,
                    CompanyName,
                    userManager.Password,
                    userManager.IsActive,
                    ConfirmPassword = userManager.Password
                };
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = false, errorCode = 1001, errorMessage = "You have not permission to view this Company Profile." }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllUser()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));

            var userList = _unitOfWork.UserRepository.GetAll();
            var companyList = _unitOfWork.CompanyProfileRepository.GetAll();

            if (user.Role.Name == "Super Admin")
            {
                var data = (from a in userList
                            join b in companyList on a.ActiveBranchId equals b.ID
                            where (a.RoleId > 1)
                            select new
                            {
                                a.Id,
                                a.Name,
                                RoleName = a.Role.Name,
                                a.Email,
                                b.ConpanyName

                            })
                            .OrderBy(a => a.ConpanyName)
                            .ThenBy(a => a.RoleName)
                            .ThenBy(a => a.Id)
                            .ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var data = (from a in userList
                            join b in companyList on a.ActiveBranchId equals b.ID
                            where (a.RoleId > 1 && user.ActiveBranchId == a.ActiveBranchId)
                            select new
                            {
                                a.Id,
                                a.Name,
                                RoleName = a.Role.Name,
                                a.Email,
                                b.ConpanyName
                            }).OrderBy(a => a.ConpanyName).ThenBy(a => a.RoleName).ThenBy(a => a.Id).ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetAllRole()
        {
            var roleList = _unitOfWork.RoleRepository.GetAll();
            var data = (from a in roleList
                        where (a.Name != "Super Admin")
                        select new
                        {
                            a.Id,
                            RoleName = a.Name
                        }).ToList();

            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllCompany()
        {
            var companyList = _unitOfWork.CompanyProfileRepository.GetAll();
            var data = (from a in companyList
                        select new
                        {
                            a.ID,
                            CompanyName = a.ConpanyName

                        }).ToList();

            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}