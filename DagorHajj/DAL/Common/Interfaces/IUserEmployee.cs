using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHCS.Models;
namespace DagorHCS.Interfaces
{
    public interface IUserEmployee
    {
        IQueryable<UserEmployee> GetAll();
        UserEmployee GetById(int id);
        void Insert(UserEmployee enitty);
        void Update(UserEmployee entity);
        void Delete(int id);
        void Delete(UserEmployee entity);
    }
}