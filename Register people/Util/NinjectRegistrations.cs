using Ninject.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Register_people.Interface;
using Register_people.Repository;

namespace WebApplication1.Util
{
    public class NinjectRegistrations : NinjectModule
    {
        public override void Load()
        {
            Bind<IPerson>().To<PersonRepositoryIfx>();
            Bind<IReport>().To<FastReportPersons>();
        }
    }
}