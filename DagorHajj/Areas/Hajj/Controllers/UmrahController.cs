using DagorHajj.DAL;
using DagorHajj.Models;
using DagorHajj.Utility;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DagorHajj.Areas.Hajj.Controllers
{
    [SafelyAuthorize]
    public class UmrahController : Controller
    {
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();

        // GET: Hajj/Umrah
        public ActionResult Index()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            ViewBag.UserRloe = user.Role.Name;
            return View();
        }

        public ActionResult Create()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));

            var companyName = _unitOfWork.CompanyProfileRepository.GetAll().Where(e => e.ID == user.ActiveBranchId).FirstOrDefault().ConpanyName;

            var noOfUmrah = _unitOfWork.UmrahRepository.GetAll().Where(e => e.CompanyID == user.ActiveBranchId).Count() + 1;
            
            if (noOfUmrah < 9)
            {
                ViewBag.count = companyName + " 0" + noOfUmrah;
            }
            else
            {
                ViewBag.count = companyName + " " + noOfUmrah.ToString();
            }
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
        public ActionResult GetAllSupplier()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            var groupLeaderList = _unitOfWork.SupplierRepository.GetAll();
            var data = (from a in groupLeaderList
                        where (user.ActiveBranchId == a.CompanyId)
                        select new
                        {
                            a.Id,
                            a.SupplierName,
                        }).OrderByDescending(a => a.Id).ToList();

            return Json(data, JsonRequestBehavior.AllowGet); ;
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
        public ActionResult GetAllMuharramRelation()
        {
            var muharramRelationList = _unitOfWork.MuharramRepository.GetAll();
            var data = (from a in muharramRelationList
                        select new
                        {
                            a.ID,
                            a.RelationType,
                        }).ToList();

            return Json(data, JsonRequestBehavior.AllowGet); ;
        }
        public ActionResult GetAllUmrahStatus()
        {
            var umrahStatusList = _unitOfWork.UmrahStatusRepository.GetAll();
            var data = (from umrahStatus in umrahStatusList
                        select new
                        {
                            umrahStatus.ID,
                            umrahStatus.Title,

                        }).ToList();

            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllUmrah()
        {
            var userId = Convert.ToInt32(User.Identity.Name);
            var user = _unitOfWork.UserRepository.GetById(userId);
            var UmrahList = _unitOfWork.UmrahRepository.GetAll();

            if (user.Role.Name == "Super Admin")
            {
                var umrahs = (from a in UmrahList
                            select new
                            {
                                a.ID,
                                a.UmrahID,
                                FullName = a.InitialName + " " + a.FirstName + " " + a.LastName,
                                a.ContactNo,
                                a.District,
                                GroupLeaderName = a.GroupLeaderID != null ? a.GroupLeader.Name : "",
                                a.ImageAttach,
                                a.DepartureDate,
                                Title = a.Status != null ? a.UmrahStatu.Title : ""
                            }).OrderByDescending(a => a.ID).ToList(); ;

                var data = from umrah in umrahs
                           select new
                           {
                               umrah.ID,
                               umrah.UmrahID,
                               umrah.FullName,
                               umrah.ContactNo,
                               umrah.District,
                               umrah.GroupLeaderName,
                               umrah.ImageAttach,
                               DepartureDate = umrah.DepartureDate == null ? "" : umrah.DepartureDate.Value.ToString(GlobalVariables.DateFormat),
                               umrah.Title,
                           };
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var umrahs = (from a in UmrahList
                            where (a.CompanyID == user.ActiveBranchId)
                            select new
                            {
                                a.ID,
                                a.UmrahID,
                                FullName = a.InitialName + " " + a.FirstName + " " + a.LastName,
                                a.ContactNo,
                                a.District,
                                GroupLeaderName = a.GroupLeaderID != null ? a.GroupLeader.Name : "",
                                a.ImageAttach,
                                a.DepartureDate,
                                Title = a.Status != null ? a.UmrahStatu.Title : ""

                            }).OrderByDescending(a => a.ID).ToList(); ;

                var data = from umrah in umrahs
                           select new
                           {
                               umrah.ID,
                               umrah.UmrahID,
                               umrah.FullName,
                               umrah.ContactNo,
                               umrah.District,
                               umrah.GroupLeaderName,
                               umrah.ImageAttach,
                               DepartureDate = umrah.DepartureDate == null ? "" : umrah.DepartureDate.Value.ToString(GlobalVariables.DateFormat),
                               umrah.Title,
                           };

                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult SaveUmrahData(Umrah model)
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

                    if (Request.Files != null)
                    {
                        var year = DateTime.Now.Year;

                        if (model.PassportAttach != null && model.PassportAttach != "")
                        {
                            model.PassportAttach = year + "/" + model.PassportAttach;
                        }

                        if (model.ImageAttach != null && model.ImageAttach != "")
                        {
                            model.ImageAttach = year + "/" + model.ImageAttach;
                        }
                        if (model.NIDAttach != null && model.NIDAttach != "")
                        {
                            model.NIDAttach = year + "/" + model.NIDAttach;

                        }
                        foreach (string key in Request.Files)
                        {
                            var postedFile = Request.Files[key];
                            System.IO.Directory.CreateDirectory(Server.MapPath("~/UploadedFiles" + "\\" + year));
                            postedFile.SaveAs(Path.Combine(Server.MapPath("~/UploadedFiles"), year + "/" + postedFile.FileName));
                        }
                    }

                    _unitOfWork.UmrahRepository.Insert(model);
                    _unitOfWork.Save();
                    return Json(new
                    {
                        model = model,
                        Id = model.ID,
                        Success = true,
                        Msg = GlobalVariables.SuccessfulSavedMessage
                    }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    if (model.ID > 0)
                    {
                        var aUmrah = _unitOfWork.UmrahRepository.GetById(model.ID);

                        if (aUmrah.CompanyID == user.ActiveBranchId)
                        {
                            aUmrah.GroupLeaderID = model.GroupLeaderID;
                            aUmrah.InitialName = model.InitialName;
                            aUmrah.FirstName = model.FirstName;
                            aUmrah.MiddleName = model.MiddleName;
                            aUmrah.LastName = model.LastName;
                            aUmrah.DoB = model.DoB;
                            aUmrah.PlaceOfBirth = model.PlaceOfBirth;
                            aUmrah.FatherName = model.FatherName;
                            aUmrah.MotherName = model.MotherName;
                            aUmrah.ContactNo = model.ContactNo;
                            aUmrah.NID = model.NID;
                            aUmrah.SpouseName = model.SpouseName;
                            aUmrah.SpouseContactNo = model.SpouseContactNo;
                            aUmrah.MuharramName = model.MuharramName;
                            aUmrah.MuharramRelationID = model.MuharramRelationID;

                            aUmrah.District = model.District;
                            aUmrah.Thana = model.Thana;
                            aUmrah.PostOffice = model.PostOffice;
                            aUmrah.PostCode = model.PostCode;
                            aUmrah.PresentAddress = model.PresentAddress;
                                                        
                            aUmrah.PermanentDistrict = model.PermanentDistrict;
                            aUmrah.PermanentThana = model.PermanentThana;
                            aUmrah.PermanentPostCode = model.PermanentPostCode;
                            aUmrah.PermanentPostOffice = model.PermanentPostOffice;
                            aUmrah.PermanentAddress = model.PermanentAddress;

                            aUmrah.FlightArrivalDate = model.FlightArrivalDate;
                            aUmrah.DepartureDate = model.DepartureDate;
                            aUmrah.PassportNo = model.PassportNo;
                            aUmrah.PassportExpiryDate = model.PassportExpiryDate;
                            aUmrah.PassportIssueDate = model.PassportIssueDate;
                            aUmrah.PlaceOfPassportIssue = model.PlaceOfPassportIssue;
                            aUmrah.LastUmrahYear = model.LastUmrahYear;
                            aUmrah.ContractAmount = model.ContractAmount;
                            aUmrah.Status = model.Status;
                            aUmrah.ModifiedBy = Convert.ToInt32(User.Identity.Name);
                            aUmrah.ModifiedAt = DateTime.Now;
                            aUmrah.SupplierId = model.SupplierId;
                            aUmrah.PurchaseAmount = model.PurchaseAmount;

                            if (Request.Files != null)
                            {
                                var year = DateTime.Now.Year;
                                var passportInfo = new string[] { };
                                var imageInfo = new string[] { };
                                var nidinfo = new string[] { };
                                var passTemp = "";
                                var imgTemp = "";
                                var nidTemp = "";

                                if (aUmrah.PassportAttach != null)
                                {
                                    passportInfo = aUmrah.PassportAttach.Split('/');

                                }
                                if (aUmrah.ImageAttach != null)
                                {
                                    imageInfo = aUmrah.ImageAttach.Split('/');
                                }
                                if (aUmrah.NIDAttach != null)
                                {
                                    nidinfo = aUmrah.NIDAttach.Split('/');

                                }
                                var passFileName = passportInfo.FirstOrDefault() + "/" + model.PassportAttach;
                                var imgFileName = imageInfo.FirstOrDefault() + "/" + model.ImageAttach;
                                var nidFileName = nidinfo.FirstOrDefault() + "/" + model.NIDAttach;
                                var passPath = "~/UploadedFiles/" + aUmrah.PassportAttach;
                                var imagePath = "~/UploadedFiles/" + aUmrah.ImageAttach;
                                var nidPath = "~/UploadedFiles/" + aUmrah.NIDAttach;


                                if (aUmrah.PassportAttach != null && aUmrah.PassportAttach != passFileName)
                                {
                                    System.IO.File.Delete(Server.MapPath(passPath));
                                    passTemp = passportInfo.LastOrDefault();

                                }
                                if (model.PassportAttach != null)
                                {
                                    aUmrah.PassportAttach = year + "/" + model.PassportAttach;
                                }
                                if (aUmrah.ImageAttach != null && aUmrah.ImageAttach != imgFileName)
                                {
                                    System.IO.File.Delete(Server.MapPath(imagePath));
                                    imgTemp = imageInfo.LastOrDefault();
                                }
                                if (model.ImageAttach != null)
                                {
                                    aUmrah.ImageAttach = year + "/" + model.ImageAttach;
                                }
                                if (aUmrah.NIDAttach != null && aUmrah.NIDAttach != nidFileName)
                                {
                                    System.IO.File.Delete(Server.MapPath(nidPath));
                                    nidTemp = nidinfo.LastOrDefault();
                                }
                                if (model.NIDAttach != null)
                                {
                                    aUmrah.NIDAttach = year + "/" + model.NIDAttach;
                                }

                                foreach (string key in Request.Files)
                                {
                                    var postedFile = Request.Files[key];
                                    var fileName = postedFile.FileName;
                                    if (fileName != passTemp && fileName != imgTemp && fileName != nidTemp)
                                    {
                                        System.IO.Directory.CreateDirectory(Server.MapPath("~/UploadedFiles" + "\\" + year));
                                        postedFile.SaveAs(Path.Combine(Server.MapPath("~/UploadedFiles"), year + "/" + postedFile.FileName));
                                    }
                                }
                            }
                            var data = new
                            {
                                aUmrah.PassportAttach,
                                aUmrah.NIDAttach,
                                aUmrah.ImageAttach
                            };
                            _unitOfWork.UmrahRepository.Update(aUmrah);
                            _unitOfWork.Save();
                            return Json(new
                            {
                                model = data,
                                Success = true,
                                Msg = GlobalVariables.UpdateMessage,
                                Id = model.ID
                            }, JsonRequestBehavior.AllowGet);
                        }
                    }
                    return Json(new { Success = false, Id = model.ID, Msg = GlobalVariables.FailureMessage }, JsonRequestBehavior.AllowGet);
                }
            }
            catch
            {
                return Json(new { Success = false, Id = model.ID, GlobalVariables.FailureMessage }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetUmrahById(int id)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            var aUmrah = _unitOfWork.UmrahRepository.GetById(id);

            if (user.ActiveBranchId == aUmrah.CompanyID)
            {
                var data = new
                {
                    aUmrah.ID,
                    aUmrah.UmrahID,
                    aUmrah.GroupLeaderID,
                    GroupLeader = aUmrah.GroupLeaderID != null ? _unitOfWork.GroupLeaderRepository.GetById(Convert.ToInt32(aUmrah.GroupLeaderID)).Name : "",
                    InitialName = aUmrah.InitialName == null ? "" : aUmrah.InitialName,
                    aUmrah.FirstName,
                    aUmrah.MiddleName,
                    aUmrah.LastName,
                    aUmrah.DoB,
                    aUmrah.PlaceOfBirth,
                    aUmrah.FatherName,
                    aUmrah.MotherName,
                    aUmrah.ContactNo,
                    aUmrah.NID,
                    aUmrah.SpouseName,
                    aUmrah.SpouseContactNo,
                    aUmrah.MuharramName,
                    aUmrah.District,
                    aUmrah.Thana,
                    aUmrah.PostOffice,
                    aUmrah.PostCode,
                    aUmrah.PresentAddress,
                    aUmrah.PermanentDistrict,
                    aUmrah.PermanentThana,
                    aUmrah.PermanentPostOffice,
                    aUmrah.PermanentPostCode,
                    aUmrah.PermanentAddress,
                    aUmrah.DepartureDate,
                    aUmrah.FlightArrivalDate,
                    RelationWithMaharram = aUmrah.MuharramRelationID != null ? _unitOfWork.MuharramRepository.GetById(Convert.ToInt32(aUmrah.MuharramRelationID)).RelationType : "",
                    aUmrah.MuharramRelationID,                    
                    aUmrah.PassportNo,
                    aUmrah.PassportExpiryDate,
                    aUmrah.PassportIssueDate,
                    aUmrah.PlaceOfPassportIssue,
                    aUmrah.LastUmrahYear,
                    aUmrah.SupplierId,
                    aUmrah.PurchaseAmount,
                    aUmrah.PassportAttach,
                    aUmrah.NIDAttach,
                    aUmrah.ImageAttach,
                    aUmrah.ContractAmount,
                    StatusTittle = aUmrah.Status != null ? _unitOfWork.UmrahStatusRepository.GetById(Convert.ToInt32(aUmrah.Status)).Title : "",
                    aUmrah.Status,

                };

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = false, errorCode = 1001, errorMessage = "You have not permission to view this Company Profile." }, JsonRequestBehavior.AllowGet);
        }

    }
}