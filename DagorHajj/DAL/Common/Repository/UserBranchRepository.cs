using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHCS.Models;
using DagorHCS.DAL.Interfaces;
using System.Data.Entity;

namespace DagorHCS.DAL.Repository
{
    public class UserBranchRepository : IUserBranch
    {
        private readonly DagorHCSEntities _db;
        public UserBranchRepository(DagorHCSEntities db)
        {
            this._db = db;
        }
        public void DeleteById(int id)
        {
            UserBranch userBranch = _db.UserBranches.Find(id);
            _db.UserBranches.Remove(userBranch);
        }

        public IEnumerable<UserBranch> GetAll()
        {
            return _db.UserBranches.ToList();
        }

        public UserBranch GetById(int id)
        {
            return _db.UserBranches.Find(id);
        }

        public void Insert(UserBranch userBranch)
        {
            _db.UserBranches.Add(userBranch);
        }

        public void Update(UserBranch userBranch)
        {
            _db.Entry(userBranch).State = EntityState.Modified;
        }
    }
}