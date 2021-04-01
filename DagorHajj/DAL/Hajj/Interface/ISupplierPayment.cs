using DagorHajj.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DagorHajj.DAL.Interface
{
    interface ISupplierPayment
    {
        IQueryable<SupplierPayment> GetAll();
        SupplierPayment GetById(int id);
        void Insert(SupplierPayment model);
        void Delete(SupplierPayment model);
        void Update(SupplierPayment model);
    }
}
