using DagorHajj.DAL.Hajj.Interface;
using DagorHajj.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DagorHajj.DAL.Repository
{
    public class TicketRepository : ITicket
    {
        private readonly DagorHajjEntities _context;
        public TicketRepository(DagorHajjEntities _db)
        {
            this._context = _db;
        }
        public void Delete(Ticket model)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Ticket> GetAll()
        {
            return _context.Tickets;
        }

        public Ticket GetById(int id)
        {
            return _context.Tickets.Find(id);
        }

        public void Insert(Ticket model)
        {
            _context.Tickets.Add(model);
        }

        public void Update(Ticket model)
        {
            if (_context.Entry(model).State == System.Data.Entity.EntityState.Detached)
            {
                _context.Tickets.Attach(model);
                _context.Entry(model).State = System.Data.Entity.EntityState.Modified;
            }
        }
    }
}