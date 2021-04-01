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
    public class HajjiReferenceController : Controller
    {
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();
        // GET: Hajj/HajjiReference
        public ActionResult Index()
        {
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
        public ActionResult SaveHajjiReference(Contract model)
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

                    _unitOfWork.ContractRepository.Insert(model);
                    _unitOfWork.Save();
                    return Json(new { Id = model.ID, Success = true, Msg = GlobalVariables.SuccessfulSavedMessage },
                        JsonRequestBehavior.AllowGet);


                }
                else
                {
                    if (model.ID > 0)
                    {
                        var aHajjiReference = _unitOfWork.ContractRepository.GetById(model.ID);

                        if (user.ActiveBranchId == aHajjiReference.CompanyID)
                        {
                            aHajjiReference.GroupLeaderID = model.GroupLeaderID;
                            aHajjiReference.ContractAmount = model.ContractAmount;
                            aHajjiReference.ModifiedBy = Convert.ToInt32(User.Identity.Name);
                            aHajjiReference.ModifiedAt = DateTime.Now;

                            _unitOfWork.ContractRepository.Update(aHajjiReference);
                            _unitOfWork.Save();
                            return Json(new { id = model.ID, Success = true, Msg = GlobalVariables.UpdateMessage },
                                JsonRequestBehavior.AllowGet);
                        }
                    }

                    return Json(new { Id = model.ID, Success = false, Msg = GlobalVariables.FailureMessage },
                            JsonRequestBehavior.AllowGet);
                }
            }
            catch
            {
                return Json(new { Id = model.ID, Success = false, Msg = GlobalVariables.FailureMessage },
                        JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetHajjiReferenceById(int id)
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));
            var aHajjiReference = _unitOfWork.ContractRepository.GetById(id);

            if (user.ActiveBranchId == aHajjiReference.CompanyID)
            {
                var data = new
                {
                    ID = aHajjiReference.ID,
                    Hajji = aHajjiReference.Hajji.HajjID + "-" + aHajjiReference.Hajji.FirstName,
                    HajjiID = aHajjiReference.Hajji.ID,
                    GroupLeader = aHajjiReference.GroupLeader.Name,
                    GroupLeaderID = aHajjiReference.GroupLeader.ID,
                    ContractAmount = aHajjiReference.ContractAmount

                };

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = false, errorCode = 1001, errorMessage = "You have not permission to view this Company Profile." }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllHajjiReference()
        {
            var userId = Convert.ToInt32(User.Identity.Name);
            var user = _unitOfWork.UserRepository.GetById(userId);
            var hajjiReferenceList = _unitOfWork.ContractRepository.GetAll();
            if (user.Role.Name == "Super Admin")
            {
                var data = (from a in hajjiReferenceList                            
                            select new
                            {
                                a.ID,
                                amount = a.ContractAmount,
                                hajjiName = a.Hajji.FirstName,
                                LeaderName = a.GroupLeader.Name,
                                mobile = a.Hajji.ContactNo,

                            }).OrderByDescending(a => a.ID).ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var data = (from a in hajjiReferenceList
                            where (a.CompanyID == user.ActiveBranchId)
                            select new
                            {
                                a.ID,
                                amount = a.ContractAmount,
                                hajjiName = a.Hajji.FirstName,
                                LeaderName = a.GroupLeader.Name,
                                mobile = a.Hajji.ContactNo,

                            }).OrderByDescending(a => a.ID).ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetAllHajji()
        {
            var user = _unitOfWork.UserRepository.GetById(Convert.ToInt32(User.Identity.Name));

            var hajjiList = _unitOfWork.HajjiRepository.GetAll();
            var hajjireference = _unitOfWork.ContractRepository.GetAll();

            var data = (from a in hajjiList
                        join b in hajjireference on a.ID equals b.HajjiID
                        into h
                        where !h.Any() && user.ActiveBranchId == a.CompanyID
                        select new
                        {
                            a.ID,
                            hajjiId = a.HajjID + "-" + a.FirstName,

                        }).ToList();



            return Json(data, JsonRequestBehavior.AllowGet);
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
    }
}