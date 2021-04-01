using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DagorHCS.Models;

namespace DagorHCS.DAL.Interfaces
{
    interface IBranch
    {
        IEnumerable<Branch> GetAll();
        Branch GetById(int id);
        void Insert(Branch branch);
        void Update(Branch branch);
        void DeleteById(int id);
    }
}
