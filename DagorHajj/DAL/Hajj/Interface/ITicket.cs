using DagorHajj.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DagorHajj.DAL.Hajj.Interface
{
    interface ITicket
    {
        IQueryable<Ticket> GetAll();
        Ticket GetById(int id);
        void Insert(Ticket model);
        void Delete(Ticket model);
        void Update(Ticket model);
    }
}
