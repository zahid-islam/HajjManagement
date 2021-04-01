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
    public class BookingController : Controller
    {
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();
        // GET: Hajj/Booking
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
        public ActionResult GetBookingReceptById(int? id)
        {
            var booking = _unitOfWork.BookingRepository.GetById(Convert.ToInt32(id));
            var bookingData = _unitOfWork.BookingRepository.GetAll();
            var groupLeaderData = _unitOfWork.GroupLeaderRepository.GetAll();
            var companyProfiles = _unitOfWork.CompanyProfileRepository.GetAll();

            if (booking.PaymentFor == "Hajji" && booking.HajjiID != null)
            {
                var hajjiData = _unitOfWork.HajjiRepository.GetAll();

                var bookingreceipt = (from BookingData in bookingData
                                      join HajjiData in hajjiData on BookingData.HajjiID equals HajjiData.ID
                                      join GroupLeader in groupLeaderData on BookingData.GroupLeaderID equals GroupLeader.ID
                                      join companyProfile in companyProfiles on BookingData.CompanyID equals companyProfile.ID
                                      where BookingData.ID == id
                                      select new
                                      {
                                          Date = BookingData.BookingDate,
                                          GroupLeaderName = GroupLeader.Name,
                                          AccountName = HajjiData.InitialName + " " + HajjiData.FirstName + " " + HajjiData.MiddleName + " " + HajjiData.LastName,
                                          Amount = BookingData.PaidAmount,
                                          MrNo = BookingData.ID,
                                          companyProfile.ImageAttach

                                      }).FirstOrDefault();

                return Json(bookingreceipt, JsonRequestBehavior.AllowGet);

            }
            else if (booking.PaymentFor == "Umrah" && booking.UmrahID != null)
            {
                var umrahData = _unitOfWork.UmrahRepository.GetAll();

                var bookingreceipt = (from BookingData in bookingData
                                      join UmrahData in umrahData on BookingData.UmrahID equals UmrahData.ID
                                      join GroupLeader in groupLeaderData on BookingData.GroupLeaderID equals GroupLeader.ID
                                      join companyProfile in companyProfiles on BookingData.CompanyID equals companyProfile.ID
                                      where BookingData.ID == id
                                      select new
                                      {
                                          Date = BookingData.BookingDate,
                                          GroupLeaderName = GroupLeader.Name,
                                          AccountName = UmrahData.InitialName + " " + UmrahData.FirstName + " " + UmrahData.MiddleName + " " + UmrahData.LastName,
                                          Amount = BookingData.PaidAmount,
                                          MrNo = BookingData.ID,
                                          companyProfile.ImageAttach
                                      }).FirstOrDefault();

                return Json(bookingreceipt, JsonRequestBehavior.AllowGet);
            }

            return Json(null, JsonRequestBehavior.AllowGet);
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
        public ActionResult SaveBooking(Booking model)
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
                    model.AddedBy = userId;
                    model.AddedAt = DateTime.Now;
                    model.CompanyID = user.ActiveBranchId;

                    _unitOfWork.BookingRepository.Insert(model);
                    _unitOfWork.Save();

                    return Json(new { Success = true, Id = model.ID, Msg = GlobalVariables.SuccessfulSavedMessage },
                        JsonRequestBehavior.AllowGet);
                }
                else
                {
                    if (model.ID > 0)
                    {
                        var aBooking = _unitOfWork.BookingRepository.GetById(model.ID);

                        if (user.ActiveBranchId == aBooking.CompanyID)
                        {
                            aBooking.ModifiedBy = userId;
                            aBooking.ModifiedAt = DateTime.Now;
                            aBooking.GroupLeaderID = model.GroupLeaderID;
                            aBooking.HajjYear = model.HajjYear;
                            aBooking.HajjiID = model.HajjiID;
                            aBooking.UmrahID = model.ID;
                            aBooking.BookingDate = model.BookingDate;
                            aBooking.PaymentType = model.PaymentType;
                            aBooking.ChequeNo = model.ChequeNo;
                            aBooking.ChequeDate = model.ChequeDate;
                            aBooking.BankName = model.BankName;
                            aBooking.Branch = model.Branch;
                            aBooking.PaidAmount = model.PaidAmount;
                            aBooking.PaymentFor = model.PaymentFor;

                            _unitOfWork.BookingRepository.Update(aBooking);
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
        public ActionResult GetAllBooking()
        {
            var userId = Convert.ToInt32(User.Identity.Name);
            var user = _unitOfWork.UserRepository.GetById(userId);
            var booking = _unitOfWork.BookingRepository.GetAll();

            if (user.Role.Name == "Super Admin")
            {
                var data = (from a in booking
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
                var data = (from a in booking
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
        public ActionResult GetBookingById(int id)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            var aBooking = _unitOfWork.BookingRepository.GetById(id);

            if (user.ActiveBranchId == aBooking.CompanyID)
            {
                var data = new
                {
                    aBooking.ID,
                    GroupLeader = aBooking.GroupLeader.Name,
                    aBooking.HajjYear,
                    HajjiReference = aBooking.PaymentFor == "Hajji" ? aBooking.Hajji.HajjID + " - " + aBooking.Hajji.FirstName : aBooking.Umrah.UmrahID + " - " + aBooking.Umrah.FirstName,
                    aBooking.HajjiID,
                    aBooking.UmrahID,
                    aBooking.BookingDate,
                    PaymentType = aBooking.PaymentType != null ? aBooking.PaymentType : "",
                    aBooking.PaidAmount,
                    aBooking.GroupLeaderID,
                    aBooking.ChequeNo,
                    aBooking.ChequeDate,
                    aBooking.BankName,
                    aBooking.Branch,
                    PaymentFor = aBooking.PaymentFor != null ? aBooking.PaymentFor : "",
                };

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = false, errorCode = 1001, errorMessage = "You have not permission to view this Company Profile." }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllHajji(int? Id, string PaymentFor)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));


            var hajjiBooking = _unitOfWork.BookingRepository.GetAll();

            if (PaymentFor == "Hajji" && Id != null)
            {
                var hajjiList = _unitOfWork.HajjiRepository.GetAll();

                var data = (from a in hajjiList
                            join b in hajjiBooking on a.ID equals b.HajjiID
                            into h
                            where !h.Any() && user.ActiveBranchId == a.CompanyID && a.GroupLeaderID == Id
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
                            join b in hajjiBooking on a.ID equals b.UmrahID
                            into h
                            where !h.Any() && user.ActiveBranchId == a.CompanyID && a.GroupLeaderID == Id
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
        public ActionResult GetHajjiContractAmount(int? HajjiID, int? UmrahID)
        {

            var hajjiData = _unitOfWork.HajjiRepository.GetAll();
            var umrahData = _unitOfWork.UmrahRepository.GetAll();
            if (HajjiID != null)
            {
                var data = (from a in hajjiData
                            where (a.ID == HajjiID)
                            select new
                            {
                                a.ContractAmount
                            }).FirstOrDefault();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var data = (from a in umrahData
                            where (a.ID == UmrahID)
                            select new
                            {
                                a.ContractAmount
                            }).FirstOrDefault();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

    }
}