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
    public class SupplierPaymentController : Controller
    {
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();
        // GET: Hajj/Payment
        public ActionResult Index()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            ViewBag.UserRloe = user.Role.Name;
            return View();
        }
        public ActionResult Create(int? hajjiId, int? umrahId)
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
        public ActionResult GetPaymentReceptById(int? id)
        {
            var payment = _unitOfWork.PaymentRepository.GetById(Convert.ToInt32(id));
            var paymentData = _unitOfWork.PaymentRepository.GetAll();
            var groupLeaderData = _unitOfWork.GroupLeaderRepository.GetAll();
            var companyProfiles = _unitOfWork.CompanyProfileRepository.GetAll();

            if (payment.PaymentFor == "Hajji" && payment.HajjiID != null)
            {
                var hajjiData = _unitOfWork.HajjiRepository.GetAll();

                var paymentReceipt = (from PaymentData in paymentData
                                      join HajjiData in hajjiData on PaymentData.HajjiID equals HajjiData.ID
                                      join GroupLeader in groupLeaderData on PaymentData.GroupLeaderID equals GroupLeader.ID
                                      join companyProfile in companyProfiles on PaymentData.CompanyID equals companyProfile.ID
                                      where PaymentData.ID == id
                                      select new
                                      {
                                          Date = PaymentData.PaymentDate,
                                          GroupLeaderName = GroupLeader.Name,
                                          AccountName = HajjiData.InitialName + " " + HajjiData.FirstName + " " + HajjiData.MiddleName + " " + HajjiData.LastName,
                                          Amount = PaymentData.Amount,
                                          MrNo = PaymentData.ID,
                                          companyProfile.ImageAttach

                                      }).FirstOrDefault();

                return Json(paymentReceipt, JsonRequestBehavior.AllowGet);
            }
            else if (payment.PaymentFor == "Umrah" && payment.UmrahID != null)
            {
                var umrahData = _unitOfWork.UmrahRepository.GetAll();
                var paymentReceipt = (from PaymentData in paymentData
                                      join UmrahData in umrahData on PaymentData.UmrahID equals UmrahData.ID
                                      join GroupLeader in groupLeaderData on PaymentData.GroupLeaderID equals GroupLeader.ID
                                      join companyProfile in companyProfiles on PaymentData.CompanyID equals companyProfile.ID
                                      where PaymentData.ID == id
                                      select new
                                      {
                                          Date = PaymentData.PaymentDate,
                                          GroupLeaderName = GroupLeader.Name,
                                          AccountName = UmrahData.InitialName + " " + UmrahData.FirstName + " " + UmrahData.MiddleName + " " + UmrahData.LastName,
                                          Amount = PaymentData.Amount,
                                          MrNo = PaymentData.ID,
                                          companyProfile.ImageAttach

                                      }).FirstOrDefault();
                return Json(paymentReceipt, JsonRequestBehavior.AllowGet);
            }
            return Json(null, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetHajjiByrouteId(int? id)
        {
            var hajji = _unitOfWork.HajjiRepository.GetById(Convert.ToInt32(id));
            var data = new
            {
                hajji.ID,
                HajjiReference = hajji.FirstName,
                hajji.GroupLeaderID,
                GroupLeader =hajji.GroupLeader.Name,
                PaymentFor = "Hajji"  
            };
            
            return Json(data,JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetPaymentById(int id)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            var aPayment = _unitOfWork.SupplierPaymentRepository.GetById(id);

            if (user.ActiveBranchId == aPayment.CompanyID)
            {
                var data = new
                {
                    aPayment.Id,
                    SupplierName = aPayment.Supplier != null ? aPayment.Supplier.SupplierName : "",
                    aPayment.PaymentDate,
                    aPayment.Amount,
                    aPayment.SupplierId,
                    PaymentFor = aPayment.PaymentFor != null ? aPayment.PaymentFor : "",
                };

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = false, errorCode = 1001, errorMessage = "You have not permission to view this Company Profile." }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult SaveSupplierPayment(SupplierPayment model)
        {

            var userId = Convert.ToInt32(User.Identity.Name);
            var user = _unitOfWork.UserRepository.GetById(userId);
            if (user.Role.Name == "Super Admin")
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
            try
            {
                if (model.Id == 0)
                {
                    //model.Status = "Pending";
                    model.AddedBy = userId;
                    model.AddedAt = DateTime.Now;
                    model.CompanyID = user.ActiveBranchId;
                    _unitOfWork.SupplierPaymentRepository.Insert(model);
                    _unitOfWork.Save();

                    return Json(new { Success = true, Id = model.Id, Msg = GlobalVariables.SuccessfulSavedMessage },
                        JsonRequestBehavior.AllowGet);
                }
                else
                {
                    if (model.Id > 0)
                    {
                        var aPayment = _unitOfWork.SupplierPaymentRepository.GetById(model.Id);
                        if (aPayment.CompanyID == user.ActiveBranchId)
                        {
                            aPayment.ModifiedBy = userId;
                            aPayment.ModifiedAt = DateTime.Now;

                            aPayment.SupplierId = model.SupplierId;
                            aPayment.PaymentDate = model.PaymentDate;
                            aPayment.Amount = model.Amount;
                            aPayment.PaymentFor = model.PaymentFor;
                            _unitOfWork.SupplierPaymentRepository.Update(aPayment);
                            _unitOfWork.Save();
                            return Json(new { Success = true, Id = model.Id, Msg = GlobalVariables.UpdateMessage },
                                JsonRequestBehavior.AllowGet);
                        }
                    }
                    return Json(new { Success = false, Id = model.Id, Msg = GlobalVariables.FailureMessage }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception e)
            {
                return Json(new { Success = false, Id = model.Id, Msg = GlobalVariables.FailureMessage }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetAllPayment()
        {
            var userId = Convert.ToInt32(User.Identity.Name);
            var user = _unitOfWork.UserRepository.GetById(userId);

            var payment = _unitOfWork.SupplierPaymentRepository.GetAll();
            if (user.Role.Name == "Super Admin")
            {
                var payments = (from a in payment
                            select new
                            {
                                a.Id,
                                FullName = a.Supplier.SupplierName,
                                a.PaymentFor,
                                a.PaymentDate,
                                a.Amount
                            }).OrderByDescending(a => a.Id).ToList();
                var data = (from a in payments
                            select new
                            {
                                a.Id,
                                a.FullName,
                                a.PaymentFor,
                                PaymentDate = a.PaymentDate.Value.ToString(GlobalVariables.DateFormat),
                                a.Amount
                            }).OrderByDescending(a => a.Id).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var payments = (from a in payment
                            where (a.CompanyID == user.ActiveBranchId)
                            select new
                            {
                                a.Id,
                                FullName = a.Supplier.SupplierName,
                                a.PaymentFor,
                                a.PaymentDate,
                                a.Amount
                            }).OrderByDescending(a => a.Id).ToList();
                var data = (from a in payments
                            select new
                            {
                                a.Id,
                                a.FullName,
                                a.PaymentFor,
                                PaymentDate = a.PaymentDate.Value.ToString(GlobalVariables.DateFormat),
                                a.Amount
                            }).OrderByDescending(a => a.Id).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetAllSupplier()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            var suppliers = _unitOfWork.SupplierRepository.GetAll();
            var data = (from a in suppliers
                        where (a.CompanyId == user.ActiveBranchId)
                        select new
                        {
                            a.Id,
                            a.SupplierName
                        }).ToList();

            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllPurpose()
        {
            var purposes = _unitOfWork.TransactionTypeRepository.GetAll();
            var data = (from a in purposes
                        select new
                        {
                            a.Id,
                            a.Name
                        }).ToList();

            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllHajji(int? Id, string PaymentFor)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));

            if (PaymentFor == "Hajji" && Id != null)
            {
                var hajjiList = _unitOfWork.HajjiRepository.GetAll();
                var data = (from a in hajjiList
                            where (a.GroupLeaderID == Id && a.CompanyID == user.ActiveBranchId)
                            select new
                            {
                                a.ID,
                                hajjiId = a.HajjID + "-" + a.FirstName,

                            }).ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else if (PaymentFor == "Umrah" && Id != null)
            {
                var umrahList = _unitOfWork.UmrahRepository.GetAll();

                var data = (from a in umrahList
                            where (a.GroupLeaderID == Id && a.CompanyID == user.ActiveBranchId)
                            select new
                            {
                                a.ID,
                                hajjiId = a.UmrahID + "-" + a.FirstName,

                            }).ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var data = "";
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public ActionResult GetHajjiInfoByHajjiId(int? hajjiId)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));

            if (hajjiId == null)
            {
                return HttpNotFound();
            }
            var hajji = _unitOfWork.HajjiRepository.GetById((int)hajjiId);

            if (hajji == null)
            {
                return HttpNotFound();
            }

            var paidAmount = (from payment in _unitOfWork.PaymentRepository.GetAll()
                            where payment.HajjiID == hajji.ID && payment.CompanyID == user.ActiveBranchId
                            && (payment.PaymentType == "Cash" || payment.PaymentType == "Cheque" && payment.Status != "Pending")
                            select new { Amount = payment.Amount }
                            ).Sum(a => a.Amount);

            var due = (hajji.ContractAmount ?? 0) - (paidAmount ?? 0);

            return Json(new { hajji.ID, hajji.GroupLeaderID, hajji.ContractAmount, due }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetUmrahInfoByHajjiId(int? umrahId)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));

            if (umrahId == null)
            {
                return HttpNotFound();
            }
            var umrah = _unitOfWork.UmrahRepository.GetById((int)umrahId);

            if (umrah == null)
            {
                return HttpNotFound();
            }

            var paidAmount = (from payment in _unitOfWork.PaymentRepository.GetAll()
                              where payment.UmrahID == umrah.ID && payment.CompanyID == user.ActiveBranchId
                              && (payment.PaymentType == "Cash" || payment.PaymentType == "Cheque" && payment.Status != "Pending")
                              select new { Amount = payment.Amount }
                            ).Sum(a => a.Amount);

            var due = (umrah.ContractAmount ?? 0) - (paidAmount ?? 0);

            return Json(new { umrah.ID, umrah.GroupLeaderID, umrah.ContractAmount, due }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetHajjiDueAmount(int? HajjiID, int? UmrahID)
        {
            var hajjidata = _unitOfWork.HajjiRepository.GetAll();
            var umrahData = _unitOfWork.UmrahRepository.GetAll();
            var bookingData = _unitOfWork.BookingRepository.GetAll();
            var paymentData = _unitOfWork.PaymentRepository.GetAll();
            if (HajjiID != null)
            {
                var contractAmount = (from a in hajjidata
                                      where (a.ID == HajjiID)
                                      select new
                                      {
                                          a.ContractAmount
                                      }).FirstOrDefault();
                var contractAmountTemp = contractAmount != null ? contractAmount.ContractAmount : 0;


                var bookingAmount = (from a in bookingData
                                     where (a.HajjiID == HajjiID)
                                     select new
                                     {
                                         a.PaidAmount
                                     }).FirstOrDefault();
                var bookingAmountTemp = bookingAmount != null ? bookingAmount.PaidAmount : 0;

                var payments = (from a in paymentData
                                where (a.HajjiID == HajjiID)
                                select a
                                ).Sum(a => a.Amount);

                payments = payments != null ? payments : 0;

                var due = (contractAmountTemp - (bookingAmountTemp + payments));

                return Json(due, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var contractAmount = (from a in umrahData
                                      where (a.ID == UmrahID)
                                      select new
                                      {
                                          a.ContractAmount
                                      }).FirstOrDefault();
                var contractAmountTemp = contractAmount != null ? contractAmount.ContractAmount : 0;


                var bookingAmount = (from a in bookingData
                                     where (a.UmrahID == UmrahID)
                                     select new
                                     {
                                         a.PaidAmount
                                     }).FirstOrDefault();
                var bookingAmountTemp = bookingAmount != null ? bookingAmount.PaidAmount : 0;

                var payments = (from a in paymentData
                                where (a.UmrahID == UmrahID)
                                select a
                                ).Sum(a => a.Amount);

                payments = payments != null ? payments : 0;

                var due = (contractAmountTemp - (bookingAmountTemp + payments));

                return Json(due, JsonRequestBehavior.AllowGet);
            }
        }

    }
}
