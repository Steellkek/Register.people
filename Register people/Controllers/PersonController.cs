using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Routing;
using Newtonsoft.Json;
using Register_people.Interface;
using Register_people.Models;

namespace Register_people.Controllers
{
    public class PersonController : Controller
    {
        private readonly IPerson _person;
        public PersonController(IPerson person)
        {
            _person = person;
        }

        [HttpGet]
        public string AllPersons()
        {
            try
            {
                var listPersons = _person.AllPersons();
                var jsonPersons = JsonConvert.SerializeObject(listPersons);
                return jsonPersons;
            }
            catch (Exception)
            {
                return (-2).ToString();
            }

        }
        
        [HttpGet]
        public int DeletePerson(int Id)
        {
            return _person.DeletePerson(Id);
        }

        [HttpPost]
        public int CreatePerson(Person person)
        {
            return _person.CreatePerson(person);
        }
        
        [HttpPost]
        public int EditPerson(Person person)
        {
            return _person.EditPerson(person);
        }
        [HttpPost]
        public string AskedPersons(PersonParameters parameters)
        {
            try
            {
                var listPersons = _person.AskedPersons(parameters);
                var jsonPersons = JsonConvert.SerializeObject(listPersons);
                return jsonPersons;
            }
            catch (Exception)
            {
                return (-2).ToString();
            }
        }

        [HttpPost]
        public string CheckPerson(Person person)
        {
            try
            {
                if (_person.CheckPerson(person))
                {
                    return 1.ToString();
                }
                else
                {
                    return (-1).ToString();
                }
            }
            catch (Exception)
            {
                return (-2).ToString();
            }
            
        }

    }
}