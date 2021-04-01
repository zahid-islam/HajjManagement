using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DagorHajj.Models;
namespace DagorHajj.DAL.Interface
{
    interface IUmrah
    {
        IQueryable<Umrah> GetAll();
        Umrah GetById(int id);
        void Insert(Umrah model);
        void Delete(Umrah model);
        void Update(Umrah model);
    }
}
