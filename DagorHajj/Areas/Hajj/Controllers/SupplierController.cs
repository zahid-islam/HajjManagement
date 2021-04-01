using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DagorHajj.Models;
using DagorHajj.DAL;

namespace DagorHajj.Areas.Hajj.Controllers
{
    [SafelyAuthorize]
    //[SafelyAuthorize]
    public class SupplierController : Controller
    {
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();

        // GET: Hajj/Supplier
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
            ViewBag.Id = id;
            return View();
        }

        [HttpGet]
        public JsonResult GetSuppliers()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            var suppliers = _unitOfWork.SupplierRepository.GetAll()
                .Where(x => x.CompanyId == user.ActiveBranchId);
            var data = (from supplier in suppliers
                        orderby supplier.Id descending
                        select new
                        {
                            supplier.Id,
                            supplier.SupplierName,
                            supplier.ContactPerson,
                            supplier.MobileNumber,
                            supplier.PresentAddress
                        }).ToList();

            return Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
        }

        //[HttpGet]
        //public JsonResult GetAllSuppliers()
        //{
        //    var suppliers = _unitOfWork.Supplier2Repository.GetAll();
        //    var data = (from supplier in suppliers
        //                orderby supplier.SupplierName ascending
        //                select new
        //                {
        //                    supplier.Id,
        //                    supplier.SupplierName,
        //                    supplier.ShortName,
        //                    supplier.IsActive
        //                }).ToList();

        //    return Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
        //}

        public bool IsSupplierExist(string SupplierName)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            var validateName = _unitOfWork.SupplierRepository.GetAll().Where(x => x.CompanyId == user.ActiveBranchId && x.SupplierName == SupplierName).FirstOrDefault();
            if (validateName == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public JsonResult SaveSupplier(Supplier Supplier)
        {
            try
            {
                var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
                var validateName = IsSupplierExist(Supplier.SupplierName);
                if (validateName == false)
                {
                    ModelState.Clear();
                    if (ModelState.IsValid)
                    {
                        Supplier.CompanyId = user.ActiveBranchId;
                        Supplier.AddedAt = DateTime.Now;
                        Supplier.AddedBy = Convert.ToInt32(User.Identity.Name);
                        _unitOfWork.SupplierRepository.Insert(Supplier);
                        _unitOfWork.Save();

                        long id = Supplier.Id;
                        return Json(new { Success = true, Id = Supplier.Id }, JsonRequestBehavior.AllowGet);
                    }
                    return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception)
            {
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpGet]
        public JsonResult GetSupplierById(int id)
        {
            var supplier = _unitOfWork.SupplierRepository.GetById(id);
            var data = new
            {
                supplier.Id,
                supplier.SupplierName,
                supplier.ContactPerson,
                supplier.ContactNumber,
                supplier.MobileNumber,
                supplier.EmailId,
                supplier.PermanenttAddress,
                supplier.PresentAddress,
                supplier.IsActive
            };
            return Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
        }


        public JsonResult UpdateSupplier(Supplier Supplier)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var existingSupplier = _unitOfWork.SupplierRepository.GetById(Supplier.Id);

                    existingSupplier.AddedAt = existingSupplier.AddedAt;
                    existingSupplier.AddedBy = existingSupplier.AddedBy;
                    existingSupplier.SupplierName = Supplier.SupplierName;
                    existingSupplier.ContactPerson = Supplier.ContactPerson;
                    existingSupplier.ContactNumber = Supplier.ContactNumber;
                    existingSupplier.MobileNumber = Supplier.MobileNumber;
                    existingSupplier.EmailId = Supplier.EmailId;
                    existingSupplier.PresentAddress = Supplier.PresentAddress;
                    existingSupplier.PermanenttAddress = Supplier.PermanenttAddress;

                    existingSupplier.IsActive = Supplier.IsActive;
                    existingSupplier.EditedAt = DateTime.Now;
                    existingSupplier.EditedBy = Convert.ToInt32(User.Identity.Name);

                    _unitOfWork.SupplierRepository.Update(existingSupplier);
                    _unitOfWork.Save();

                    return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception)
            {
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }

        }

        public ActionResult Report(long? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }
            ViewBag.Id = id;
            
            return View("Report", "~/Views/Shared/_LayoutReport.cshtml");
        }

    }
}