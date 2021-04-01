using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using DagorHajj.Models;

namespace DagorHajj.DAL.Interfaces
{
    public interface IAdminSystemUser
    {
        IQueryable<AdminSystemUser> GetAll(Expression<Func<AdminSystemUser, bool>> filter = null,
            Func<IQueryable<AdminSystemUser>, IOrderedQueryable<AdminSystemUser>> orderBy = null,
            string includeProperties = "");
        AdminSystemUser Get(Expression<Func<AdminSystemUser, bool>> filter = null,
            Func<IQueryable<AdminSystemUser>, IOrderedQueryable<AdminSystemUser>> orderBy = null,
            string includeProperties = "");
        void Insert(AdminSystemUser entity);
        void Delete(int id);
        void Update(AdminSystemUser entity);
    }
}