using DagorHajj.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using DagorHajj.DAL.Interface;
using DagorHajj.DAL.Hajj.Interface;

namespace DagorHajj.DAL.Repository
{
    public class HajjiStatusRepository : IHajjiStatus
    {
        private readonly DagorHajjEntities _context;
        public HajjiStatusRepository(DagorHajjEntities _db)
        {
            this._context = _db;
        }

        public void Delete(HajjiStatu model)
        {
            throw new NotImplementedException();
        }
     
        public IQueryable<HajjiStatu> GetAll()
        {
            return _context.HajjiStatus;
        }

        public HajjiStatu GetById(int id)
        {
            return _context.HajjiStatus.Find(id);
        }

        public void Insert(HajjiStatu model)
        {
            _context.HajjiStatus.Add(model);
        }

        public void Update(HajjiStatu model)
        {
            if (_context.Entry(model).State == EntityState.Detached)
            {
                _context.HajjiStatus.Attach(model);
                _context.Entry(model).State = EntityState.Modified;
            }
        }
    }
}