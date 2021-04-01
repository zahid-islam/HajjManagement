using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using DagorHajj.Models;

namespace DagorHajj.DAL.Interfaces
{
    public interface IAdminSystemUserDetail
    {
        IQueryable<AdminSystemUserDetail> GetAll(Expression<Func<AdminSystemUserDetail, bool>> filter = null,
            Func<IQueryable<AdminSystemUserDetail>, IOrderedQueryable<AdminSystemUserDetail>> orderBy = null,
            string includeProperties = "");
        AdminSystemUserDetail Get(Expression<Func<AdminSystemUserDetail, bool>> filter = null,
            Func<IQueryable<AdminSystemUserDetail>, IOrderedQueryable<AdminSystemUserDetail>> orderBy = null,
            string includeProperties = "");
        void Insert(AdminSystemUserDetail entity);
        void Delete(int id);
        void Update(AdminSystemUserDetail entity);
    }
}