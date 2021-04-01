using DagorHajj.DAL.Hajj.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHajj.Models;

namespace DagorHajj.DAL.Repository
{
    public class OtherRepository : IOther
    {
        private readonly DagorHajjEntities _context;
        public OtherRepository(DagorHajjEntities _db)
        {
            this._context = _db;
        }

        public void Delete(Other model)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Other> GetAll()
        {
            return _context.Other;
        }

        public Other GetById(int id)
        {
            return _context.Other.Find(id);
        }

        public void Insert(Other model)
        {
             _context.Other.Add(model);
        }

        public void Update(Other model)
        {
            if (_context.Entry(model).State == System.Data.Entity.EntityState.Detached)
            {
                _context.Other.Attach(model);
                _context.Entry(model).State = System.Data.Entity.EntityState.Modified;
            }
        }
    }
}