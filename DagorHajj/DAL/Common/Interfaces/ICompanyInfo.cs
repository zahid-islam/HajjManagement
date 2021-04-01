using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHCS.Models;

namespace DagorHCS.DAL.Interfaces
{
    interface ICompanyInfo
    {
        IEnumerable<CompanyInfo> GetAll();
        CompanyInfo GetById(int id);
        void Insert(CompanyInfo companyInfo);
        void Update(CompanyInfo companyInfo);
        void DeleteById(int id);
    }
}
