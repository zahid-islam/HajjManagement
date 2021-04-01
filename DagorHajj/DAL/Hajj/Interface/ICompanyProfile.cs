using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DagorHajj.Models;
namespace DagorHajj.DAL.Interface
{
    interface ICompanyProfile
    {
        IQueryable<CompanyProfile> GetAll();
        CompanyProfile GetById(int id);
        void Insert(CompanyProfile model);
        void Delete(CompanyProfile model);
        void Update(CompanyProfile model);
    }
}
