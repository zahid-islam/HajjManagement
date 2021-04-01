using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DagorHajj.Models;

namespace DagorHajj.DAL.Interface
{
    interface IMuharram
    {
        IQueryable<MuharramRelation> GetAll();
        MuharramRelation GetById(int id);
        void Insert(MuharramRelation model);
        void Delete(MuharramRelation model);
        void Update(MuharramRelation model);
    }
}
