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
    public class RoleController : Controller
    {
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();

        // GET: Hajj/Role
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Create()
        {
            return View();
        }
        public ActionResult Edit(int id)
        {
            return View();
        }
        public ActionResult SaveRole(Role model)
        {
            try
            {
                if (model.Id == 0)
                {
                    _unitOfWork.RoleRepository.Insert(model);
                    _unitOfWork.Save();
                    return Json(new { Id = model.Id, Success = true, Msg = GlobalVariables.SuccessfulSavedMessage }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    if (model.Id > 0)
                    {
                        var role = _unitOfWork.RoleRepository.GetById(model.Id);
                        role.Name = model.Name;
                        _unitOfWork.RoleRepository.Update(role);
                        _unitOfWork.Save();
                        return Json(new { Success = true, Id = model.Id, Msg = GlobalVariables.UpdateMessage },
                            JsonRequestBehavior.AllowGet);
                    }
                    return Json(new { Success = false, Id = model.Id, Msg = GlobalVariables.FailureMessage }, JsonRequestBehavior.AllowGet);
                }
            }
            catch
            {
                return Json(new { Success = false, Id = model.Id, Msg = GlobalVariables.FailureMessage }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetRoleById(int id)
        {
            var role = _unitOfWork.RoleRepository.GetById(id);

            var data = new
            {
                role.Id,
                role.Name
            };

            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllRole()
        {
            var role = _unitOfWork.RoleRepository.GetAll();

            var data = (from a in role
                        select new
                        {
                            a.Id,
                            a.Name
                        }).ToList();

            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}