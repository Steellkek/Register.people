using System.Collections.Generic;
using System.Web.Mvc;
using Register_people.Models;

namespace Register_people.Interface
{
    public interface IReport
    {
        /// <summary>
        /// генерирует отчет по списку с сайта
        /// </summary>
        /// <param name="persons">список из граждан</param>
        /// <returns>файл с отчетом</returns>
        FileStreamResult Generate(List<Person> persons);
    }
}