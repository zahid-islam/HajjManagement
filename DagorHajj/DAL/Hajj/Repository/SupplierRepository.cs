using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using DagorHajj.Models;
using DagorHajj.DAL.Interfaces;

namespace DagorHajj.DAL.Repository
{
    public class SupplierRepository : ISupplier
    {
        private readonly DagorHajjEntities _db;
        public SupplierRepository(DagorHajjEntities db)
        {
            this._db = db;
        }
        public void DeleteById(int id)
        {
            Supplier Supplier = _db.Suppliers.Find(id);
            _db.Suppliers.Remove(Supplier);
        }

        public IEnumerable<Supplier> GetAll()
        {
            return _db.Suppliers.ToList();
        }

        public Supplier GetById(int id)
        {
            return _db.Suppliers.Find(id);
        }

        public void Insert(Supplier Supplier)
        {
            _db.Suppliers.Add(Supplier);
        }

        public void Update(Supplier Supplier)
        {
            _db.Entry(Supplier).State = EntityState.Modified;
        }
    }
}