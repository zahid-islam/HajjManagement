using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DagorHajj.Models;
using DagorHajj.Utility;
using DagorHajj.DAL;
using System.Globalization;
using DagorHajj.Areas.Hajj.ViewModel;

namespace DagorHajj.Areas.Hajj.Controllers
{
    [SafelyAuthorize]
    public class ReportsController : Controller
    {
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ReportHajj()
        {
            return View("ReportHajj");
        }

        public JsonResult GetAllTicket()
        {
            var tickets = _unitOfWork.TicketRepository.GetAll();
            var data = (from t in tickets
                        select new
                        {
                            t.ID,
                            Name = t.ID + "-" + t.MiddleName
                        }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllOther()
        {
            var others = _unitOfWork.OtherRepository.GetAll();
            var data = (from o in others
                        select new
                        {
                            o.ID,
                            Name = o.ID + "-" + o.MiddleName
                        }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetHajjInfoById(int hajjId)
        {
            var hajji = _unitOfWork.HajjiRepository.GetById(hajjId);
            var company = _unitOfWork.CompanyProfileRepository.GetById(hajji.CompanyID);

            var hajjiInfo = new
            {
                FullName = hajji.InitialName + ' ' + hajji.FirstName + ' ' + hajji.MiddleName + ' ' + hajji.LastName,
                hajji.TrackingNo,
                PreRegistratioNo = "AK20"
            };

            var companyInfo = new
            {
                company.ConpanyName,
                company.LicenseNo,
                company.Designation,
                company.OwnersName,
                //company.PackageName,
                //company.PackageRate
            };

            return Json(new { hajjiInfo, companyInfo }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GroupLeader()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            var grpLeader = _unitOfWork.GroupLeaderRepository.GetAll().Where(x => x.CompanyID == user.ActiveBranchId);
            var data = (from g in grpLeader
                        select new
                        {
                            g.ID,
                            g.Name
                        }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AllHajji()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            var hajji = _unitOfWork.HajjiRepository.GetAll().Where(x => x.CompanyID == user.ActiveBranchId);
            var data = (from h in hajji
                        where h.FirstName != null && h.InitialName != null
                        select new
                        {
                            h.ID,
                            FullName = h.InitialName + h.FirstName + h.MiddleName + h.LastName,
                            h.GroupLeaderID
                        }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PartyLedgerReportByPartyName(string groupLeaderName, int? groupLeaderId, string fromDate, string toDate, int? id)
        {
            int grpLeaderId = groupLeaderId ?? 0;
            int collPaymentTypeId = id ?? 0;

            if (String.IsNullOrEmpty(fromDate) == true)
            {
                fromDate = null;
            }
            if (String.IsNullOrEmpty(toDate) == true)
            {
                toDate = null;
            }

            var logedInUserId = Convert.ToInt32(User.Identity.Name);
            var logedInCompanyId = _unitOfWork.UserRepository.GetById(logedInUserId).ActiveBranchId;

            if (grpLeaderId > 0)
            {
                if (collPaymentTypeId > 0)
                {
                    if (id == 1)
                    {
                        var hajjis = _unitOfWork.HajjiRepository.GetAll().ToList();
                        var paymentCollections = _unitOfWork.PaymentRepository.GetAll().ToList();

                        var paymentsData = (from p in paymentCollections
                                            where p.GroupLeaderID == grpLeaderId
                                            && p.HajjiID != null
                                            && (fromDate != null ? p.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                            && (toDate != null ? p.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                            && p.CompanyID == logedInCompanyId
                                            select new PartyLedgerVewiModel
                                            {
                                                ID = p.ID,
                                                Date = Convert.ToDateTime(p.PaymentDate).ToString("dd-MM-yyyy"),
                                                PaymentFor = p.PaymentFor,
                                                ReceivableAmount = 0,
                                                ReceivedAmount = p.Amount ?? 0,
                                                Status = 1
                                            }).ToList();

                        var hajjisData = (from h in hajjis
                                          where h.GroupLeaderID == grpLeaderId
                                          && (fromDate != null ? h.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                          && (toDate != null ? h.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                          && h.CompanyID == logedInCompanyId
                                          select new PartyLedgerVewiModel
                                          {
                                              ID = h.ID,
                                              Date = Convert.ToDateTime(h.AddedAt).ToString("dd-MM-yyyy"),
                                              PaymentFor = "Hajji",
                                              ReceivableAmount = h.ContractAmount ?? 0,
                                              ReceivedAmount = 0,
                                              Status = 2
                                          }).ToList();
                        //var data = hajjisData.Union(paymentsData).GroupBy(x => DateTime.ParseExact(x.Date, "dd-MM-yyyy", CultureInfo.InvariantCulture));
                        var data = hajjisData.Union(paymentsData).OrderBy(x => x.Date);
                        var date = new { fromDate, toDate };
                        return Json(new { Success = true, data, date, groupLeaderName }, JsonRequestBehavior.AllowGet);
                    }
                    else if (id == 2)
                    {
                        var umrahs = _unitOfWork.UmrahRepository.GetAll().ToList();
                        var paymentCollections = _unitOfWork.PaymentRepository.GetAll().ToList();

                        var paymentsData = (from p in paymentCollections
                                            where p.GroupLeaderID == grpLeaderId
                                            && p.UmrahID != null
                                            && (fromDate != null ? p.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                            && (toDate != null ? p.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                            && p.CompanyID == logedInCompanyId
                                            select new PartyLedgerVewiModel
                                            {
                                                ID = p.ID,
                                                Date = Convert.ToDateTime(p.PaymentDate).ToString("dd-MM-yyyy"),
                                                PaymentFor = p.PaymentFor,
                                                ReceivableAmount = 0,
                                                ReceivedAmount = p.Amount ?? 0,
                                                Status = 1
                                            }).ToList();

                        var umrahsData = (from u in umrahs
                                          where u.GroupLeaderID == grpLeaderId
                                          && (fromDate != null ? u.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                          && (toDate != null ? u.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                          && u.CompanyID == logedInCompanyId
                                          select new PartyLedgerVewiModel
                                          {
                                              ID = u.ID,
                                              Date = Convert.ToDateTime(u.AddedAt).ToString("dd-MM-yyyy"),
                                              PaymentFor = "Umrah",
                                              ReceivableAmount = u.ContractAmount ?? 0,
                                              ReceivedAmount = 0,
                                              Status = 2
                                          }).ToList();
                        var data = umrahsData.Union(paymentsData).OrderBy(x => x.Date);
                        var date = new { fromDate, toDate };
                        return Json(new { Success = true, data, date, groupLeaderName }, JsonRequestBehavior.AllowGet);
                    }
                    else if (id == 3)
                    {
                        var tickets = _unitOfWork.TicketRepository.GetAll().ToList();
                        var paymentCollections = _unitOfWork.PaymentRepository.GetAll().ToList();

                        var paymentsData = (from p in paymentCollections
                                            where p.GroupLeaderID == grpLeaderId
                                            && p.TicketId != null
                                            && (fromDate != null ? p.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                            && (toDate != null ? p.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                            && p.CompanyID == logedInCompanyId
                                            select new PartyLedgerVewiModel
                                            {
                                                ID = p.ID,
                                                Date = Convert.ToDateTime(p.PaymentDate).ToString("dd-MM-yyyy"),
                                                PaymentFor = p.PaymentFor,
                                                ReceivableAmount = 0,
                                                ReceivedAmount = p.Amount ?? 0,
                                                Status = 1
                                            }).ToList();

                        var ticketsData = (from t in tickets
                                          where t.GroupLeaderID == grpLeaderId
                                          && (fromDate != null ? t.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                          && (toDate != null ? t.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                          && t.CompanyID == logedInCompanyId
                                          select new PartyLedgerVewiModel
                                          {
                                              ID = t.ID,
                                              Date = Convert.ToDateTime(t.AddedAt).ToString("dd-MM-yyyy"),
                                              PaymentFor = "Ticket",
                                              ReceivableAmount = Convert.ToInt32(t.SellingRate ?? 0),
                                              ReceivedAmount = 0,
                                              Status = 2
                                          }).ToList();
                        var data = ticketsData.Union(paymentsData).OrderBy(x => x.Date);
                        var date = new { fromDate, toDate };
                        return Json(new { Success = true, data, date, groupLeaderName }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        var others = _unitOfWork.OtherRepository.GetAll().ToList();
                        var paymentCollections = _unitOfWork.PaymentRepository.GetAll().ToList();

                        var paymentsData = (from p in paymentCollections
                                            where p.GroupLeaderID == grpLeaderId
                                            && p.OtherId != null
                                            && (fromDate != null ? p.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                            && (toDate != null ? p.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                            && p.CompanyID == logedInCompanyId
                                            select new PartyLedgerVewiModel
                                            {
                                                ID = p.ID,
                                                Date = Convert.ToDateTime(p.PaymentDate).ToString("dd-MM-yyyy"),
                                                PaymentFor = p.PaymentFor,
                                                ReceivableAmount = 0,
                                                ReceivedAmount = p.Amount ?? 0,
                                                Status = 1
                                            }).ToList();

                        var othersData = (from o in others
                                          where o.GroupLeaderID == grpLeaderId
                                          && (fromDate != null ? o.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                          && (toDate != null ? o.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                          && o.CompanyID == logedInCompanyId
                                          select new PartyLedgerVewiModel
                                          {
                                              ID = o.ID,
                                              Date = Convert.ToDateTime(o.AddedAt).ToString("dd-MM-yyyy"),
                                              PaymentFor = "Other",
                                              ReceivableAmount = Convert.ToInt32(o.SellingRate ?? 0),
                                              ReceivedAmount = 0,
                                              Status = 2
                                          }).ToList();
                        var data = othersData.Union(paymentsData).OrderBy(x => x.Date);
                        var date = new { fromDate, toDate };
                        return Json(new { Success = true, data, date, groupLeaderName }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    var hajjis = _unitOfWork.HajjiRepository.GetAll().ToList();
                    var umrahs = _unitOfWork.UmrahRepository.GetAll().ToList();
                    var tickets = _unitOfWork.TicketRepository.GetAll().ToList();
                    var others = _unitOfWork.OtherRepository.GetAll().ToList();
                    var paymentCollections = _unitOfWork.PaymentRepository.GetAll().ToList();

                    var paymentsData = (from p in paymentCollections
                                        where p.GroupLeaderID == grpLeaderId
                                        && (fromDate != null ? p.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                        && (toDate != null ? p.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                        && p.CompanyID == logedInCompanyId
                                        select new PartyLedgerVewiModel
                                        {
                                            ID = p.ID,
                                            Date = Convert.ToDateTime(p.PaymentDate).ToString("dd-MM-yyyy"),
                                            PaymentFor = p.PaymentFor,
                                            ReceivableAmount = 0,
                                            ReceivedAmount = p.Amount ?? 0,
                                            Status = 1
                                        }).ToList();

                    var hajjisData = (from h in hajjis
                                      where h.GroupLeaderID == grpLeaderId
                                      && (fromDate != null ? h.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                      && (toDate != null ? h.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                      && h.CompanyID == logedInCompanyId
                                      select new PartyLedgerVewiModel
                                      {
                                          ID = h.ID,
                                          Date = Convert.ToDateTime(h.AddedAt).ToString("dd-MM-yyyy"),
                                          PaymentFor = "Hajji",
                                          ReceivableAmount = h.ContractAmount ?? 0,
                                          ReceivedAmount = 0,
                                          Status = 2
                                      }).ToList();

                    var umrahsData = (from u in umrahs
                                      where u.GroupLeaderID == grpLeaderId
                                      && (fromDate != null ? u.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                      && (toDate != null ? u.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                      && u.CompanyID == logedInCompanyId
                                      select new PartyLedgerVewiModel
                                      {
                                          ID = u.ID,
                                          Date = Convert.ToDateTime(u.AddedAt).ToString("dd-MM-yyyy"),
                                          PaymentFor = "Umrah",
                                          ReceivableAmount = u.ContractAmount ?? 0,
                                          ReceivedAmount = 0,
                                          Status = 2
                                      }).ToList();

                    var ticketsData = (from t in tickets
                                       where t.GroupLeaderID == grpLeaderId
                                       && (fromDate != null ? t.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                       && (toDate != null ? t.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                       && t.CompanyID == logedInCompanyId
                                       select new PartyLedgerVewiModel
                                       {
                                           ID = t.ID,
                                           Date = Convert.ToDateTime(t.AddedAt).ToString("dd-MM-yyyy"),
                                           PaymentFor = "Ticket",
                                           ReceivableAmount = Convert.ToInt32(t.SellingRate ?? 0),
                                           ReceivedAmount = 0,
                                           Status = 2
                                       }).ToList();

                    var othersData = (from o in others
                                      where o.GroupLeaderID == grpLeaderId
                                      && (fromDate != null ? o.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                      && (toDate != null ? o.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                      && o.CompanyID == logedInCompanyId
                                      select new PartyLedgerVewiModel
                                      {
                                          ID = o.ID,
                                          Date = Convert.ToDateTime(o.AddedAt).ToString("dd-MM-yyyy"),
                                          PaymentFor = "Other",
                                          ReceivableAmount = Convert.ToInt32(o.SellingRate ?? 0),
                                          ReceivedAmount = 0,
                                          Status = 2
                                      }).ToList();
                    var data = hajjisData.Union(umrahsData).Union(ticketsData).Union(othersData).Union(paymentsData).OrderBy(x => x.Date).ThenBy(y=>y.PaymentFor);
                    var date = new { fromDate, toDate };
                    return Json(new { Success = true, data, date, groupLeaderName }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult PartyLedgerReportByCompanyId(string fromDate, string toDate)
        {
            if (fromDate == "" || toDate == "")
            {
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
            DateTime from_date = Convert.ToDateTime(fromDate);
            DateTime to_date = Convert.ToDateTime(toDate);
            var logedInUserId = Convert.ToInt32(User.Identity.Name);
            var logedInCompanyId = _unitOfWork.UserRepository.GetById(logedInUserId).ActiveBranchId;

            var payments = _unitOfWork.PaymentRepository.GetAll().Where(x => x.PaymentDate >= from_date && x.PaymentDate <= to_date).ToList();
            var groupLeaders = _unitOfWork.GroupLeaderRepository.GetAll().Where(x => x.CompanyID == logedInCompanyId).ToList();
            var data = (from payment in payments
                        join groupLeader in groupLeaders on payment.GroupLeaderID equals groupLeader.ID
                        select new
                        {
                            payment.ID,
                            groupLeader.Name,
                            PaymentDate = Convert.ToDateTime(payment.PaymentDate).ToString("dd-MM-yyyy"),
                            payment.PaymentFor,
                            payment.Amount
                        }).ToList();
            var date = new { fromDate, toDate };
            return Json(new { Success = true, data, date }, JsonRequestBehavior.AllowGet);
        }

        //public JsonResult OtherInvoiceTicket(int id)
        //{
        //    var logedInUserId = Convert.ToInt32(User.Identity.Name);
        //    var logedInCompanyId = _unitOfWork.UserRepository.GetById(logedInUserId).ActiveBranchId;

        //    var other = _unitOfWork.OtherRepository.GetById(id);
        //    // var groupLeaders = _unitOfWork.GroupLeaderRepository.GetAll().Where(x => x.CompanyID == logedInCompanyId).ToList();
        //    var data = new
        //    {
        //        other.ID,
        //        other.GroupLeader.Name,
        //        InvoiceDate = Convert.ToDateTime(other.AddedAt.Value.Date).ToString("dd-MM-yyyy"),
        //        PassengerName = other.InitialName + " " + other.FirstName + " " + other.MiddleName + " " + other.LastName,
        //        other.Purpose,
        //        other.PurchaseRate,
        //        other.SellingRate,
        //        other.PaidAmount

        //    };
        //    return Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
        //}

        public ActionResult InvoiceTicketOther()
        {
            return View("InvoiceTicketOther", "~/Views/Shared/_LayoutReport.cshtml");
        }

        public JsonResult GetAllTicketOrOtherById(int? invoiceId, int? invoiceForId)
        {
            int invId = invoiceId ?? 0;
            int invForId = invoiceForId ?? 0;

            if (invId > 0 && invForId > 0)
            {
                var userId = Convert.ToInt32(User.Identity.Name);
                var user = _unitOfWork.UserRepository.GetById(userId);
                if (invoiceForId == 1)
                {
                    var ticket = _unitOfWork.TicketRepository.GetById(invId);
                    var data = new
                    {
                        ticket.ID,
                        PassengerName = ticket.InitialName + " " + ticket.FirstName + " " + ticket.MiddleName + " " + ticket.LastName,
                        ticket.SellingRate,
                        ticket.PurchaseRate,
                        ticket.PaidAmount,
                        ticket.SellTo,
                        ticket.Carier,
                        InvoiceDate = ticket.AddedAt.GetValueOrDefault().ToString("dd-MM-yyyy")
                    };
                    return Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
                }
                else if (invoiceForId == 2)
                {
                    var other = _unitOfWork.OtherRepository.GetById(invForId);
                    var data = new
                    {
                        other.ID,
                        PassengerName = other.InitialName + " " + other.FirstName + " " + other.MiddleName + " " + other.LastName,
                        other.SellingRate,
                        other.PurchaseRate,
                        other.PaidAmount,
                        other.SellTo,
                        other.Purpose,
                        InvoiceDate = other.AddedAt.GetValueOrDefault().ToString("dd-MM-yyyy")
                    };
                    return Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
        }

        //public ActionResult OtherInvoiceTicketByIdReport()
        //{
        //    return View("OtherInvoiceTicketByIdReport", "~/Views/Shared/_LayoutReport.cshtml");
        //}

        public ActionResult PartyLeaderReport()
        {
            return View("PartyLedgerReport", "~/Views/Shared/_LayoutReport.cshtml");
        }


        public ActionResult PartyLeaderReportByDateAndCompanyId()
        {
            return View("PartyLedgerReportByCompanyId", "~/Views/Shared/_LayoutReport.cshtml");
        }

        public JsonResult GetAllHajjStatus()
        {
            var data = (from h in _unitOfWork.HajjiRepository.GetAll().Where(x => x.Status != null)
                        select new
                        {
                            StatusId = h.HajjiStatu.ID,
                            StatusName = h.HajjiStatu.Title,
                        }).Distinct().ToList();


            var jsonResult = Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }

        public JsonResult GetAllUmrahStatus()
        {
            var hajjs = _unitOfWork.UmrahRepository.GetAll().Where(x => x.Status != null);

            var data = (from h in hajjs
                        select new
                        {
                            StatusId = h.UmrahStatu.ID,
                            StatusName = h.UmrahStatu.Title,
                        }).Distinct().ToList();

            var jsonResult = Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }

        public JsonResult GetAllHajjPerform()
        {
            var hajjs = _unitOfWork.HajjiRepository.GetAll().ToList();

            var data = (from h in hajjs
                        select new
                        {
                            h.PerformingHajj,
                        }).Distinct().ToList();


            var jsonResult = Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        public JsonResult GetSupplier()
        {
            var userId = Convert.ToInt32(User.Identity.Name);
            var user = _unitOfWork.UserRepository.GetById(userId);
            var suppliers = _unitOfWork.SupplierRepository.GetAll().Where(x=>x.CompanyId == user.ActiveBranchId).ToList();

            var data = (from s in suppliers
                        select new
                        {
                            s.Id,
                            s.SupplierName,
                        }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetAllHajjList(int? performYear, int? Status, string fromDate, string toDate, int? groupLeaderId)
        {
            int perforYer = performYear ?? 0;
            int stats = Status ?? 0;
            int grpLeaderId = groupLeaderId ?? 0;
            if (String.IsNullOrEmpty(fromDate) == true)
            {
                fromDate = null;
            }
            if (String.IsNullOrEmpty(toDate) == true)
            {
                toDate = null;
            }

            DateTime now1 = DateTime.Now;
            string strDate = now1.ToString("dd-MM-yyyy");

            DateTime from_date = String.IsNullOrEmpty(fromDate)
                ? DateTime.ParseExact("01-01-2010", "dd-MM-yyyy", CultureInfo.InvariantCulture)
                : DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture);

            DateTime to_date = String.IsNullOrEmpty(fromDate)
                ? DateTime.ParseExact(strDate, "dd-MM-yyyy", CultureInfo.InvariantCulture)
                : DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture);

            var userId = Convert.ToInt32(User.Identity.Name);
            var user = _unitOfWork.UserRepository.GetById(userId);
            var hajjs = _unitOfWork.HajjiRepository.GetAll().ToList();

            if (perforYer != 0 || stats != 0 || (fromDate != null && toDate != null) || grpLeaderId != 0)
            {
                var data = (from h in hajjs
                            where (stats > 0 ? h.Status == stats : true)
                            && (perforYer > 0 ? h.PerformingHajj == perforYer : true)
                            && h.AddedAt.GetValueOrDefault().Date >= from_date
                            && h.AddedAt.GetValueOrDefault().Date <= to_date
                            && (h.CompanyID == user.ActiveBranchId)
                            && (grpLeaderId > 0 ? h.GroupLeaderID == grpLeaderId : true)
                            select new
                            {
                                h.ID,
                                FullName = h.InitialName + " " + h.FirstName + " " + h.MiddleName + " " + h.LastName,
                                h.ContactNo,
                                StatusId = h.HajjiStatu != null ? h.HajjiStatu.ID : 0,
                                StatusName = h.HajjiStatu != null ? h.HajjiStatu.Title : null,
                                h.PerformingHajj,
                                h.AddedAt,
                                h.Status,
                                h.ImageAttach,
                                Name = h.GroupLeader != null ? h.GroupLeader.Name : null
                            }).GroupBy(g => g.Status).ToList();

                var jsonResult = Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            else
            {
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }

        }
        //Call from Index Report
        public ActionResult GroupLeaderWiseHajjList()
        {
            return View("GroupLeaderWiseHajjList", "~/Views/Shared/_LayoutReportLandscape.cshtml");
        }

        public JsonResult GetAllUmrahList(int? Status, string flightDate, string fromDate, string toDate, int? groupLeaderId, int? supplierId)
        {
            int suplierId = supplierId ?? 0;
            int stats = Status ?? 0;
            int grpLeaderId = groupLeaderId ?? 0;

            if (String.IsNullOrEmpty(fromDate) == true)
            {
                fromDate = null;
            }
            if (String.IsNullOrEmpty(toDate) == true)
            {
                toDate = null;
            }
            if (String.IsNullOrEmpty(flightDate) == true)
            {
                flightDate = null;
            }

            DateTime now1 = DateTime.Now;
            string strDate = now1.ToString("dd-MM-yyyy");

            DateTime from_date = String.IsNullOrEmpty(fromDate)
                ? DateTime.ParseExact("01-01-2010", "dd-MM-yyyy", CultureInfo.InvariantCulture)
                : DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture);

            DateTime to_date = String.IsNullOrEmpty(fromDate)
                ? DateTime.ParseExact(strDate, "dd-MM-yyyy", CultureInfo.InvariantCulture)
                : DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture);

            var userId = Convert.ToInt32(User.Identity.Name);
            var user = _unitOfWork.UserRepository.GetById(userId);
            var umrah = _unitOfWork.UmrahRepository.GetAll().ToList();

            if (suplierId != 0 || stats != 0 || flightDate != null || (fromDate != null && toDate != null) || grpLeaderId != 0)
            {
                var data = (from u in umrah
                            where (stats > 0 ? u.Status == stats : true)
                            && (suplierId > 0 ? u.SupplierId == suplierId : true)
                            && (fromDate != null ? u.AddedAt.GetValueOrDefault().Date >= from_date : true)
                            && (toDate != null ? u.AddedAt.GetValueOrDefault().Date <= to_date : true)
                            && (flightDate != null ? u.DepartureDate == DateTime.ParseExact(flightDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                            && (u.CompanyID == user.ActiveBranchId)
                            && (grpLeaderId > 0 ? u.GroupLeaderID == grpLeaderId : true)
                            select new
                            {
                                u.ID,
                                FullName = u.InitialName + " " + u.FirstName + " " + u.MiddleName + " " + u.LastName,
                                u.ContactNo,
                                StatusId = u.UmrahStatu == null ? 0 : u.UmrahStatu.ID,
                                StatusName = u.UmrahStatu == null ? null : u.UmrahStatu.Title,
                                u.Status,
                                Name = u.GroupLeader == null ? null : u.GroupLeader.Name,
                                u.ImageAttach,
                                DepartureDate = u.DepartureDate != null ? u.DepartureDate.GetValueOrDefault().ToString("dd-MM-yyyy") : null
                            }).GroupBy(g => g.Status).ToList();

                var jsonResult = Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            else
            {
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
        }
        //Call from Index Report
        public ActionResult GroupLeaderWiseUmrahList()
        {
            return View("GroupLeaderWiseUmrahList", "~/Views/Shared/_LayoutReportLandscape.cshtml");
        }

        public ActionResult GetAllTicketList(int? groupLeaderId, int? supplierId, string flightDate, string IssueDate, string fromDate, string toDate)
        {
            int suplierId = supplierId ?? 0;
            int grpLeaderId = groupLeaderId ?? 0;

            if (String.IsNullOrEmpty(fromDate) == true)
            {
                fromDate = null;
            }
            if (String.IsNullOrEmpty(toDate) == true)
            {
                toDate = null;
            }
            if (String.IsNullOrEmpty(flightDate) == true)
            {
                flightDate = null;
            }
            if (String.IsNullOrEmpty(IssueDate) == true)
            {
                IssueDate = null;
            }

            var userId = Convert.ToInt32(User.Identity.Name);
            var user = _unitOfWork.UserRepository.GetById(userId);
            var tickets = _unitOfWork.TicketRepository.GetAll().ToList();
            var groupLeders = _unitOfWork.GroupLeaderRepository.GetAll().ToList();

            if (suplierId != 0 || flightDate != null || IssueDate != null || (fromDate != null && toDate != null) || grpLeaderId != 0)
            {
                var data = (from t in tickets
                            join groupLeader in groupLeders on t.GroupLeaderID equals groupLeader.ID
                            where (suplierId > 0 ? t.SupplierID == suplierId : true)
                            && (fromDate != null ? t.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                            && (toDate != null ? t.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                            && (flightDate != null ? t.FlightDate == DateTime.ParseExact(flightDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                            && (IssueDate != null ? t.IssueDate == DateTime.ParseExact(IssueDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                            && (t.CompanyID == user.ActiveBranchId)
                            && (grpLeaderId > 0 ? t.GroupLeaderID == grpLeaderId : true)
                            select new
                            {
                                PassangerName = t.FirstName + " " + t.MiddleName + " " + t.LastName,
                                IssueDate = t.IssueDate.GetValueOrDefault().ToString("dd-MM-yyyy"),
                                //IssueDate = Convert.ToDateTime(t.IssueDate).ToShortDateString(),
                                t.Carier,
                                FlightDate = t.FlightDate.GetValueOrDefault().ToString("dd-MM-yyyy"),
                                t.FlightNo,
                                t.TicketNo,
                                t.GroupLeaderID,
                                GroupLeaderName = groupLeader.Name,
                                SupplierName = t.Supplier == null ? null : t.Supplier.SupplierName
                            })
                       .GroupBy(g => g.GroupLeaderID)
                       .ToList();

                var jsonResult = Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            else
            {
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GroupLeaderWiseTicketList()
        {
            return View("GroupLeaderWiseTicketList", "~/Views/Shared/_LayoutReportLandscape.cshtml");
        }

        public ActionResult GetAllOtherList(int? groupLeaderId, int? supplierId, string fromDate, string toDate)
        {
            int suplierId = supplierId ?? 0;
            int grpLeaderId = groupLeaderId ?? 0;

            if (String.IsNullOrEmpty(fromDate) == true)
            {
                fromDate = null;
            }
            if (String.IsNullOrEmpty(toDate) == true)
            {
                toDate = null;
            }

            var userId = Convert.ToInt32(User.Identity.Name);
            var user = _unitOfWork.UserRepository.GetById(userId);
            var others = _unitOfWork.OtherRepository.GetAll().ToList();
            var groupLeders = _unitOfWork.GroupLeaderRepository.GetAll().ToList();

            if (suplierId != 0 || (fromDate != null && toDate != null) || grpLeaderId != 0)
            {
                var data = (from o in others
                            join groupLeader in groupLeders on o.GroupLeaderID equals groupLeader.ID
                            where (suplierId > 0 ? o.SupplierID == suplierId : true)
                            && (fromDate != null ? o.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                            && (toDate != null ? o.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                            && (o.CompanyID == user.ActiveBranchId)
                            && (grpLeaderId > 0 ? o.GroupLeaderID == grpLeaderId : true)
                            select new
                            {
                                PassangerName = o.FirstName + " " + o.MiddleName + " " + o.LastName,
                                o.Purpose,
                                o.PaidAmount,
                                o.GroupLeaderID,
                                GroupLeaderName = groupLeader == null ? null : groupLeader.Name
                            }).GroupBy(g => g.GroupLeaderID).ToList();

                var jsonResult = Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            else
            {
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GroupLeaderWiseOtherList()
        {
            return View("GroupLeaderWiseOtherList", "~/Views/Shared/_LayoutReportLandscape.cshtml");
        }

        public JsonResult GetAllTransactionTypes()
        {
            var transactions = _unitOfWork.TransactionTypeRepository.GetAll().ToList();

            var data = (from t in transactions
                        select new
                        {
                            t.Id,
                            t.Name,
                        }).ToList();

            var jsonResult = Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }

        public JsonResult GetAllSupplerPaymentType()
        {
            var supPaymentTypes = _unitOfWork.SupplierPaymentRepository.GetAll().ToList();

            var data = (from t in supPaymentTypes
                        where t.PaymentFor != null
                        select new
                        {
                            t.PaymentFor,
                        }).Distinct().ToList();

            var jsonResult = Json(data, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }

        public JsonResult GetAllFlightBooking(int? id, string fromDate, string toDate)
        {
            int colPaymentTypeId = id ?? 0;

            if (String.IsNullOrEmpty(fromDate) == true)
            {
                fromDate = null;
            }
            if (String.IsNullOrEmpty(toDate) == true)
            {
                toDate = null;
            }

            if (colPaymentTypeId != 0)
            {
                var userId = Convert.ToInt32(User.Identity.Name);
                var user = _unitOfWork.UserRepository.GetById(userId);
                if (id == 1)
                {
                    var hajjs = _unitOfWork.HajjiRepository.GetAll().ToList();
                    var data = (from h in hajjs
                                where h.CompanyID == user.ActiveBranchId
                                && (fromDate != null ? h.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                && (toDate != null ? h.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                select new
                                {
                                    h.ID,
                                    FullName = h.LastName + "/ " + h.FirstName + " " + h.InitialName,
                                    h.PassportNo,
                                    //DoB = h.DoB != null ? Convert.ToDateTime(h.DoB).ToShortDateString() : null,
                                    DoB = h.DoB != null ? String.Format("{0:ddMMMyyyy}", h.DoB) : null,
                                    PassportExpiryDate = h.PassportExpiryDate != null ? String.Format("{0:ddMMMyyyy}", h.PassportExpiryDate) : null
                                }).ToList();

                    var jsonResult = Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    return jsonResult;
                }
                else if (id == 2)
                {
                    var umrah = _unitOfWork.UmrahRepository.GetAll().ToList();
                    var data = (from u in umrah
                                where u.CompanyID == user.ActiveBranchId
                                && (fromDate != null ? u.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                && (toDate != null ? u.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                select new
                                {
                                    u.ID,
                                    FullName = u.LastName + "/ " + u.FirstName + " " + u.InitialName,
                                    u.PassportNo,
                                    DoB = u.DoB != null ? String.Format("{0:ddMMMyyyy}", u.DoB) : null,
                                    PassportExpiryDate = u.PassportExpiryDate != null ? String.Format("{0:ddMMMyyyy}", u.PassportExpiryDate) : null
                                }).ToList();

                    var jsonResult = Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    return jsonResult;
                }
                else if (id == 3)
                {
                    var tickets = _unitOfWork.TicketRepository.GetAll().ToList();
                    var data = (from t in tickets
                                where t.CompanyID == user.ActiveBranchId
                                && (fromDate != null ? t.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                && (toDate != null ? t.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                select new
                                {
                                    t.ID,
                                    FullName = t.LastName + "/ " + t.FirstName + " " + t.InitialName,
                                    t.PassportNo,
                                    DoB = t.DoB != null ? String.Format("{0:ddMMMyyyy}", t.DoB) : null,
                                    PassportExpiryDate = t.DateOfExpiry != null ? String.Format("{0:ddMMMyyyy}", t.DateOfExpiry) : null
                                }).ToList();

                    var jsonResult = Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    return jsonResult;
                }
                else if (id == 4)
                {
                    var others = _unitOfWork.OtherRepository.GetAll().ToList();
                    var data = (from o in others
                                where o.CompanyID == user.ActiveBranchId
                                && (fromDate != null ? o.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                && (toDate != null ? o.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                select new
                                {
                                    o.ID,
                                    FullName = o.LastName + "/ " + o.FirstName + " " + o.InitialName,
                                    o.PassportNo,
                                    DoB = o.DoB != null ? String.Format("{0:ddMMMyyyy}", o.DoB) : null,
                                    PassportExpiryDate = o.DateOfExpiry != null ? String.Format("{0:ddMMMyyyy}", o.DateOfExpiry) : null
                                }).ToList();

                    var jsonResult = Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    return jsonResult;
                }
                else
                {
                    return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult FlightBookingPassangerList()
        {
            return View("FlightBookingPassangerList", "~/Views/Shared/_LayoutReportLandscape.cshtml");
        }

        public ActionResult GetAllSupplierPayment(int? supplierId, string fromDate, string toDate, string paymentFor)
        {
            int suplierId = supplierId ?? 0;

            if (String.IsNullOrEmpty(fromDate) == true)
            {
                fromDate = null;
            }
            if (String.IsNullOrEmpty(toDate) == true)
            {
                toDate = null;
            }
            if (String.IsNullOrEmpty(paymentFor) == true)
            {
                paymentFor = null;
            }

            var userId = Convert.ToInt32(User.Identity.Name);
            var user = _unitOfWork.UserRepository.GetById(userId);
            var supplierPayments = _unitOfWork.SupplierPaymentRepository.GetAll().ToList();

            if (suplierId != 0 || (fromDate != null && toDate != null) || paymentFor != null)
            {
                var data = (from s in supplierPayments
                            where (suplierId > 0 ? s.SupplierId == suplierId : true)
                            && (fromDate != null ? s.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                            && (toDate != null ? s.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                            && (s.CompanyID == user.ActiveBranchId)
                            && (paymentFor != null ? s.PaymentFor == paymentFor : true)
                            select new
                            {
                                Supplier = s.Supplier.SupplierName,
                                s.PaymentFor,
                                PaymentDate = s.PaymentDate.GetValueOrDefault().ToString("dd-MM-yyyy"),
                                s.Amount
                            }).ToList();

                var jsonResult = Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            else
            {
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult SupplierPaymentList()
        {
            return View("SupplierPaymentListReport", "~/Views/Shared/_LayoutReportLandscape.cshtml");
        }

        public ActionResult GetAllCollectionPayment(int? groupLeaderId, string fromDate, string toDate, int? id)
        {
            int grpLeaderId = groupLeaderId ?? 0;
            int colPaymentTypeId = id ?? 0;

            string paymentType = colPaymentTypeId > 0 ? _unitOfWork.TransactionTypeRepository.GetById(colPaymentTypeId).Name : null;

            if (String.IsNullOrEmpty(fromDate) == true)
            {
                fromDate = null;
            }
            if (String.IsNullOrEmpty(toDate) == true)
            {
                toDate = null;
            }

            var userId = Convert.ToInt32(User.Identity.Name);
            var user = _unitOfWork.UserRepository.GetById(userId);
            var paymentCollections = _unitOfWork.PaymentRepository.GetAll().ToList();

            if (colPaymentTypeId != 0 || grpLeaderId != 0 || (fromDate != null && toDate != null))
            {
                var data = (from p in paymentCollections
                            where (grpLeaderId > 0 ? p.GroupLeaderID == grpLeaderId : true)
                            && (fromDate != null ? p.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                            && (toDate != null ? p.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                            && (p.CompanyID == user.ActiveBranchId)
                            && (paymentType != null ? p.PaymentFor == paymentType : true)
                            select new
                            {
                                p.GroupLeader.Name,
                                p.PaymentFor,
                                p.Amount,
                                Mobile = p.HajjiID != null ? p.Hajji.ContactNo : null,
                                ContractAmount = p.HajjiID != null ? p.Hajji.ContractAmount : 0,
                                PaymentDate = p.PaymentDate.GetValueOrDefault().ToString("dd-MM-yyyy")
                            }).ToList();

                var jsonResult = Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            else
            {
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult PaymentCollectionList()
        {
            return View("PaymentCollectionListReport", "~/Views/Shared/_LayoutReportLandscape.cshtml");
        }

        public ActionResult GetAllSupplierLedger(int? supplierId, string supplierName, string fromDate, string toDate)
        {
            int suplierId = supplierId ?? 0;

            if (String.IsNullOrEmpty(fromDate) == true)
            {
                fromDate = null;
            }
            if (String.IsNullOrEmpty(toDate) == true)
            {
                toDate = null;
            }
            if (String.IsNullOrEmpty(supplierName) == true)
            {
                supplierName = null;
            }

            var logedInUserId = Convert.ToInt32(User.Identity.Name);
            var logedInCompanyId = _unitOfWork.UserRepository.GetById(logedInUserId).ActiveBranchId;

            if (suplierId != 0)
            {
                var umrahs = _unitOfWork.UmrahRepository.GetAll().ToList();
                var tickets = _unitOfWork.TicketRepository.GetAll().ToList();
                var others = _unitOfWork.OtherRepository.GetAll().ToList();
                var paymentSupCollections = _unitOfWork.SupplierPaymentRepository.GetAll().ToList();

                var paymentsData = (from p in paymentSupCollections
                            where p.SupplierId == suplierId
                            && (fromDate != null ? p.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                            && (toDate != null ? p.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                            && p.CompanyID == logedInCompanyId
                            select new SupplierLedgerViewModel
                            {
                                ID = p.Id,
                                Date = Convert.ToDateTime(p.PaymentDate).ToString("dd-MM-yyyy"),
                                PaymentFor = p.PaymentFor,
                                PayableAmount = 0,
                                PaidAmount = p.Amount ?? 0,
                                Status = 1
                            }).ToList();

                var umrahsData = (from u in umrahs
                                  where u.SupplierId == suplierId
                                  && (fromDate != null ? u.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                  && (toDate != null ? u.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                  && u.CompanyID == logedInCompanyId
                                  select new SupplierLedgerViewModel
                                  {
                                      ID = u.ID,
                                      Date = Convert.ToDateTime(u.AddedAt).ToString("dd-MM-yyyy"),
                                      PaymentFor = "Umrah",
                                      PayableAmount = u.PurchaseAmount ?? 0,
                                      PaidAmount = 0,
                                      Status = 2
                                  }).ToList();

                var ticketsData = (from t in tickets
                                   where t.SupplierID == suplierId
                                   && (fromDate != null ? t.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                   && (toDate != null ? t.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                   && t.CompanyID == logedInCompanyId
                                   select new SupplierLedgerViewModel
                                   {
                                       ID = t.ID,
                                       Date = Convert.ToDateTime(t.AddedAt).ToString("dd-MM-yyyy"),
                                       PaymentFor = "Ticket",
                                       PayableAmount = t.PurchaseRate ?? 0,
                                       PaidAmount = 0,
                                       Status = 2
                                   }).ToList();

                var othersData = (from o in others
                                  where o.SupplierID == suplierId
                                  && (fromDate != null ? o.AddedAt.GetValueOrDefault().Date >= DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                  && (toDate != null ? o.AddedAt.GetValueOrDefault().Date <= DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture) : true)
                                  && o.CompanyID == logedInCompanyId
                                  select new SupplierLedgerViewModel
                                  {
                                      ID = o.ID,
                                      Date = Convert.ToDateTime(o.AddedAt).ToString("dd-MM-yyyy"),
                                      PaymentFor = "Other",
                                      PayableAmount = o.PurchaseRate ?? 0,
                                      PaidAmount = 0,
                                      Status = 2
                                  }).ToList();

                var data = umrahsData.Union(ticketsData).Union(othersData).Union(paymentsData).OrderBy(x => x.Date).ThenBy(y => y.PaymentFor);
                var date = new { fromDate, toDate };
                return Json(new { Success = true, data, date, supplierName }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult SupplierLedgerList()
        {
            return View("SupplierLedgerListReport", "~/Views/Shared/_LayoutReportLandscape.cshtml");
        }
    }
}