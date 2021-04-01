using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DagorHajj.Models;

namespace DagorHajj.DAL.Interface
{
    interface IHajjiStatus
    {
        IQueryable<HajjiStatu> GetAll();
        HajjiStatu GetById(int id);
        void Insert(HajjiStatu model);
        void Delete(HajjiStatu model);
        void Update(HajjiStatu model);
    }
}
