using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using DagorHCS.Models;

namespace DagorHCS.DAL.Interfaces
{
    public interface ISelectValueRepository
    {
        IEnumerable<SelectValue> GetAll(Expression<Func<SelectValue, bool>> filter = null,
            Func<IQueryable<SelectValue>, IOrderedQueryable<SelectValue>> orderBy = null,
            string includeProperties = "");
        SelectValue Get(Expression<Func<SelectValue, bool>> filter = null,
            Func<IQueryable<SelectValue>, IOrderedQueryable<SelectValue>> orderBy = null,
            string includeProperties = "");
        void Insert(SelectValue selectValue);
        void Delete(SelectValue selectValue);
        void Delete(int id);
        void Update(SelectValue selectValue);
    }
}