using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHajj.Models;
using System.Data.Entity;
using DagorHajj.DAL.Interface;

namespace DagorHajj.DAL.Repository
{
    public class SettingsRepository : ISettings
    {
        private readonly DagorHajjEntities _db;
        public SettingsRepository(DagorHajjEntities db)
        {
            this._db = db;
        }
        public void DeleteById(int id)
        {
            Setting setting = _db.Settings.Find(id);
            _db.Settings.Remove(setting);
        }
        public IQueryable<Setting> GetAll()
        {
            return _db.Settings;
        }

        public Setting GetById(int id)
        {
            return _db.Settings.Find(id);
        }

        public void Insert(Setting setting)
        {
            _db.Settings.Add(setting);
        }

        public void Update(Setting setting)
        {
            _db.Entry(setting).State = EntityState.Modified;
        }
    }
}