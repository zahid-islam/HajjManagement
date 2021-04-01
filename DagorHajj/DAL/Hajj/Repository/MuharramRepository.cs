using DagorHajj.DAL.Hajj.Interface;
using DagorHajj.DAL.Interface;
using DagorHajj.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace DagorHajj.DAL.Repository
{
    public class MuharramRepository : IMuharram
    {
        private readonly DagorHajjEntities _context;
        public MuharramRepository(DagorHajjEntities _db)
        {
            this._context = _db;
        }

        public void Delete(MuharramRelation model)
        {
            throw new NotImplementedException();
        }

        public IQueryable<MuharramRelation> GetAll()
        {
            return _context.MuharramRelations;
        }

        public MuharramRelation GetById(int id)
        {
            return _context.MuharramRelations.Find(id);
        }

        public void Insert(MuharramRelation model)
        {
            _context.MuharramRelations.Add(model);
        }

        public void Update(MuharramRelation model)
        {
            if (_context.Entry(model).State == EntityState.Detached)
            {
                _context.MuharramRelations.Attach(model);
                _context.Entry(model).State = EntityState.Modified;
            }
        }
    }
}