using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DagorHCS.Models;

namespace DagorHCS.DAL.Interfaces
{
    interface IUserBranch
    {
        IEnumerable<UserBranch> GetAll();
        UserBranch GetById(int id);
        void Insert(UserBranch userBranch);
        void Update(UserBranch userBranch);
        void DeleteById(int id);
    }
}
