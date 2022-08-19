using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Web.Mvc;
using FastReport;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using Register_people.Interface;
using Register_people.Models;
namespace Register_people.Controllers
{
    public class ReportController : Controller
    {
        private readonly IReport _report;

        public ReportController(IReport report)
        {
            _report = report;
        }

        [HttpPost]
        public FileStreamResult Generate(string persons)
        {
            try
            {
                List<Person> ListPersons = JsonConvert.DeserializeObject<List<Person>>(persons);
                return _report.Generate(ListPersons);

            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}