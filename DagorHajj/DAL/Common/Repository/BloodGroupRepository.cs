using DagorHCS.DAL.Interfaces;
using DagorHCS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DagorHCS.DAL.Repository
{
    public class BloodGroupRepository : IBloodGroup
    {
        private DagorHCSEntities _db;

        public BloodGroupRepository(DagorHCSEntities db)
        {
            _db = db;
        }
        public IEnumerable<BloodGroup> GetAll() {
            return _db.BloodGroups;
        }

        public BloodGroup GetById(int id) {
            return _db.BloodGroups.Find(id);
        }

        public BloodGroup GetById(int? id) {
            return _db.BloodGroups.Find(id);
        }
    }
}