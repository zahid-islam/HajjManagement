using DagorHCS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DagorHCS.DAL.Interfaces
{
    public interface IBloodGroup
    {
        IEnumerable<BloodGroup> GetAll();

        BloodGroup GetById(int id);
    }
}