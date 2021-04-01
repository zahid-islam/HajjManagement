using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHajj.DAL.Interface;
using DagorHajj.Models;
using System.Data.Entity;

namespace DagorHajj.DAL.Repository
{
    public class GroupLeaderRepository : IGroupLeader
    {
        private readonly DagorHajjEntities _context;

        public GroupLeaderRepository(DagorHajjEntities _db)
        {
            this._context = _db;
        }
        public void Delete(GroupLeader model)
        {
            throw new NotImplementedException();
        }

        public IQueryable<GroupLeader> GetAll()
        {
            return _context.GroupLeaders;
        }

        public GroupLeader GetById(int id)
        {
            //_context.Configuration.ProxyCreationEnabled = false;
            return _context.GroupLeaders.Find(id);
        }

        public void Insert(GroupLeader model)
        {
            _context.GroupLeaders.Add(model);
        }

        public void Update(GroupLeader model)
        {
            if (_context.Entry(model).State == EntityState.Detached)
            {
                _context.GroupLeaders.Attach(model);
                _context.Entry(model).State = EntityState.Modified;
            }
        }
    }
}