using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DagorHajj.DAL;
using DagorHajj.Models;

namespace DagorHajj.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();
        //
        // GET: /Home/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult UpdateQuery()
        {
            try
            {
                /***************** 2018-05-18 ***************************/
                //UpdateTestInfoAccessoriesForUrineSection
                //var testGroupId = 12;       //Urine Examination
                //var testInfoes = _unitOfWork.DigTestInfoRepository.GetAll().Where(x => x.TestGroupId == testGroupId).ToList();
                //foreach (var testInfoe in testInfoes)
                //{
                //    var testAccessory = new DigTestInfoAccessory
                //    {
                //        TestId = testInfoe.Id,
                //        TestAccessoryId = 1116,
                //        Quantity = 1
                //    };
                //    _unitOfWork.DigTestInfoAccessoryRepository.Insert(testAccessory);
                //}
                //_unitOfWork.Save();
                /**************************************************************/

                ViewBag.Success = true;
                return View();
            }
            catch (Exception ex)
            {
                ViewBag.Success = false;
                ViewBag.ErrorMessage = ex.Message;
                return View();
            }
        }

        public JsonResult GetAllDashBoardInfo()
        {
            var logedInUserId = Convert.ToInt32(User.Identity.Name);
            var companyId = _unitOfWork.UserRepository.GetById(logedInUserId).ActiveBranchId;

            if(logedInUserId == 1)
            {
                DateTime currentDate = DateTime.Now;
                int year = currentDate.Year;

                var hajjs = _unitOfWork.HajjiRepository.GetAll().ToList();
                var umrah = _unitOfWork.UmrahRepository.GetAll().ToList();
                var tickets = _unitOfWork.TicketRepository.GetAll().ToList();

                var dFirstDayOfThisMonth = new DateTime(currentDate.Year, currentDate.Month, 1);
                var dMidDayOfThisMonth = dFirstDayOfThisMonth.AddDays(14);
                var dLastDayOfThisMonth = dFirstDayOfThisMonth.AddMonths(1).AddDays(-1);

                var dLastDayOfLastMonth = dFirstDayOfThisMonth.AddDays(-1);
                var dFirstDayOfLastMonth = dFirstDayOfThisMonth.AddMonths(-1);
                var dMidDayOfLastsMonth = dFirstDayOfLastMonth.AddDays(14);

                var curMont1stHalf = tickets.Where(x => x.AddedAt.GetValueOrDefault().Date >= dFirstDayOfThisMonth && x.AddedAt.GetValueOrDefault().Date <= dMidDayOfThisMonth).Select(y => y.PurchaseRate).Sum();
                var curMont2stHalf = tickets.Where(x => x.AddedAt.GetValueOrDefault().Date > dMidDayOfThisMonth && x.AddedAt.GetValueOrDefault().Date <= dLastDayOfThisMonth).Select(y => y.PurchaseRate).Sum();

                var lastMont1stHalf = tickets.Where(x => x.AddedAt.GetValueOrDefault().Date >= dFirstDayOfLastMonth && x.AddedAt.GetValueOrDefault().Date <= dMidDayOfLastsMonth).Select(y => y.PurchaseRate).Sum();
                var lastMont2stHalf = tickets.Where(x => x.AddedAt.GetValueOrDefault().Date > dMidDayOfLastsMonth && x.AddedAt.GetValueOrDefault().Date <= dLastDayOfLastMonth).Select(y => y.PurchaseRate).Sum();

                var totalPilgrimsHajj = hajjs.Count;
                var lastYearHpilgrm = hajjs.Where(x => x.PerformingHajj == (year - 1)).Count();
                var curentYearHpilgrm = hajjs.Where(x => x.PerformingHajj == year).Count();
                var nextYearHpilgrm = hajjs.Where(x => x.PerformingHajj == (year + 1)).Count();

                var totalPilgrimsUmrah = umrah.Count;
                var lastYearUpilgrm = umrah.Where(x => x.AddedAt.GetValueOrDefault().Year == (year - 1)).Count();
                var curentYearUpilgrm = umrah.Where(x => x.AddedAt.GetValueOrDefault().Year == year).Count();

                var preRegisteredHajj = hajjs.Where(x => x.Status == 2).Count();
                var registeredHajj = hajjs.Where(x => x.Status == 3).Count();

                var sendToMofaUmr = umrah.Where(x => x.Status == 1).Count();
                var mofaApprovUmr = umrah.Where(x => x.Status == 2).Count();
                var visaPrintUmr = umrah.Where(x => x.Status == 3).Count();
                var insideKsaUmr = umrah.Where(x => x.Status == 4).Count();
                var outsideKsaUmr = umrah.Where(x => x.Status == 5).Count();
                var visaCancelUmr = umrah.Where(x => x.Status == 6).Count();

                return Json(new
                {
                    totalPilgrimsHajj,
                    lastYearHpilgrm,
                    curentYearHpilgrm,
                    nextYearHpilgrm,
                    totalPilgrimsUmrah,
                    lastYearUpilgrm,
                    curentYearUpilgrm,
                    preRegisteredHajj,
                    registeredHajj,
                    sendToMofaUmr,
                    mofaApprovUmr,
                    visaPrintUmr,
                    insideKsaUmr,
                    outsideKsaUmr,
                    visaCancelUmr,
                    curMont1stHalf,
                    curMont2stHalf,
                    lastMont1stHalf,
                    lastMont2stHalf
                }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                DateTime currentDate = DateTime.Now;
                int year = currentDate.Year;

                var hajjs = _unitOfWork.HajjiRepository.GetAll().Where(x=>x.CompanyID == companyId).ToList();
                var umrah = _unitOfWork.UmrahRepository.GetAll().Where(x => x.CompanyID == companyId).ToList();
                var tickets = _unitOfWork.TicketRepository.GetAll().Where(x => x.CompanyID == companyId).ToList();

                var dFirstDayOfThisMonth = new DateTime(currentDate.Year, currentDate.Month, 1);
                var dMidDayOfThisMonth = dFirstDayOfThisMonth.AddDays(14);
                var dLastDayOfThisMonth = dFirstDayOfThisMonth.AddMonths(1).AddDays(-1);

                var dLastDayOfLastMonth = dFirstDayOfThisMonth.AddDays(-1);
                var dFirstDayOfLastMonth = dFirstDayOfThisMonth.AddMonths(-1);
                var dMidDayOfLastsMonth = dFirstDayOfLastMonth.AddDays(14);

                var curMont1stHalf = tickets.Where(x => x.AddedAt.GetValueOrDefault().Date >= dFirstDayOfThisMonth && x.AddedAt.GetValueOrDefault().Date <= dMidDayOfThisMonth).Select(y => y.PurchaseRate).Sum();
                var curMont2stHalf = tickets.Where(x => x.AddedAt.GetValueOrDefault().Date > dMidDayOfThisMonth && x.AddedAt.GetValueOrDefault().Date <= dLastDayOfThisMonth).Select(y => y.PurchaseRate).Sum();

                var lastMont1stHalf = tickets.Where(x => x.AddedAt.GetValueOrDefault().Date >= dFirstDayOfLastMonth && x.AddedAt.GetValueOrDefault().Date <= dMidDayOfLastsMonth).Select(y => y.PurchaseRate).Sum();
                var lastMont2stHalf = tickets.Where(x => x.AddedAt.GetValueOrDefault().Date > dMidDayOfLastsMonth && x.AddedAt.GetValueOrDefault().Date <= dLastDayOfLastMonth).Select(y => y.PurchaseRate).Sum();

                var totalPilgrimsHajj = hajjs.Count;
                var lastYearHpilgrm = hajjs.Where(x => x.PerformingHajj == (year - 1)).Count();
                var curentYearHpilgrm = hajjs.Where(x => x.PerformingHajj == year).Count();
                var nextYearHpilgrm = hajjs.Where(x => x.PerformingHajj == (year + 1)).Count();

                var totalPilgrimsUmrah = umrah.Count;
                var lastYearUpilgrm = umrah.Where(x => x.AddedAt.GetValueOrDefault().Year == (year - 1)).Count();
                var curentYearUpilgrm = umrah.Where(x => x.AddedAt.GetValueOrDefault().Year == year).Count();

                var preRegisteredHajj = hajjs.Where(x => x.Status == 2).Count();
                var registeredHajj = hajjs.Where(x => x.Status == 3).Count();

                var sendToMofaUmr = umrah.Where(x => x.Status == 1).Count();
                var mofaApprovUmr = umrah.Where(x => x.Status == 2).Count();
                var visaPrintUmr = umrah.Where(x => x.Status == 3).Count();
                var insideKsaUmr = umrah.Where(x => x.Status == 4).Count();
                var outsideKsaUmr = umrah.Where(x => x.Status == 5).Count();
                var visaCancelUmr = umrah.Where(x => x.Status == 6).Count();

                return Json(new
                {
                    totalPilgrimsHajj,
                    lastYearHpilgrm,
                    curentYearHpilgrm,
                    nextYearHpilgrm,
                    totalPilgrimsUmrah,
                    lastYearUpilgrm,
                    curentYearUpilgrm,
                    preRegisteredHajj,
                    registeredHajj,
                    sendToMofaUmr,
                    mofaApprovUmr,
                    visaPrintUmr,
                    insideKsaUmr,
                    outsideKsaUmr,
                    visaCancelUmr,
                    curMont1stHalf,
                    curMont2stHalf,
                    lastMont1stHalf,
                    lastMont2stHalf
                }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}