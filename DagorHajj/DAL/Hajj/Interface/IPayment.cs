using DagorHajj.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DagorHajj.DAL.Interface
{
    interface IPayment
    {
        IQueryable<Payment> GetAll();
        Payment GetById(int id);
        void Insert(Payment model);
        void Delete(Payment model);
        void Update(Payment model);
    }
}
