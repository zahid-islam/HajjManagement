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
    public class OthersController : Controller
    {
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();

        // GET: Hajj/Others
        public ActionResult Index()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            ViewBag.UserRloe = user.Role.Name;
            return View();
        }
        public ActionResult Create()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            if (user.Role.Name == "Super Admin")
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }

            return View();
        }
        public ActionResult Edit(int id)
        {
            return View();
        }
        public ActionResult Report(int? id)
        {

            if (id == null)
            {
                return HttpNotFound();
            }
            ViewBag.Id = id;

            return View("Report");
        }

        public JsonResult GetOtherByIdForReport(int id)
        {
            var logedInUserId = Convert.ToInt32(User.Identity.Name);
            var logedInCompanyId = _unitOfWork.UserRepository.GetById(logedInUserId).ActiveBranchId;

            var other = _unitOfWork.OtherRepository.GetById(id);
            var data = new
            {
                other.ID,
                other.GroupLeader.Name,
                InvoiceDate = Convert.ToDateTime(other.AddedAt.Value.Date).ToString("dd-MM-yyyy"),
                PassengerName = other.InitialName + " " + other.FirstName + " " + other.MiddleName + " " + other.LastName,
                other.Purpose,
                other.PurchaseRate,
                other.SellingRate,
                other.PaidAmount

            };
            return Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllGroupLeader()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            var groupLeaderList = _unitOfWork.GroupLeaderRepository.GetAll();
            var data = (from a in groupLeaderList
                        where (user.ActiveBranchId == a.CompanyID)
                        select new
                        {
                            a.ID,
                            a.Name,
                        }).OrderByDescending(a => a.ID).ToList();

            return Json(data, JsonRequestBehavior.AllowGet); ;
        }

        public ActionResult GetAllSupplier()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            var suppliers = _unitOfWork.SupplierRepository.GetAll();
            var data = (from supplier in suppliers
                        where (user.ActiveBranchId == supplier.CompanyId)
                        select new
                        {
                            supplier.Id,
                            supplier.SupplierName
                        }).ToList();

            return Json(data, JsonRequestBehavior.AllowGet); ;
        }
        public ActionResult GetOtherById(int id)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));

            var other = _unitOfWork.OtherRepository.GetById(id);
            if (user.ActiveBranchId == other.CompanyID)
            {
                var data = new
                {
                    other.ID,
                    other.GroupLeaderID,
                    GroupLeader = other.GroupLeaderID != 0 ? _unitOfWork.GroupLeaderRepository.GetById(Convert.ToInt32(other.GroupLeaderID)).Name : "",
                    InitialName = other.InitialName == null ? "" : other.InitialName,
                    other.FirstName,
                    other.MiddleName,
                    other.LastName,
                    other.Purpose,
                    other.IssueDate,
                    other.DoB,
                    other.SupplierID,
                    PurchaseFrom = other.SupplierID != null ? other.Supplier.SupplierName : "",
                    other.SellTo,
                    other.PaidAmount,
                    other.PurchaseRate,
                    other.SellingRate,
                    other.PassportNo,
                    other.DateOfExpiry
                };

                return Json(data, JsonRequestBehavior.AllowGet);
            }

            return Json(new { success = false, errorCode = 1001, errorMessage = "You have not permission to view this Company Profile." }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveOther(Other model)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));

            if (user.Role.Name == "Super Admin")
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
            try
            {
                if (model.ID == 0)
                {
                    model.AddedBy = Convert.ToInt32(User.Identity.Name);
                    model.AddedAt = DateTime.Now;
                    model.CompanyID = user.ActiveBranchId;
                    _unitOfWork.OtherRepository.Insert(model);
                    _unitOfWork.Save();

                    return Json(new { Success = true, Id = model.ID, Msg = GlobalVariables.SuccessfulSavedMessage },
                        JsonRequestBehavior.AllowGet);
                }
                else
                {
                    if (model.ID > 0)
                    {
                        var other = _unitOfWork.OtherRepository.GetById(model.ID);
                        if (other.CompanyID == user.ActiveBranchId)
                        {
                            other.GroupLeaderID = model.GroupLeaderID;
                            other.InitialName = model.InitialName;
                            other.FirstName = model.FirstName;
                            other.MiddleName = model.MiddleName;
                            other.LastName = model.LastName;
                            other.Purpose = model.Purpose;
                            other.IssueDate = model.IssueDate;
                            other.DoB = model.DoB;
                            other.SupplierID = model.SupplierID;
                            other.SellTo = model.SellTo;
                            other.PaidAmount = model.PaidAmount;
                            other.PurchaseRate = model.PurchaseRate;
                            other.SellingRate = model.SellingRate;
                            other.PassportNo = model.PassportNo;
                            other.DateOfExpiry = model.DateOfExpiry;
                            _unitOfWork.OtherRepository.Update(other);
                            _unitOfWork.Save();
                            return Json(new { Success = true, Id = model.ID, Msg = GlobalVariables.UpdateMessage },
                                JsonRequestBehavior.AllowGet);
                        }
                    }
                    return Json(new { Success = false, Id = model.ID, Msg = GlobalVariables.FailureMessage }, JsonRequestBehavior.AllowGet);
                }
            }
            catch
            {
                return Json(new { Success = false, Id = model.ID, Msg = GlobalVariables.FailureMessage }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetAllOther()
        {

            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            var others = _unitOfWork.OtherRepository.GetAll();

            if (user.Role.Name == "Super Admin")
            {
                var data = (from other in others
                            select new
                            {
                                other.ID,
                                GroupLeader = other.GroupLeaderID != null ? other.GroupLeader.Name : "",
                                FullName = other.InitialName + " " + other.FirstName + " " + other.MiddleName + " " + other.LastName,
                                other.Purpose
                            })
                           .OrderByDescending(other => other.ID)
                           .ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var data = (from other in others
                            where (other.CompanyID == user.ActiveBranchId)
                            select new
                            {
                                other.ID,
                                GroupLeader = other.GroupLeaderID != null ? other.GroupLeader.Name : "",
                                FullName = other.InitialName + " " + other.FirstName + " " + other.MiddleName + " " + other.LastName,
                                other.Purpose
                            })
                            .OrderByDescending(other => other.ID)
                            .ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }
    }
}