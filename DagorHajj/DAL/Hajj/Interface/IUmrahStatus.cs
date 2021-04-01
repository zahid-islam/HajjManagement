using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DagorHajj.Models;

namespace DagorHajj.DAL.Interface
{
    interface IUmrahStatus
    {
        IQueryable<UmrahStatu> GetAll();
        UmrahStatu GetById(int id);
        void Insert(UmrahStatu model);
        void Delete(UmrahStatu model);
        void Update(UmrahStatu model);
    }
}
