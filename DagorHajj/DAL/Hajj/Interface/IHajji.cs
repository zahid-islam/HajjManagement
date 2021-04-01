using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DagorHajj.Models;
namespace DagorHajj.DAL.Interface
{
    interface IHajji
    {
        IQueryable<Hajji> GetAll();
        Hajji GetById(int id);
        void Insert(Hajji model);
        void Delete(Hajji model);
        void Update(Hajji model);
    }
}
