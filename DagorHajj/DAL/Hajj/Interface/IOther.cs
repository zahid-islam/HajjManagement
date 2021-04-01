using DagorHajj.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DagorHajj.DAL.Hajj.Interface
{
    interface IOther
    {
        IQueryable<Other> GetAll();
        Other GetById(int id);
        void Insert(Other model);
        void Delete(Other model);
        void Update(Other model);
    }
}
