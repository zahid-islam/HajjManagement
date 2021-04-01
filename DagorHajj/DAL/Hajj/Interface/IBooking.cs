using DagorHajj.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DagorHajj.DAL.Interface
{
    interface IBooking
    {
        IQueryable<Booking> GetAll();
        Booking GetById(int id);
        void Insert(Booking model);
        void Delete(Booking model);
        void Update(Booking model);
    }
}
