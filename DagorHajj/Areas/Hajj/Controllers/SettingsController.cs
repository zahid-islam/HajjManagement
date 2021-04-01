using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DagorHajj.DAL;
using DagorHajj.Models;
using DagorHajj.Utility;

namespace DagorHajj.Areas.Hajj.Controllers
{
    [SafelyAuthorize]
    public class SettingsController : Controller
    {
        UnitOfWork _unitOfWork = new UnitOfWork();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create()
        {
            return View();
        }

        public ActionResult Edit(int? id)
        {
            ViewBag.Id = id;
            return View();
        }

        public JsonResult GetSettingByCompanyId()
        {
            int userId = Convert.ToInt32(User.Identity.Name);
            var branchId = _unitOfWork.UserRepository.GetById(userId).ActiveBranchId;
            var setting = _unitOfWork.SettingsRepository.GetAll().Where(x => x.CompanyId == branchId).FirstOrDefault();

            var set = setting == null
            ? null
            : new
            {
                setting.CompanyId,
                setting.Id,
                setting.PackageName,
                setting.PackageRate,
                setting.HajjLevy,
                setting.LevyYear
            };
            return Json(setting, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveSettings(Setting setting)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    setting.AddedAt = DateTime.Now;
                    setting.AddedBy = Convert.ToInt32(User.Identity.Name);

                    int userId = Convert.ToInt32(User.Identity.Name);
                    var branchId = _unitOfWork.UserRepository.GetById(userId).ActiveBranchId;

                    setting.CompanyId = branchId;

                    _unitOfWork.SettingsRepository.Insert(setting);
                    _unitOfWork.Save();
                    return Json(new { Success = true, CompanyId = setting.CompanyId, Id = setting.Id }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult UpdateSettings(Setting setting)
        {
            try
            {
                if (setting.Id > 0)
                {
                    var existSetting = _unitOfWork.SettingsRepository.GetById(setting.Id);
                    existSetting.PackageName = setting.PackageName;
                    existSetting.PackageRate = setting.PackageRate;
                    existSetting.HajjLevy = setting.HajjLevy;
                    existSetting.LevyYear = setting.LevyYear;

                    existSetting.EditedAt = DateTime.Now;
                    existSetting.EditedBy = Convert.ToInt32(User.Identity.Name);



                    _unitOfWork.SettingsRepository.Update(existSetting);
                    _unitOfWork.Save();
                    return Json(new { Update = true }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}