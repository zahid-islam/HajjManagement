using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHajj.Models;

namespace DagorHajj.DAL.Interface
{
    interface ISettings
    {
        IQueryable<Setting> GetAll();
        Setting GetById(int id);
        void Insert(Setting setting);
        void DeleteById(int id);
        void Update(Setting setting);
    }
}