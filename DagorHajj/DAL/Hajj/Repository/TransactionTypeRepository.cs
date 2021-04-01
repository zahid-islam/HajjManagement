using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHajj.Models;
using DagorHajj.DAL.Interface;
namespace DagorHajj.DAL.Repository
{
    public class TransactionTypeRepository : ITransactionType
    {
        private readonly DagorHajjEntities _context;
        public TransactionTypeRepository(DagorHajjEntities _db)
        {
            this._context = _db;
        }
        public void Delete(TransactionType model)
        {
            throw new NotImplementedException();
        }

        public IQueryable<TransactionType> GetAll()
        {
            return _context.TransactionTypes;
        }

        public TransactionType GetById(int id)
        {
            return _context.TransactionTypes.Find(id);
        }

        public void Insert(TransactionType model)
        {
            _context.TransactionTypes.Add(model);
        }

        public void Update(TransactionType model)
        {
            if (_context.Entry(model).State == System.Data.Entity.EntityState.Detached)
            {
                _context.TransactionTypes.Attach(model);
                _context.Entry(model).State = System.Data.Entity.EntityState.Modified;
            }
        }
    }
}