using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using DagorHajj.DAL.Interfaces;
using DagorHajj.Models;

namespace DagorHajj.DAL.Repository
{
    public sealed class AdminSystemUserRepository : IAdminSystemUser
    {
        private readonly DagorHajjEntities _context;

        public AdminSystemUserRepository(DagorHajjEntities context)
        {
            _context = context;
        }

        public IQueryable<AdminSystemUser> GetAll(
            Expression<Func<AdminSystemUser, bool>> filter = null,
            Func<IQueryable<AdminSystemUser>, IOrderedQueryable<AdminSystemUser>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<AdminSystemUser> query = _context.AdminSystemUsers;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            return orderBy == null ? query : orderBy(query);
        }

        public AdminSystemUser Get(
        Expression<Func<AdminSystemUser, bool>> filter = null,
            Func<IQueryable<AdminSystemUser>, IOrderedQueryable<AdminSystemUser>> orderBy = null,
            string includeProperties = "")
        {
            return GetAll(filter, orderBy, includeProperties).FirstOrDefault();
        }
        public bool Any(
          Expression<Func<AdminSystemUser, bool>> filter = null)
        {
            return filter == null ? _context.AdminSystemUsers.Any() : _context.AdminSystemUsers.Any(filter);
        }

        public void Insert(AdminSystemUser entity)
        {
            _context.AdminSystemUsers.Add(entity);
        }

        public void Delete(int id)
        {
            var entity = _context.AdminSystemUsers.Single(s => s.Id == id);
            _context.AdminSystemUsers.Remove(entity);
        }

        public void Update(AdminSystemUser entity)
        {
            if (_context.Entry(entity).State == EntityState.Detached)
                _context.AdminSystemUsers.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }
    }
}