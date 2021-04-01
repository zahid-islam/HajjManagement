using DagorHajj.DAL.Hajj.Interface;
using DagorHajj.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace DagorHajj.DAL.Repository
{
    public class TicketSectorRepository : ITicketSector
    {
        private readonly DagorHajjEntities _context;
        public TicketSectorRepository(DagorHajjEntities _db)
        {
            this._context = _db;
        }
        public void Delete(TicketSector model)
        {
            throw new NotImplementedException();
        }

        public IQueryable<TicketSector> GetAll()
        {
            return _context.TicketSectors;
        }

        public TicketSector GetById(int id)
        {
            return _context.TicketSectors.Find(id);
        }

        public void Insert(TicketSector model)
        {
            _context.TicketSectors.Add(model);
        }

        public void Update(TicketSector model)
        {
            if (_context.Entry(model).State == EntityState.Detached)
            {
                _context.TicketSectors.Attach(model);
                _context.Entry(model).State = EntityState.Modified;
            }
        }
    }
}