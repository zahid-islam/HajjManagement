using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DagorHajj.Models;
namespace DagorHajj.DAL.Interface
{
    interface IGroupLeader
    {
        IQueryable<GroupLeader> GetAll();
        GroupLeader GetById(int id);
        void Insert(GroupLeader model);
        void Delete(GroupLeader model);
        void Update(GroupLeader model);
    }
}
