using Ninject.Modules;
using Register_people.Interface;
using Register_people.Repository;

namespace Register_people.Util
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