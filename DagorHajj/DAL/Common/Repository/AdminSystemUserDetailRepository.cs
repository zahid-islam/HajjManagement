using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using DagorHajj.DAL.Interfaces;
using DagorHajj.Models;

namespace DagorHajj.DAL.Repository
{
    public sealed class AdminSystemUserDetailRepository : IAdminSystemUserDetail
    {
        private readonly DagorHajjEntities _context;

        public AdminSystemUserDetailRepository(DagorHajjEntities context)
        {
            _context = context;
        }

        public IQueryable<AdminSystemUserDetail> GetAll(
            Expression<Func<AdminSystemUserDetail, bool>> filter = null,
            Func<IQueryable<AdminSystemUserDetail>, IOrderedQueryable<AdminSystemUserDetail>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<AdminSystemUserDetail> query = _context.AdminSystemUserDetails;

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

        public AdminSystemUserDetail Get(
        Expression<Func<AdminSystemUserDetail, bool>> filter = null,
            Func<IQueryable<AdminSystemUserDetail>, IOrderedQueryable<AdminSystemUserDetail>> orderBy = null,
            string includeProperties = "")
        {
            return GetAll(filter, orderBy, includeProperties).FirstOrDefault();
        }
        public bool Any(
          Expression<Func<AdminSystemUserDetail, bool>> filter = null)
        {
            return filter == null ? _context.AdminSystemUserDetails.Any() : _context.AdminSystemUserDetails.Any(filter);
        }

        public void Insert(AdminSystemUserDetail entity)
        {
            _context.AdminSystemUserDetails.Add(entity);
        }

        public void Delete(int id)
        {
            var entity = _context.AdminSystemUserDetails.Single(s => s.Id == id);
            _context.AdminSystemUserDetails.Remove(entity);
        }

        public void Update(AdminSystemUserDetail entity)
        {
            if (_context.Entry(entity).State == EntityState.Detached)
                _context.AdminSystemUserDetails.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }
    }
}