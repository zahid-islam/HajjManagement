using DagorHajj.DAL.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHajj.Models;

namespace DagorHajj.DAL.Repository
{
    public class BookingRepository : IBooking
    {
        private readonly DagorHajjEntities _context;
        public BookingRepository(DagorHajjEntities _db)
        {
            this._context = _db;
        }
        public void Delete(Booking model)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Booking> GetAll()
        {
            return _context.Bookings;
        }

        public Booking GetById(int id)
        {
            return _context.Bookings.Find(id);
        }

        public void Insert(Booking model)
        {
            _context.Bookings.Add(model);
        }

        public void Update(Booking model)
        {
            if(_context.Entry(model).State == System.Data.Entity.EntityState.Detached)
            {
                _context.Bookings.Attach(model);
                _context.Entry(model).State = System.Data.Entity.EntityState.Modified;
            }
        }
    }
}