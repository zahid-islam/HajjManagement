using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHajj.DAL.Interface;
using DagorHajj.Models;
using System.Data.Entity;

namespace DagorHajj.DAL.Repository
{
    public class ContractRepository : IContract
    {
        private readonly DagorHajjEntities _context;
        public ContractRepository(DagorHajjEntities _db)
        {
            this._context = _db;
        }
        public void Delete(Contract model)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Contract> GetAll()
        {
            return _context.Contracts;
        }

        public Contract GetById(int id)
        {
            return _context.Contracts.Find(id);
        }

        public void Insert(Contract model)
        {
            _context.Contracts.Add(model);
        }

        public void Update(Contract model)
        {
            if(_context.Entry(model).State == EntityState.Detached)
            {
                _context.Contracts.Attach(model);
                _context.Entry(model).State = EntityState.Modified;
            }
        }
    }
}