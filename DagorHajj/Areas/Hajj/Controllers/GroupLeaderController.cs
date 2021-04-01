using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DagorHajj.DAL;
using DagorHajj.Models;
using DagorHajj.Utility;
using System.IO;

namespace DagorHajj.Areas.Hajj.Controllers
{
    [SafelyAuthorize]
    public class GroupLeaderController : Controller
    {
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();
        // GET: Hajj/GroupLeader
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
        public ActionResult SaveGroupLeader(GroupLeader model)
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
                    _unitOfWork.GroupLeaderRepository.Insert(model);
                    _unitOfWork.Save();
                    return Json(new { model = model, Id = model.ID, Success = true, Msg = GlobalVariables.SuccessfulSavedMessage },
                        JsonRequestBehavior.AllowGet);
                }
                else
                {
                    if (model.ID > 0)
                    {

                        var aGroupLeader = _unitOfWork.GroupLeaderRepository.GetById(model.ID);



                        if (aGroupLeader.CompanyID == user.ActiveBranchId)
                        {
                            aGroupLeader.Name = model.Name;
                            aGroupLeader.ContactNo = model.ContactNo;
                            aGroupLeader.NID = model.NID;
                            aGroupLeader.Passport = model.Passport;
                            aGroupLeader.Email = model.Email;
                            aGroupLeader.ContactNoKSA = model.ContactNoKSA;
                            aGroupLeader.District = model.District;
                            aGroupLeader.Thana = model.Thana;
                            aGroupLeader.PostOffice = model.PostOffice;
                            aGroupLeader.PostCode = model.PostCode;
                            aGroupLeader.Address1 = model.Address1;
                            aGroupLeader.Address2 = model.Address2;
                            aGroupLeader.ModifiedBy = Convert.ToInt32(User.Identity.Name);
                            aGroupLeader.ModifiedAt = DateTime.Now;

                            if (Request.Files != null)
                            {
                                var year = DateTime.Now.Year;
                                var passportInfo = new string[] { };
                                var imageInfo = new string[] { };
                                var nidinfo = new string[] { };
                                var passTemp = "";
                                var imgTemp = "";
                                var nidTemp = "";

                                if (aGroupLeader.PassportAttach != null)
                                {
                                    passportInfo = aGroupLeader.PassportAttach.Split('/');

                                }
                                if (aGroupLeader.ImageAttach != null)
                                {
                                    imageInfo = aGroupLeader.ImageAttach.Split('/');
                                }
                                if (aGroupLeader.NIDAttach != null)
                                {
                                    nidinfo = aGroupLeader.NIDAttach.Split('/');

                                }
                                var passFileName = passportInfo.FirstOrDefault() + "/" + model.PassportAttach;
                                var imgFileName = imageInfo.FirstOrDefault() + "/" + model.ImageAttach;
                                var nidFileName = nidinfo.FirstOrDefault() + "/" + model.NIDAttach;
                                var passPath = "~/UploadedFiles/" + aGroupLeader.PassportAttach;
                                var imagePath = "~/UploadedFiles/" + aGroupLeader.ImageAttach;
                                var nidPath = "~/UploadedFiles/" + aGroupLeader.NIDAttach;


                                if (aGroupLeader.PassportAttach != null && aGroupLeader.PassportAttach != passFileName)
                                {
                                    System.IO.File.Delete(Server.MapPath(passPath));
                                    passTemp = passportInfo.LastOrDefault();

                                }
                                if (model.PassportAttach != null)
                                {
                                    aGroupLeader.PassportAttach = year + "/" + model.PassportAttach;
                                }
                                if (aGroupLeader.ImageAttach != null && aGroupLeader.ImageAttach != imgFileName)
                                {
                                    System.IO.File.Delete(Server.MapPath(imagePath));
                                    imgTemp = imageInfo.LastOrDefault();
                                }
                                if (model.ImageAttach != null)
                                {
                                    aGroupLeader.ImageAttach = year + "/" + model.ImageAttach;
                                }
                                if (aGroupLeader.NIDAttach != null && aGroupLeader.NIDAttach != nidFileName)
                                {
                                    System.IO.File.Delete(Server.MapPath(nidPath));
                                    nidTemp = nidinfo.LastOrDefault();
                                }
                                if (model.NIDAttach != null)
                                {
                                    aGroupLeader.NIDAttach = year + "/" + model.NIDAttach;
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
                                aGroupLeader.PassportAttach,
                                aGroupLeader.ImageAttach,
                                aGroupLeader.NIDAttach
                            };

                            _unitOfWork.Save();
                            return Json(new { model = data, Id = model.ID, Success = true, Msg = GlobalVariables.UpdateMessage },
                                JsonRequestBehavior.AllowGet);
                        }
                    }
                    return Json(new { Id = model.ID, Success = false, Msg = GlobalVariables.FailureMessage },
                          JsonRequestBehavior.AllowGet);
                }
            }
            catch
            {
                return Json(new { Success = false, Id = model.ID, Msg = GlobalVariables.FailureMessage },
                    JsonRequestBehavior.AllowGet);
            }

        }
        public ActionResult GetAllGroupLeader()
        {
            var userId = Convert.ToInt32(User.Identity.Name);
            var user = _unitOfWork.UserRepository.GetById(userId);
            var GroupLeaders = _unitOfWork.GroupLeaderRepository.GetAll();
            var Hajjis = _unitOfWork.HajjiRepository.GetAll();
            var UmrahList = _unitOfWork.UmrahRepository.GetAll();

            if (user.Role.Name == "Super Admin")
            {
                var data = (from groupLeader in GroupLeaders
                            join hajji in Hajjis on groupLeader.ID equals hajji.GroupLeaderID into g
                            join umrah in UmrahList on groupLeader.ID equals umrah.GroupLeaderID
                            into h
                            select new
                            {
                                groupLeader.ID,
                                groupLeader.Name,
                                groupLeader.ContactNo,
                                groupLeader.District,
                                NoOfHajji = g.Count(),
                                NoOfUmrah = h.Count(),
                                groupLeader = groupLeader.ImageAttach
                            }).OrderByDescending(a => a.ID).ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var data = (from groupLeader in GroupLeaders
                            join hajji in Hajjis on groupLeader.ID equals hajji.GroupLeaderID into g
                            join umrah in UmrahList on groupLeader.ID equals umrah.GroupLeaderID into h
                            where (groupLeader.CompanyID == user.ActiveBranchId)
                            select new
                            {
                                groupLeader.ID,
                                groupLeader.Name,
                                groupLeader.ContactNo,
                                groupLeader.District,
                                NoOfHajji = g.Count(),
                                NoOfUmrah = h.Count(),
                                groupLeader.ImageAttach
                            }).OrderByDescending(a => a.ID).ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetGroupLeaderById(int id)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            var groupLeader = _unitOfWork.GroupLeaderRepository.GetById(id);

            if (groupLeader.CompanyID == user.ActiveBranchId)
            {
                var data = new
                {
                    groupLeader.ID,
                    groupLeader.Name,
                    groupLeader.ContactNo,
                    groupLeader.NID,
                    groupLeader.Passport,
                    groupLeader.Email,
                    groupLeader.ContactNoKSA,
                    groupLeader.District,
                    groupLeader.Thana,
                    groupLeader.PostOffice,
                    groupLeader.PostCode,
                    groupLeader.Address1,
                    groupLeader.Address2,
                    groupLeader.PassportAttach,
                    groupLeader.NIDAttach,
                    groupLeader.ImageAttach
                };
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = false, errorCode = 1001, errorMessage = "You have not permission to view this Company Profile." }, JsonRequestBehavior.AllowGet);
        }
    }
}
