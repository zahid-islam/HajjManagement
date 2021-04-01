using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DagorHajj.Models;

namespace DagorHajj.DAL.Interfaces
{
    interface ISupplier
    {
        IEnumerable<Supplier> GetAll();
        Supplier GetById(int id);
        void Insert(Supplier phrSupplier);
        void Update(Supplier phrSupplier);
        void DeleteById(int id); 
    }
}
