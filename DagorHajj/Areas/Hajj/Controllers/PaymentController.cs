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
    public class PaymentController : Controller
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
            //

            if (user.Role.Name == "Super Admin")
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
            if (hajjiId != null)
            {
                //&& groupLeaderId != null
                ViewBag.Hajji = hajjiId;
                //ViewBag.GroupLeaderId = groupLeaderId;
            }
            else if (umrahId != null)
            {
                ViewBag.Umrah = umrahId;
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
            var aPayment = _unitOfWork.PaymentRepository.GetById(id);

            if (user.ActiveBranchId == aPayment.CompanyID)
            {
                var data = new
                {
                    aPayment.ID,
                    GroupLeader = aPayment.GroupLeader.Name,
                    HajjiReference = aPayment.PaymentFor == "Hajji" ? aPayment.Hajji.HajjID + " - " + aPayment.Hajji.FirstName : aPayment.Umrah.UmrahID + " - " + aPayment.Umrah.FirstName,
                    aPayment.PaymentDate,
                    PaymentType = aPayment.PaymentType != null ? aPayment.PaymentType : "",
                    aPayment.Amount,
                    aPayment.HajjiID,
                    aPayment.UmrahID,
                    aPayment.GroupLeaderID,
                    aPayment.ChequeNo,
                    aPayment.ChequeDate,
                    aPayment.BankName,
                    aPayment.Branch,
                    PaymentFor = aPayment.PaymentFor != null ? aPayment.PaymentFor : "",
                };

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = false, errorCode = 1001, errorMessage = "You have not permission to view this Company Profile." }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult SavePayment(Payment model)
        {
            var userId = Convert.ToInt32(User.Identity.Name);
            var user = _unitOfWork.UserRepository.GetById(userId);
            if (user.Role.Name == "Super Admin")
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
            try
            {
                if (model.ID == 0)
                {
                    model.Status = "Pending";
                    model.AddedBy = userId;
                    model.AddedAt = DateTime.Now;
                    model.CompanyID = user.ActiveBranchId;
                    _unitOfWork.PaymentRepository.Insert(model);
                    _unitOfWork.Save();

                    return Json(new { Success = true, Id = model.ID, Msg = GlobalVariables.SuccessfulSavedMessage },
                        JsonRequestBehavior.AllowGet);
                }
                else
                {
                    if (model.ID > 0)
                    {
                        var aPayment = _unitOfWork.PaymentRepository.GetById(model.ID);
                        if (aPayment.CompanyID == user.ActiveBranchId)
                        {
                            aPayment.ModifiedBy = userId;
                            aPayment.ModifiedAt = DateTime.Now;

                            aPayment.GroupLeaderID = model.GroupLeaderID;
                            aPayment.HajjiID = model.HajjiID;
                            aPayment.UmrahID = model.UmrahID;
                            aPayment.PaymentDate = model.PaymentDate;
                            aPayment.PaymentType = model.PaymentType;
                            aPayment.ChequeNo = model.ChequeNo;
                            aPayment.ChequeDate = model.ChequeDate;
                            aPayment.BankName = model.BankName;
                            aPayment.Branch = model.Branch;
                            aPayment.Amount = model.Amount;
                            aPayment.PaymentFor = model.PaymentFor;
                            _unitOfWork.PaymentRepository.Update(aPayment);
                            _unitOfWork.Save();
                            return Json(new { Success = true, Id = model.ID, Msg = GlobalVariables.UpdateMessage },
                                JsonRequestBehavior.AllowGet);
                        }
                    }
                    return Json(new { Success = false, Id = model.ID, Msg = GlobalVariables.FailureMessage }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception e)
            {
                return Json(new { Success = false, Id = model.ID, Msg = GlobalVariables.FailureMessage }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetAllPayment()
        {
            var userId = Convert.ToInt32(User.Identity.Name);
            var user = _unitOfWork.UserRepository.GetById(userId);

            var payment = _unitOfWork.PaymentRepository.GetAll();
            if (user.Role.Name == "Super Admin")
            {
                var data = (from a in payment
                            select new
                            {
                                a.ID,
                                FullName = a.HajjiID == null ? a.Umrah.InitialName + " " + a.Umrah.FirstName + " " + a.Umrah.MiddleName + " " + a.Hajji.LastName : a.Hajji.InitialName + " " + a.Hajji.FirstName + " " + a.Hajji.MiddleName + " " + a.Hajji.LastName,
                                ContactNo = a.HajjiID == null ? a.Umrah.ContactNo : a.Hajji.ContactNo,
                                ContractAmount = a.HajjiID == null ? a.Umrah.ContractAmount : a.Hajji.ContractAmount,
                                a.GroupLeader.Name,
                                a.PaymentFor
                            }).OrderByDescending(a => a.ID).ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var data = (from a in payment
                            where (a.CompanyID == user.ActiveBranchId)
                            select new
                            {
                                a.ID,
                                FullName = a.HajjiID == null ? a.Umrah.InitialName + " " + a.Umrah.FirstName + " " + a.Umrah.MiddleName + " " + a.Hajji.LastName : a.Hajji.InitialName + " " + a.Hajji.FirstName + " " + a.Hajji.MiddleName + " " + a.Hajji.LastName,
                                ContactNo = a.HajjiID == null ? a.Umrah.ContactNo : a.Hajji.ContactNo,
                                ContractAmount = a.HajjiID == null ? a.Umrah.ContractAmount : a.Hajji.ContractAmount,
                                a.GroupLeader.Name,
                                a.PaymentFor
                            }).OrderByDescending(a => a.ID).ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetAllLeaders()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            var groupLeaders = _unitOfWork.GroupLeaderRepository.GetAll();
            var data = (from a in groupLeaders
                        where (a.CompanyID == user.ActiveBranchId)
                        select new
                        {
                            a.ID,
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
            else if (PaymentFor == "Ticket" && Id != null)
            {
                var ticketList = _unitOfWork.TicketRepository.GetAll();
                var data = (from a in ticketList
                            where (a.GroupLeaderID == Id && a.CompanyID == user.ActiveBranchId)
                            select new
                            {
                                a.ID,
                                hajjiId = a.ID + "-" + a.FirstName,
                            }).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else if (PaymentFor == "Others" && Id != null)
            {
                var umrahList = _unitOfWork.OtherRepository.GetAll();

                var data = (from a in umrahList
                            where (a.GroupLeaderID == Id && a.CompanyID == user.ActiveBranchId)
                            select new
                            {
                                a.ID,
                                hajjiId = a.ID + "-" + a.FirstName,

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
        public ActionResult GetUmrahInfoByUmrahId(int? umrahId)
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

        [HttpGet]
        public ActionResult GetTicketInfoByTicketId(int? ticketId)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));

            if (ticketId == null)
            {
                return HttpNotFound();
            }
            var umrah = _unitOfWork.TicketRepository.GetById((int)ticketId);

            if (umrah == null)
            {
                return HttpNotFound();
            }

            var paidAmount = (from payment in _unitOfWork.PaymentRepository.GetAll()
                              where payment.TicketId == umrah.ID && payment.CompanyID == user.ActiveBranchId
                              && (payment.PaymentType == "Cash" || payment.PaymentType == "Cheque" && payment.Status != "Pending")
                              select new { Amount = payment.Amount }
                            ).Sum(a => a.Amount);

            var due = (umrah.SellingRate ?? 0) - (umrah.PaidAmount ?? 0) - (paidAmount ?? 0);

            return Json(new { umrah.ID, umrah.GroupLeaderID, umrah.SellingRate, due }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetOtherInfoByOtherId(int? otherId)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));

            if (otherId == null)
            {
                return HttpNotFound();
            }
            var umrah = _unitOfWork.OtherRepository.GetById((int)otherId);

            if (umrah == null)
            {
                return HttpNotFound();
            }

            var paidAmount = (from payment in _unitOfWork.PaymentRepository.GetAll()
                              where payment.OtherId == umrah.ID && payment.CompanyID == user.ActiveBranchId
                              && (payment.PaymentType == "Cash" || payment.PaymentType == "Cheque" && payment.Status != "Pending")
                              select new { Amount = payment.Amount }
                            ).Sum(a => a.Amount);

            var due = (umrah.SellingRate ?? 0) - (umrah.PaidAmount ?? 0) - (paidAmount ?? 0);

            return Json(new { umrah.ID, umrah.GroupLeaderID, umrah.SellingRate, due }, JsonRequestBehavior.AllowGet);
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
