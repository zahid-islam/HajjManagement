using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using DagorHajj.DAL.Repository;
using DagorHajj.DAL;
using DagorHajj.Models;

namespace DagorHajj.Areas.Hajj.Controllers
{
    [SafelyAuthorize]
    public class MuharramRelationController : Controller
    {
        UnitOfWork unitOfWork = new UnitOfWork();

        // GET: Hajj/MuharramRelation
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult SaveMuharram(MuharramRelation muharramRelation)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //unitOfWork.MuharramRepository.Insert(muharramRelation);
                    //unitOfWork.Save();

                    DagorHajjEntities db = new DagorHajjEntities();
                    db.MuharramRelations.Add(muharramRelation);
                    db.SaveChanges();

                    return Json(new { Success = true, Id = muharramRelation.ID }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { Succss = false }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public JsonResult UpdateMuharram(MuharramRelation muharramRelation)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //get existing data
                    var existingMuharram = unitOfWork.MuharramRepository.GetById(muharramRelation.ID);

                    //update data
                    existingMuharram.RelationType = muharramRelation.RelationType;

                    DagorHajjEntities db = new DagorHajjEntities();
                    db.Entry(existingMuharram).State = EntityState.Modified;
                    db.SaveChanges();

                    //unitOfWork.MuharramRepository.Update(existingMuharram);
                    //unitOfWork.Save();

                    return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
                }

                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                //throw ex;
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetMuharrams()
        {
            var muharrams = unitOfWork.MuharramRepository.GetAll()
                .Select(x => new {
                    x.ID,
                    x.RelationType
                }).ToList();
            return Json(muharrams, JsonRequestBehavior.AllowGet);
        }
        // GET: DagorHajj/MuharramRelation/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: DagorHajj/MuharramRelation/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: DagorHajj/MuharramRelation/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: DagorHajj/MuharramRelation/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: DagorHajj/MuharramRelation/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: DagorHajj/MuharramRelation/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: DagorHajj/MuharramRelation/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
