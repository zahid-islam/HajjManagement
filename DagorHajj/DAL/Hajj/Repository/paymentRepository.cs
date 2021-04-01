using DagorHajj.DAL.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHajj.Models;

namespace DagorHajj.DAL.Repository
{
    public class PaymentRepository : IPayment
    {
        private readonly DagorHajjEntities _context;
        public PaymentRepository(DagorHajjEntities _db)
        {
            this._context = _db;
        }
        public void Delete(Payment model)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Payment> GetAll()
        {
            return _context.Payments;
        }

        public Payment GetById(int id)
        {
            return _context.Payments.Find(id);
        }

        public void Insert(Payment model)
        {
            _context.Payments.Add(model);
        }

        public void Update(Payment model)
        {
            if (_context.Entry(model).State == System.Data.Entity.EntityState.Detached)
            {
                _context.Payments.Attach(model);
                _context.Entry(model).State = System.Data.Entity.EntityState.Modified;
            }
        }
    }
}