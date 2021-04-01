using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DagorHajj.Models;
namespace DagorHajj.DAL.Interface
{
    interface ITransactionType
    {
        IQueryable<TransactionType> GetAll();
        TransactionType GetById(int id);
        void Insert(TransactionType model);
        void Delete(TransactionType model);
        void Update(TransactionType model);
    }
}