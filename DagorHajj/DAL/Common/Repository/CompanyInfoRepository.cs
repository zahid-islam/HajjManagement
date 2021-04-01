using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHCS.Models;
using DagorHCS.DAL.Interfaces;
using System.Data.Entity;

namespace DagorHCS.DAL.Repository
{
    public class CompanyInfoRepository: ICompanyInfo
    {
        private DagorHCSEntities _db;
        public CompanyInfoRepository(DagorHCSEntities db)
        {
            this._db = db;
        }

        public void DeleteById(int id)
        {
            CompanyInfo companyInfo = _db.CompanyInfoes.Find(id);
            _db.CompanyInfoes.Remove(companyInfo);
        }

        public IEnumerable<CompanyInfo> GetAll()
        {
           return _db.CompanyInfoes.ToList();
        }

        public CompanyInfo GetById(int id)
        {
            return _db.CompanyInfoes.Find(id);
        }

        public void Insert(CompanyInfo companyInfo)
        {
            _db.CompanyInfoes.Add(companyInfo);
        }

        public void Update(CompanyInfo companyInfo)
        {
            _db.Entry(companyInfo).State = EntityState.Modified;
        }
    }
}