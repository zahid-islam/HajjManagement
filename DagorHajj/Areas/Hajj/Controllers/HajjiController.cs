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
    public class HajjiController : Controller
    {
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();

        // GET: Hajj/Hajji
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

            var noOfHajji = _unitOfWork.HajjiRepository.GetAll().Where(e => e.CompanyID == user.ActiveBranchId).Count() + 1;



            if (noOfHajji < 9)
            {
                ViewBag.count = companyName + " 0" + noOfHajji;
            }
            else
            {
                ViewBag.count = companyName + " " + noOfHajji.ToString();
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
        public ActionResult GetAllHajji()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            var hajjiList = _unitOfWork.HajjiRepository.GetAll();

            if (user.Role.Name == "Super Admin")
            {
                var data = (from hajji in hajjiList
                            select new
                            {
                                hajji.ID,
                                hajji.HajjID,
                                FullName = hajji.InitialName + " " + hajji.FirstName + " " + hajji.LastName,
                                hajji.ContactNo,
                                hajji.District,
                                hajji.PerformingHajj,
                                GroupLeaderName = hajji.GroupLeaderID != null ? hajji.GroupLeader.Name : "",
                                hajji.ImageAttach,
                                Title = hajji.Status != null ? hajji.HajjiStatu.Title : ""
                            })
                           .OrderByDescending(hajji => hajji.ID)
                           .ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var data = (from hajji in hajjiList
                            where (hajji.CompanyID == user.ActiveBranchId)
                            select new
                            {
                                hajji.ID,
                                hajji.HajjID,
                                FullName = hajji.InitialName + " " + hajji.FirstName + " " + hajji.LastName,
                                hajji.ContactNo,
                                hajji.District,
                                hajji.PerformingHajj,
                                GroupLeaderName = hajji.GroupLeaderID != null ? hajji.GroupLeader.Name : "",
                                hajji.ImageAttach,
                                Title = hajji.Status != null ? hajji.HajjiStatu.Title : ""
                            })
                            .OrderByDescending(hajji => hajji.ID)
                            .ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
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
        public ActionResult GetAllHajjiStatus()
        {
            var hajjiStatusList = _unitOfWork.HajjiStatusRepository.GetAll();
            var data = (from hajjiStatus in hajjiStatusList
                        select new
                        {
                            hajjiStatus.ID,
                            hajjiStatus.Title,

                        }).ToList();

            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SaveHajjiData(Hajji model)
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
                    //if(model.pa)
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
                    var data = new
                    {
                        model.PassportAttach,
                        model.NIDAttach,
                        model.ImageAttach
                    };
                    _unitOfWork.HajjiRepository.Insert(model);
                    _unitOfWork.Save();
                    return Json(new { model = data, Id = model.ID, Success = true, Msg = GlobalVariables.SuccessfulSavedMessage }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    if (model.ID > 0)
                    {
                        var aHajji = _unitOfWork.HajjiRepository.GetById(model.ID);

                        if (aHajji.CompanyID == user.ActiveBranchId)
                        {
                            aHajji.PID = model.PID;
                            aHajji.InitialName = model.InitialName;
                            aHajji.FirstName = model.FirstName;
                            aHajji.MiddleName = model.MiddleName;
                            aHajji.LastName = model.LastName;
                            aHajji.DoB = model.DoB;
                            aHajji.PlaceOfBirth = model.PlaceOfBirth;
                            aHajji.FatherName = model.FatherName;
                            aHajji.MotherName = model.MotherName;
                            aHajji.ContactNo = model.ContactNo;
                            aHajji.NID = model.NID;
                            aHajji.SpouseName = model.SpouseName;
                            aHajji.SpouseContactNo = model.SpouseContactNo;
                            aHajji.EmergencyName = model.EmergencyName;
                            aHajji.EmergencyContactNo = model.EmergencyContactNo;
                            aHajji.GroupLeaderID = model.GroupLeaderID;
                            aHajji.ContractAmount = model.ContractAmount;
                            aHajji.MuharramName = model.MuharramName;
                            aHajji.MuharramRelationID = model.MuharramRelationID;
                            aHajji.PresentAddress = model.PresentAddress;
                            aHajji.PermanentAddress = model.PermanentAddress;
                            aHajji.SerialNo = model.SerialNo;
                            aHajji.TrackingNo = model.TrackingNo;
                            aHajji.PassportNo = model.PassportNo;
                            aHajji.PassportExpiryDate = model.PassportExpiryDate;
                            aHajji.PassportIssueDate = model.PassportIssueDate;
                            aHajji.PlaceOfPassportIssue = model.PlaceOfPassportIssue;
                            aHajji.PerformingHajj = model.PerformingHajj;
                            aHajji.LastHajjYear = model.LastHajjYear;
                            aHajji.Status = model.Status;
                            aHajji.District = model.District;
                            aHajji.Thana = model.Thana;
                            aHajji.PostCode = model.PostCode;
                            aHajji.PostOffice = model.PostOffice;
                            aHajji.PermanentDistrict = model.PermanentDistrict;
                            aHajji.PermanentThana = model.PermanentThana;
                            aHajji.PermanentPostCode = model.PermanentPostCode;
                            aHajji.PermanentPostOffice = model.PermanentPostOffice;
                            aHajji.Email = model.Email;
                            aHajji.ModifiedBy = Convert.ToInt32(User.Identity.Name);
                            aHajji.ModifiedAt = DateTime.Now;

                            if (Request.Files != null)
                            {

                                var year = DateTime.Now.Year;
                                var passportInfo = new string[] { };
                                var imageInfo = new string[] { };
                                var nidinfo = new string[] { };
                                var passTemp = "";
                                var imgTemp = "";
                                var nidTemp = "";

                                if (aHajji.PassportAttach != null)
                                {
                                    passportInfo = aHajji.PassportAttach.Split('/');

                                }
                                if (aHajji.ImageAttach != null)
                                {
                                    imageInfo = aHajji.ImageAttach.Split('/');
                                }
                                if (aHajji.NIDAttach != null)
                                {
                                    nidinfo = aHajji.NIDAttach.Split('/');

                                }
                                var passFileName = passportInfo.FirstOrDefault() + "/" + model.PassportAttach;
                                var imgFileName = imageInfo.FirstOrDefault() + "/" + model.ImageAttach;
                                var nidFileName = nidinfo.FirstOrDefault() + "/" + model.NIDAttach;
                                var passPath = "~/UploadedFiles/" + aHajji.PassportAttach;
                                var imagePath = "~/UploadedFiles/" + aHajji.ImageAttach;
                                var nidPath = "~/UploadedFiles/" + aHajji.NIDAttach;


                                if (aHajji.PassportAttach != null && aHajji.PassportAttach != passFileName)
                                {
                                    System.IO.File.Delete(Server.MapPath(passPath));
                                    passTemp = passportInfo.LastOrDefault();

                                }
                                if (model.PassportAttach != null)
                                {
                                    aHajji.PassportAttach = year + "/" + model.PassportAttach;
                                }
                                if (aHajji.ImageAttach != null && aHajji.ImageAttach != imgFileName)
                                {
                                    System.IO.File.Delete(Server.MapPath(imagePath));
                                    imgTemp = imageInfo.LastOrDefault();
                                }
                                if (model.ImageAttach != null)
                                {
                                    aHajji.ImageAttach = year + "/" + model.ImageAttach;
                                }
                                if (aHajji.NIDAttach != null && aHajji.NIDAttach != nidFileName)
                                {
                                    System.IO.File.Delete(Server.MapPath(nidPath));
                                    nidTemp = nidinfo.LastOrDefault();
                                }
                                if (model.NIDAttach != null)
                                {
                                    aHajji.NIDAttach = year + "/" + model.NIDAttach;
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
                                aHajji.PassportAttach,
                                aHajji.NIDAttach,
                                aHajji.ImageAttach
                            };
                            _unitOfWork.HajjiRepository.Update(aHajji);
                            _unitOfWork.Save();

                            return Json(new { model = data, Success = true, Msg = GlobalVariables.UpdateMessage, Id = model.ID }, JsonRequestBehavior.AllowGet);
                        }
                    }

                    return Json(new { Success = false, Id = model.ID, Msg = GlobalVariables.FailureMessage }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception e)
            {
                return Json(new { Success = false, Id = model.ID, GlobalVariables.FailureMessage }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetHajjiById(int id)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));

            var aHajji = _unitOfWork.HajjiRepository.GetById(id);

            if (user.ActiveBranchId == aHajji.CompanyID)
            {
                var data = new
                {
                    aHajji.ID,
                    aHajji.HajjID,
                    aHajji.PID,
                    InitialName = aHajji.InitialName == null ? "" : aHajji.InitialName,
                    aHajji.FirstName,
                    aHajji.MiddleName,
                    aHajji.LastName,
                    aHajji.DoB,
                    aHajji.PlaceOfBirth,
                    aHajji.FatherName,
                    aHajji.MotherName,
                    aHajji.ContactNo,
                    aHajji.NID,
                    aHajji.SpouseName,
                    aHajji.SpouseContactNo,
                    aHajji.EmergencyName,
                    aHajji.EmergencyContactNo,
                    aHajji.GroupLeaderID,
                    GroupLeader = aHajji.GroupLeaderID != null ? _unitOfWork.GroupLeaderRepository.GetById(Convert.ToInt32(aHajji.GroupLeaderID)).Name : "",
                    aHajji.ContractAmount,
                    aHajji.MuharramName,
                    RelationWithMaharram = aHajji.MuharramRelationID != null ? _unitOfWork.MuharramRepository.GetById(Convert.ToInt32(aHajji.MuharramRelationID)).RelationType : "",
                    aHajji.MuharramRelationID,
                    //RelationWithMaharram = aHajji.RelationWithMaharram,
                    aHajji.PresentAddress,
                    aHajji.PermanentAddress,
                    aHajji.SerialNo,
                    aHajji.TrackingNo,
                    aHajji.PassportNo,
                    aHajji.PassportExpiryDate,
                    aHajji.PassportIssueDate,
                    aHajji.PlaceOfPassportIssue,
                    PerformingHajj = aHajji.PerformingHajj,
                    StatusTitle = aHajji.Status != null ? _unitOfWork.HajjiStatusRepository.GetById(Convert.ToInt32(aHajji.Status)).Title : "",
                    aHajji.Status,
                    aHajji.District,
                    aHajji.Thana,
                    aHajji.PostOffice,
                    aHajji.PostCode,
                    aHajji.LastHajjYear,
                    aHajji.Email,
                    aHajji.PassportAttach,
                    aHajji.NIDAttach,
                    aHajji.ImageAttach

                };

                return Json(data, JsonRequestBehavior.AllowGet);
            }

            return Json(new { success = false, errorCode = 1001, errorMessage = "You have not permission to view this Company Profile." }, JsonRequestBehavior.AllowGet);

        }
    }
}