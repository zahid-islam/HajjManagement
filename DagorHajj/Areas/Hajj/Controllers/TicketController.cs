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
    public class TicketController : Controller
    {
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();

        // GET: Hajj/Ticket
        public ActionResult Index()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            ViewBag.UserRloe = user.Role.Name;
            return View();
        }
        public ActionResult Edit(int id)
        {
            return View();
        }
        public ActionResult Report()
        {
            return View("Report");
        }

        public JsonResult GetTicketByIdReport(int id)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));

            var ticket = _unitOfWork.TicketRepository.GetById(id);
            if (ticket.CompanyID == user.ActiveBranchId)
            {
                var data = new
                {
                    ticket.ID,
                    GroupLeaderName = ticket.GroupLeader.Name,
                    InvoiceDate = Convert.ToDateTime(ticket.IssueDate).ToString("dd-MM-yyyy"),
                    PassengerName = ticket.InitialName + " " + ticket.FirstName + " " + ticket.MiddleName + " " + ticket.LastName,
                    IssueDate = Convert.ToDateTime(ticket.IssueDate).ToString("dd-MM-yyyy"),
                    FlightDate = Convert.ToDateTime(ticket.FlightDate).ToString("dd-MM-yyyy"),
                    //ticket.Sector,
                    ticket.FirstName,
                    ticket.MiddleName,
                    ticket.LastName,
                    ticket.InitialName,
                    ticket.TicketNo,
                    ticket.FlightNo,
                    ticket.SellTo,
                    //ticket.BillToPersonAddress,
                    //ticket.PhoneNo,
                    ticket.PurchaseRate,
                    ticket.SellingRate,
                    ticket.PaidAmount,
                    DueAmount = ticket.SellingRate - ticket.PaidAmount
                };
                return Json(new { Success = true, data }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
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
        public ActionResult SaveTicket(Ticket model)
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
                    _unitOfWork.TicketRepository.Insert(model);
                    _unitOfWork.Save();

                    var ticketSectors = model.TicketSectors.ToList();

                    var data = (from ticketSector in ticketSectors
                                select new
                                {
                                    ticketSector.ID,
                                    ticketSector.Sector,
                                    ticketSector.Date
                                }).ToList();

                    return Json(new { Success = true, model = data, Id = model.ID, Msg = GlobalVariables.SuccessfulSavedMessage },
                        JsonRequestBehavior.AllowGet);
                }
                else
                {
                    if (model.ID > 0)
                    {
                        var ticket = _unitOfWork.TicketRepository.GetById(model.ID);
                        if (ticket.CompanyID == user.ActiveBranchId)
                        {
                            ticket.GroupLeaderID = model.GroupLeaderID;
                            ticket.InitialName = model.InitialName;
                            ticket.FirstName = model.FirstName;
                            ticket.MiddleName = model.MiddleName;
                            ticket.LastName = model.LastName;
                            ticket.FlightNo = model.FlightNo;
                            ticket.IssueDate = model.IssueDate;
                            ticket.FlightDate = model.FlightDate;
                            ticket.TicketNo = model.TicketNo;
                            ticket.Carier = model.Carier;
                            ticket.DoB = model.DoB;
                            ticket.SupplierID = model.SupplierID;
                            ticket.PaidAmount = model.PaidAmount;
                            ticket.SellTo = model.SellTo;
                            ticket.AirlinesPNR = model.AirlinesPNR;
                            ticket.GdsPNR = model.GdsPNR;
                            ticket.PurchaseRate = model.PurchaseRate;
                            ticket.SellingRate = model.SellingRate;
                            ticket.PassportNo = model.PassportNo;
                            ticket.DateOfExpiry = model.DateOfExpiry;
                            foreach (var ticketSector in model.TicketSectors)
                            {
                                if (ticketSector.ID == 0)
                                {
                                    ticketSector.TicketID = ticket.ID;
                                    _unitOfWork.TicketSectorRepository.Insert(ticketSector);
                                }
                                else
                                {
                                    if (ticketSector.ID > 0)
                                    {
                                        var sector = _unitOfWork.TicketSectorRepository.GetById(Convert.ToInt32(ticketSector.ID));
                                        sector.Sector = ticketSector.Sector;
                                        sector.Date = ticketSector.Date;
                                        _unitOfWork.TicketSectorRepository.Update(sector);
                                    }
                                }
                            }
                            _unitOfWork.TicketRepository.Update(ticket);
                            _unitOfWork.Save();

                            var ticketSectors = model.TicketSectors.ToList();

                            var data = (from ticketSector in ticketSectors
                                        select new
                                        {
                                            ticketSector.ID,
                                            ticketSector.Sector,
                                            ticketSector.Date
                                        }).ToList();

                            return Json(new { Success = true, model = data, Id = model.ID, Msg = GlobalVariables.UpdateMessage },
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
        public ActionResult GetTicketById(int id)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));

            var ticket = _unitOfWork.TicketRepository.GetById(id);
            if (user.ActiveBranchId == ticket.CompanyID)
            {
                var data = new
                {
                    ticket.ID,
                    ticket.GroupLeaderID,
                    GroupLeader = ticket.GroupLeaderID != 0 ? _unitOfWork.GroupLeaderRepository.GetById(ticket.GroupLeaderID).Name : "",
                    InitialName = ticket.InitialName == null ? "" : ticket.InitialName,
                    ticket.FirstName,
                    ticket.MiddleName,
                    ticket.LastName,
                    ticket.FlightNo,
                    ticket.IssueDate,
                    ticket.FlightDate,
                    ticket.TicketNo,
                    ticket.Carier,
                    ticket.DoB,
                    ticket.SupplierID,
                    ticket.SellTo,
                    ticket.PaidAmount,
                    PurchaseFrom = ticket.SupplierID != null ? ticket.Supplier.SupplierName : "",
                    ticket.AirlinesPNR,
                    ticket.GdsPNR,
                    ticket.PurchaseRate,
                    ticket.SellingRate,
                    ticket.PassportNo,
                    ticket.DateOfExpiry,
                    TicketSectors = ticket.TicketSectors.Select(e => new { e.Sector, e.Date, e.ID })
                };

                return Json(data, JsonRequestBehavior.AllowGet);
            }

            return Json(new { success = false, errorCode = 1001, errorMessage = "You have not permission to view this Company Profile." }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllTicket()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));

            var GroupLeaders = _unitOfWork.GroupLeaderRepository.GetAll();

            if (user.Role.Name == "Super Admin")
            {
                var Tickets = _unitOfWork.TicketRepository.GetAll();

                var ticketList = (from ticket in Tickets
                            select new
                            {
                                ticket.ID,
                                Sectors = ticket.TicketSectors.Select(x=>x.Sector),
                                ticket.Carier,
                                ticket.IssueDate,
                                ticket.FlightDate,
                                ticket.Supplier.SupplierName,
                                GroupLeaderName = ticket.GroupLeaderID != 0 ? ticket.GroupLeader.Name : "",
                                FullName = ticket.InitialName + " " + ticket.FirstName + " " + ticket.MiddleName + " " + ticket.LastName,
                                ticket.TicketNo
                            }).OrderByDescending(ticket => ticket.ID).ToList();
                var data = (from ticket in ticketList
                           select new
                           {
                               ticket.ID,
                               ticket.FullName,
                               ticket.Carier,
                               Sectors = ticket.Sectors.Count() == 0 ? "" : ticket.Sectors.Aggregate((current, next) => current + ", " + next),
                               IssueDate = ticket.IssueDate == null ? "" : ticket.IssueDate.Value.ToString(Utility.GlobalVariables.DateFormat),
                               FlightDate = ticket.FlightDate == null ? "" : ticket.FlightDate.Value.ToString(Utility.GlobalVariables.DateFormat),
                               ticket.TicketNo,
                               ticket.SupplierName,
                               ticket.GroupLeaderName
                           }).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var Tickets = _unitOfWork.TicketRepository.GetAll()
                   .Where(ticket => ticket.CompanyID == user.ActiveBranchId);

                var ticketList = (from ticket in Tickets
                            select new
                            {
                                ticket.ID,
                                Sectors = ticket.TicketSectors.Select(x => x.Sector),
                                ticket.Carier,
                                ticket.IssueDate,
                                ticket.FlightDate,
                                ticket.Supplier.SupplierName,
                                GroupLeaderName = ticket.GroupLeaderID != 0 ? ticket.GroupLeader.Name : "",
                                FullName = ticket.InitialName + " " + ticket.FirstName + " " + ticket.MiddleName + " " + ticket.LastName,
                                ticket.TicketNo
                            }).OrderByDescending(ticket => ticket.ID).ToList();

                var data = (from ticket in ticketList
                           select new
                           {
                               ticket.ID,
                               ticket.FullName,
                               ticket.Carier,
                               Sectors = ticket.Sectors.Count() == 0 ? "" : ticket.Sectors.Aggregate((current, next) => current + ", " + next),
                               IssueDate = ticket.IssueDate == null ? "" : ticket.IssueDate.Value.ToString(Utility.GlobalVariables.DateFormat),
                               FlightDate = ticket.FlightDate == null ? "" : ticket.FlightDate.Value.ToString(Utility.GlobalVariables.DateFormat),
                               ticket.TicketNo,
                               ticket.SupplierName,
                               ticket.GroupLeaderName
                           }).ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }
    }
}