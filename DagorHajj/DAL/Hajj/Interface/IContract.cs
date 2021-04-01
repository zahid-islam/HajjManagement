using DagorHajj.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DagorHajj.DAL.Interface
{
    interface IContract
    {
        IQueryable<Contract> GetAll();
        Contract GetById(int id);
        void Insert(Contract model);
        void Delete(Contract model);
        void Update(Contract model);
    }
}
