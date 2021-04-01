using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using DagorHCS.Models;
using DagorHCS.Interfaces;
namespace DagorHCS.DAL.Repository
{
    public class UserEmployeeRepository : IUserEmployee
    {
        private DagorHCSEntities _context;

        public UserEmployeeRepository(DagorHCSEntities context)
        {
            _context = context;
        }

        public IQueryable<UserEmployee> GetAll()
        {
            return _context.UserEmployees;
        }

        public UserEmployee GetById(int id)
        {
            return _context.UserEmployees.Find(id);
        }
        public void Insert(UserEmployee entity)
        {
            _context.UserEmployees.Add(entity);
        }

        public void Delete(int id)
        {
            var entity = _context.UserEmployees.Find(id);
            _context.UserEmployees.Remove(entity);
        }
        public void Delete(UserEmployee entity)
        {
            _context.UserEmployees.Remove(entity);
        }

        public void Update(UserEmployee entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
        }
    }
}