using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using DagorHajj.Models;
using DagorHajj.DAL.Interface;

namespace DagorHajj.DAL.Repository
{
    public class UmrahStatusRepository : IUmrahStatus
    {
        private readonly DagorHajjEntities _context;
        public UmrahStatusRepository(DagorHajjEntities _db)
        {
            this._context = _db;
        }

        public void Delete(UmrahStatu model)
        {
            throw new NotImplementedException();
        }

        public IQueryable<UmrahStatu> GetAll()
        {
            return _context.UmrahStatus;
        }

        public UmrahStatu GetById(int id)
        {
            return _context.UmrahStatus.Find(id);
        }

        public void Insert(UmrahStatu model)
        {
            _context.UmrahStatus.Add(model);
        }

        public void Update(UmrahStatu model)
        {
            if (_context.Entry(model).State == EntityState.Detached)
            {
                _context.UmrahStatus.Attach(model);
                _context.Entry(model).State = EntityState.Modified;
            }
        }
    }
}