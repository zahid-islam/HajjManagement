using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHajj.DAL.Interfaes;
using DagorHajj.Models;
using System.Data.Entity;

namespace DagorHajj.DAL.Repository
{
    public class RoleRepository : IRole
    {
        private readonly DagorHajjEntities _db;
        public RoleRepository(DagorHajjEntities db)
        {
            this._db = db;
        }
        public void DeleteById(int id)
        {
            Role role = _db.Roles.Find(id);
            _db.Roles.Remove(role);

        }

        public IQueryable<Role> GetAll()
        {
           return _db.Roles;
        }

        public Role GetById(int id)
        {
            return _db.Roles.Find(id);
        }

        public void Insert(Role role)
        {
            _db.Roles.Add(role);
        }

        public void Update(Role role)
        {
            _db.Entry(role).State = EntityState.Modified;
        }
    }
}