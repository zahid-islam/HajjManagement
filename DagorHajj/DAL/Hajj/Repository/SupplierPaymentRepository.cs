using DagorHajj.DAL.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHajj.Models;

namespace DagorHajj.DAL.Repository
{
    public class SupplierPaymentRepository : ISupplierPayment
    {
        private readonly DagorHajjEntities _context;
        public SupplierPaymentRepository(DagorHajjEntities _db)
        {
            this._context = _db;
        }
        public void Delete(SupplierPayment model)
        {
            throw new NotImplementedException();
        }

        public IQueryable<SupplierPayment> GetAll()
        {
            return _context.SupplierPayments;
        }

        public SupplierPayment GetById(int id)
        {
            return _context.SupplierPayments.Find(id);
        }

        public void Insert(SupplierPayment model)
        {
            _context.SupplierPayments.Add(model);
        }

        public void Update(SupplierPayment model)
        {
            if (_context.Entry(model).State == System.Data.Entity.EntityState.Detached)
            {
                _context.SupplierPayments.Attach(model);
                _context.Entry(model).State = System.Data.Entity.EntityState.Modified;
            }
        }
    }
}