using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DagorHajj.Models;

namespace DagorHajj.DAL.Interfaes
{
    interface IUser
    {
        IQueryable<User> GetAll();

        // New Added GetByEmail...!
        User GetByEmail(string email);
        User GetById(int id);
        void Insert(User user);
        void Update(User user);
        void DeleteById(int id);
    }
}
