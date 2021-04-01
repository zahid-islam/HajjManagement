using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHajj.Models;
using DagorHajj.DAL.Interfaes;
using System.Data.Entity;

namespace DagorHajj.DAL.Repository
{
    public class UserRepository : IUser
    {
        private readonly DagorHajjEntities _db;
        public UserRepository(DagorHajjEntities db)
        {
            this._db = db;
        }
        public void DeleteById(int id)
        {
            User user = _db.Users.Find(id);
            _db.Users.Remove(user);
        }

        public IQueryable<User> GetAll()
        {
            return _db.Users;
        }

        public User GetById(int id)
        {
            return _db.Users.Find(id);
            
           
        }
        // New Added GetByEmail....!
        public User GetByEmail(string email)
        {
            return _db.Users.FirstOrDefault(u => u.Email == email);
           
        }
        public void Insert(User user)
        {
            _db.Users.Add(user);
        }

        public void Update(User user)
        {
            _db.Entry(user).State = EntityState.Modified;
        }
    }
}