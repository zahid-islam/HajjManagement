using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHCS.Models;
using DagorHCS.DAL.Interfaces;
using System.Data.Entity;

namespace DagorHCS.DAL.Repository
{
    public class BranchRepository:IBranch
    {
        private DagorHCSEntities _db;
        public BranchRepository(DagorHCSEntities db)
        {
            this._db = db;
        }

        public void DeleteById(int id)
        {
            Branch branch = _db.Branches.Find(id);
            _db.Branches.Remove(branch);
        }

        public IEnumerable<Branch> GetAll()
        {
            return _db.Branches.ToList();
        }

        public Branch GetById(int id)
        {
            return _db.Branches.Find(id);
        }

        public void Insert(Branch branch)
        {
            _db.Branches.Add(branch);
        }

        public void Update(Branch branch)
        {
            _db.Entry(branch).State = EntityState.Modified;
        }
    }
}