using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHajj.DAL.Interface;
using DagorHajj.Models;

namespace DagorHajj.DAL.Repository
{
    public class HajjiRepository : IHajji
    {
        private readonly DagorHajjEntities _context;
        public HajjiRepository(DagorHajjEntities _db)
        {
            this._context = _db;
        }
        public void Delete(Hajji model)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Hajji> GetAll()
        {
            return _context.Hajjis;
        }

        public Hajji GetById(int id)
        {
            return _context.Hajjis.Find(id);
        }

        public void Insert(Hajji model)
        {
            _context.Hajjis.Add(model);
        }

        public void Update(Hajji model)
        {
            if(_context.Entry(model).State == System.Data.Entity.EntityState.Detached)
            {
                _context.Hajjis.Attach(model);
                _context.Entry(model).State = System.Data.Entity.EntityState.Modified;
            }
        }
    }
}