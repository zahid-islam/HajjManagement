using DagorHajj.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DagorHajj.DAL.Hajj.Interface
{
    interface ITicketSector
    {
        IQueryable<TicketSector> GetAll();
        TicketSector GetById(int id);
        void Insert(TicketSector model);
        void Delete(TicketSector model);
        void Update(TicketSector model);
    }
}
