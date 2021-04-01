using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DagorHajj.Models;
using DagorHajj.Utility;
using DagorHajj.DAL;
using System.Globalization;

namespace DagorHajj.Areas.Hajj.Controllers
{
    [SafelyAuthorize]
    public class ChequeManagementController : Controller
    {
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();
        public ActionResult Index()
        {
            return View();
        }       
       
        public JsonResult ChequeManagementReport()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            var payments = _unitOfWork.PaymentRepository
                .GetAll()
                .Where(x => x.CompanyID == user.ActiveBranchId && x.ChequeNo != null && x.Status == "Pending")
                .ToList();

            var data = (from payment in payments
                        select new
                        {
                            payment.ID,
                            payment.ChequeNo,
                            GroupLeaderName = payment.GroupLeader.Name,
                            ChequeDate = Convert.ToDateTime(payment.ChequeDate).ToString("dd-MM-yyyy"),
                            payment.BankName,
                            payment.Branch
                        }).ToList();
            return Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateChequeManagement(Payment payment)
        {
            var existingPayment = _unitOfWork.PaymentRepository.GetById(payment.ID);

            existingPayment.Status = payment.Status;
            existingPayment.Remarks = payment.Remarks;
            existingPayment.StatusChangableDate = DateTime.Now;

            _unitOfWork.PaymentRepository.Update(existingPayment);
            _unitOfWork.Save();

            return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}