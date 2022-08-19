using System;
using System.Collections.Generic;
using Register_people.Models;

namespace Register_people.Interface
{
    public interface IPerson
    {
        /// <summary>
        /// Выдает всех граждан
        /// </summary>
        List<Person> AllPersons();
        /// <summary>
        /// Выдает запрашиваемых граждан
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns>список из граждан</returns>
        IEnumerable<Person> AskedPersons(PersonParameters parameters);
        /// <summary>
        /// удаляет гражданина из бд
        /// </summary>
        /// <param name="id">айди в бд</param>
        /// <returns></returns>
        int DeletePerson(int id);
        /// <summary>
        /// изменяет данные о гражданине в бд
        /// </summary>
        /// <param name="pers"></param>
        /// <returns></returns>
        int EditPerson(Person pers);
        /// <summary>
        /// создает гражданина в бд
        /// </summary>
        /// <param name="pers"></param>
        /// <returns></returns>
        int CreatePerson(Person pers);
        /// <summary>
        /// проверяет наличие данных о гражданине в бд
        /// </summary>
        /// <param name="pers"></param>
        /// <returns></returns>
        bool CheckPerson(Person pers);
    }
}
