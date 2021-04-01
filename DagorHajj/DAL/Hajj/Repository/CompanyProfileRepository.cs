using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHajj.DAL.Interface;
using DagorHajj.Models;
using System.Data.Entity;

namespace DagorHajj.DAL.Repository
{
    public class CompanyProfileRepository : ICompanyProfile
    {
        private readonly DagorHajjEntities _context;
        public CompanyProfileRepository(DagorHajjEntities _db)
        {
            this._context = _db;
        }
        public void Delete(CompanyProfile model)
        {
            throw new NotImplementedException();
        }

        public IQueryable<CompanyProfile> GetAll()
        {
            return _context.CompanyProfiles;
        }

        public CompanyProfile GetById(int id)
        {
            return _context.CompanyProfiles.Find(id);
        }

        public void Insert(CompanyProfile model)
        {
            _context.CompanyProfiles.Add(model);
        }

        public void Update(CompanyProfile model)
        {
            if(_context.Entry(model).State == EntityState.Detached)
            {
                _context.CompanyProfiles.Attach(model);
                _context.Entry(model).State = EntityState.Modified;
            }
        }
    }
}