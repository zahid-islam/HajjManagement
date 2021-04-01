using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHajj.DAL.Interface;
using DagorHajj.Models;

namespace DagorHajj.DAL.Repository
{
    public class UmrahRepository : IUmrah
    {
        private readonly DagorHajjEntities _context;
        public UmrahRepository(DagorHajjEntities _db)
        {
            this._context = _db;
        }
        public void Delete(Umrah model)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Umrah> GetAll()
        {
            return _context.Umrahs;
        }

        public Umrah GetById(int id)
        {
            return _context.Umrahs.Find(id);
        }

        public void Insert(Umrah model)
        {
            _context.Umrahs.Add(model);
        }

        public void Update(Umrah model)
        {
            if(_context.Entry(model).State == System.Data.Entity.EntityState.Detached)
            {
                _context.Umrahs.Attach(model);
                _context.Entry(model).State = System.Data.Entity.EntityState.Modified;
            }
        }
    }
}