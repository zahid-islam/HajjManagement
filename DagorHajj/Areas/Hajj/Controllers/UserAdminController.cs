using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DagorHajj.DAL;
using DagorHajj.Models;
using DagorHajj.ViewModels;

namespace DagorHajj.Areas.Hajj.Controllers
{
    [SafelyAuthorize]
    public class UserAdminController : Controller
    {
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();

        // GET: Administration/UserAdmin
        public ActionResult Index()
        {
            return View();
        }

        // GET: Administration/UserAdmin/Create
        public ActionResult Create()
        {
            return View();
        }

        public ActionResult Edit()
        {
            return View();
        }

        public JsonResult GetAllUsers()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            var users = _unitOfWork.UserRepository.GetAll().Where(x => x.RoleId > 2 && x.ActiveBranchId == user.ActiveBranchId)
                .Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.Email,
                    Role = x.Role.Name,
                    x.IsActive
                    //x.UserStatus,
                    //x.EmployeeId
                }).ToList();
            return Json(new { success = true, users }, JsonRequestBehavior.AllowGet);
        }

        public List<AdminSystemUserDetail> GetAllPrivilegeList()
        {
            var list = new List<AdminSystemUserDetail>
            {
                //new AdminSystemUserDetail { ModuleName = "Hajj", ControllerName = "CompanyProfile", Menu = "Company Profile" },
                new AdminSystemUserDetail { ModuleName = "Hajj", ControllerName = "GroupLeader", Menu = "Group Leader" },
                new AdminSystemUserDetail { ModuleName = "Hajj", ControllerName = "Hajji", Menu = "Hajji" },
                new AdminSystemUserDetail { ModuleName = "Hajj", ControllerName = "Umrah", Menu = "Umrah" },
                new AdminSystemUserDetail { ModuleName = "Hajj", ControllerName = "Ticket", Menu = "Ticket" },
                new AdminSystemUserDetail { ModuleName = "Hajj", ControllerName = "Others", Menu = "Others" },
                new AdminSystemUserDetail { ModuleName = "Hajj", ControllerName = "Payment", Menu = "Payment Collection" },
                new AdminSystemUserDetail { ModuleName = "Hajj", ControllerName = "ChequeManagement", Menu = "Cheque Management" },
                new AdminSystemUserDetail { ModuleName = "Hajj", ControllerName = "Supplier", Menu = "Supplier" },
                new AdminSystemUserDetail { ModuleName = "Hajj", ControllerName = "SupplierPayment", Menu = "Supplier Payment" },
                new AdminSystemUserDetail { ModuleName = "Hajj", ControllerName = "MuharramRelation", Menu = "Muharram Relation" },
                new AdminSystemUserDetail { ModuleName = "Hajj", ControllerName = "Reports", Menu = "Reports" },                
                //new AdminSystemUserDetail { ModuleName = "Hajj", ControllerName = "UserAdmin", Menu = "User Previlege" }
                //new AdminSystemUserDetail { ModuleName = "Hajj", ControllerName = "Settings", Menu = "Settings" },
                //new AdminSystemUserDetail { ModuleName = "Hajj", ControllerName = "User", Menu = "User" },
            };
            return list;
        }
        public JsonResult GetAllPrivileges()
        {

            var data = (from l in GetAllPrivilegeList()
                        group l by new { l.ModuleName } into grp
                        select new
                        {
                            grp.Key.ModuleName,
                            Count = grp.Count(),
                            MenuPrivileges = grp.Select(x => new
                            {
                                x.Id,
                                x.AdminSystemUserId,
                                x.ControllerName,
                                x.Menu,
                                x.Create,
                                x.Edit,
                                x.ReportPreview,
                                x.ListView
                            })
                        }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult IsValidUser(UserPrivilege userPrivilege)
        {
            if (_unitOfWork.UserRepository.GetAll().Any(x => x.Id == userPrivilege.UserId))
            {
                return Json(new { Valid = false }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { Valid = true }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveUserPrivilege(UserPrivilege userPrivilege)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (_unitOfWork.AdminSystemUserRepository.Any(x => x.UserId == userPrivilege.UserId))
                    {
                        return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
                    }

                    var adminSystemUser = new AdminSystemUser
                    {
                        UserId = userPrivilege.UserId,
                        AllModule = userPrivilege.AllModule,
                        UserStatus = true,
                        CreatedBy = Convert.ToInt32(User.Identity.Name),
                        CreatedDate = DateTime.Now
                    };
                    _unitOfWork.AdminSystemUserRepository.Insert(adminSystemUser);

                    foreach (var module in userPrivilege.ModulePrivileges)
                    {
                        foreach (var menu in module.MenuPrivileges)
                        {
                            if (menu.SelectedMenu)
                            {
                                var adminSystemUserDetail = new AdminSystemUserDetail
                                {
                                    AdminSystemUserId = adminSystemUser.Id,
                                    ControllerName = menu.ControllerName,
                                    ModuleName = module.ModuleName,
                                    Menu = menu.Menu,
                                    ListView = menu.ListView,
                                    Create = menu.Create,
                                    Edit = menu.Edit,
                                    ReportPreview = menu.ReportPreview
                                };
                                _unitOfWork.AdminSystemUserDetailRepository.Insert(adminSystemUserDetail);
                            }
                        }
                    }
                    _unitOfWork.Save();

                    return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
                }
                
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetUserPrivilegeById(int id)
        {
            var adminSystemUser = _unitOfWork.AdminSystemUserRepository.Get(x => x.UserId == id);

            if (adminSystemUser == null)
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
            var userPrivilege = new UserPrivilege
            {
                UserId = adminSystemUser.UserId,
                AllModule = adminSystemUser.AllModule,
            };

            //get all privilege list
            var allPrivileges = GetAllPrivilegeList();
            var allModulePrivileges = new List<ModulePrivilege>();
            var allMenuPrivileges = new List<MenuPrivilege>();

            if (adminSystemUser.AllModule)
            {
                //make all privilege as true
                foreach (var item in allPrivileges)
                {
                    item.Create = true;
                    item.Edit = true;
                    item.ListView = true;
                    item.ReportPreview = true;
                }
                //update privilege with saved privilege data
                foreach (var item in adminSystemUser.AdminSystemUserDetails)
                {
                    var privilege = allPrivileges.SingleOrDefault(x => x.ControllerName == item.ControllerName);
                    if (privilege != null)
                    {
                        privilege.Id = item.Id;
                        privilege.AdminSystemUserId = item.AdminSystemUserId;
                    }
                }
            }
            else
            {
                //update privilege with saved privilege data
                foreach (var item in adminSystemUser.AdminSystemUserDetails)
                {
                    var privilege = allPrivileges.SingleOrDefault(x => x.ModuleName == item.ModuleName && x.ControllerName == item.ControllerName);
                    if (privilege != null)
                    {
                        privilege.Id = item.Id;
                        privilege.AdminSystemUserId = item.AdminSystemUserId;
                        privilege.Create = item.Create;
                        privilege.Edit = item.Edit;
                        privilege.ListView = item.ListView;
                        privilege.ReportPreview = item.ReportPreview;
                    }
                }
            }

            var privileges = (from l in allPrivileges
                        group l by new { l.ModuleName } into grp
                        select new
                        {
                            grp.Key.ModuleName,
                            Count = grp.Count(),
                            MenuPrivileges = grp.Select(x => new
                            {
                                x.Id,
                                x.AdminSystemUserId,
                                x.ControllerName,
                                x.Menu,
                                x.Create,
                                x.Edit,
                                x.ReportPreview,
                                x.ListView
                            })
                        }).ToList();

            var usr = _unitOfWork.UserRepository.GetById(adminSystemUser.UserId);

            var data = new
            {
                success = true,
                adminSystemUser.Id,
                adminSystemUser.UserId,
                usr.Email,
                //adminSystemUser.Password,
                AllPrivileges = privileges
            };
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateUserPrivilege(UserPrivilege userPrivilege)
        {
            try
            {
                var adminSystemUser = _unitOfWork.AdminSystemUserRepository.Get(x => x.UserId == userPrivilege.UserId);
                adminSystemUser.ModifiedDate = DateTime.Now;
                adminSystemUser.ModifiedBy = Convert.ToInt32(User.Identity.Name);
                _unitOfWork.AdminSystemUserRepository.Update(adminSystemUser);

                var junkAdminSystemUserDetailIdList = adminSystemUser.AdminSystemUserDetails.Select(x => x.Id).ToList();

                foreach (var module in userPrivilege.ModulePrivileges)
                {
                    foreach (var menu in module.MenuPrivileges)
                    {
                        if (menu.SelectedMenu)
                        {
                            if (menu.Id == 0)
                            {
                                var adminSystemUserDetail = new AdminSystemUserDetail
                                {
                                    AdminSystemUserId = adminSystemUser.Id,
                                    ControllerName = menu.ControllerName,
                                    ModuleName = module.ModuleName,
                                    Menu = menu.Menu,
                                    ListView = menu.ListView,
                                    Create = menu.Create,
                                    Edit = menu.Edit,
                                    ReportPreview = menu.ReportPreview
                                };
                                _unitOfWork.AdminSystemUserDetailRepository.Insert(adminSystemUserDetail);
                            }
                            else
                            {
                                junkAdminSystemUserDetailIdList.Remove(menu.Id);
                                var adminSystemUserDetail = _unitOfWork.AdminSystemUserDetailRepository.Get(x => x.Id == menu.Id);
                                adminSystemUserDetail.ControllerName = menu.ControllerName;
                                adminSystemUserDetail.ModuleName = module.ModuleName;
                                adminSystemUserDetail.Menu = menu.Menu;
                                adminSystemUserDetail.ListView = menu.ListView;
                                adminSystemUserDetail.Create = menu.Create;
                                adminSystemUserDetail.Edit = menu.Edit;
                                adminSystemUserDetail.ReportPreview = menu.ReportPreview;
                                _unitOfWork.AdminSystemUserDetailRepository.Update(adminSystemUserDetail);
                            }
                        }
                    }
                }

                foreach (var id in junkAdminSystemUserDetailIdList)
                {
                    _unitOfWork.AdminSystemUserDetailRepository.Delete(id);
                }
                
                _unitOfWork.Save();

                return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}