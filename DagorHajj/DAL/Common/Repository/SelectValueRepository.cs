using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using DagorHCS.DAL.Interfaces;
using DagorHCS.Models;

namespace DagorHCS.DAL.Repository
{
    public sealed class SelectValueRepository : ISelectValueRepository
    {
        private readonly DagorERPEntities _context;

        public SelectValueRepository(DagorERPEntities context)
        {
            _context = context;
        }

        public IEnumerable<SelectValue> GetAll(
            Expression<Func<SelectValue, bool>> filter = null,
            Func<IQueryable<SelectValue>, IOrderedQueryable<SelectValue>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<SelectValue> query = _context.SelectValues;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            return orderBy == null ? query.ToList() : orderBy(query).ToList();
        }

        public bool Any(
           Expression<Func<SelectValue, bool>> filter = null)
        {
            return filter == null ? _context.SelectValues.Any() : _context.SelectValues.Any(filter);
        }

        public SelectValue Get(
        Expression<Func<SelectValue, bool>> filter = null,
            Func<IQueryable<SelectValue>, IOrderedQueryable<SelectValue>> orderBy = null,
            string includeProperties = "")
        {
            return GetAll(filter, orderBy, includeProperties).FirstOrDefault();
        }

        //public bool IsChamberNameAvailable(string name)
        //{
        //    return !_context.Chambers.Any(s => s.Name == name);
        //}

        public void Insert(SelectValue selectValue)
        {
            _context.SelectValues.Add(selectValue);
        }

        public void Delete(SelectValue entity)
        {
            if (_context.Entry(entity).State == EntityState.Detached)
                _context.SelectValues.Attach(entity);
            _context.SelectValues.Remove(entity);
        }
        public void Delete(int id)
        {
            var news = _context.SelectValues.Single(s => s.ID == id);
            _context.SelectValues.Remove(news);
        }

        public void Update(SelectValue entity)
        {
            if (_context.Entry(entity).State == EntityState.Detached)
                _context.SelectValues.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }
    }
}