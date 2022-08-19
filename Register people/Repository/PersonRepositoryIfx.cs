using System;
using System.Collections.Generic;
using System.Configuration;
using IBM.Data.Informix;
using Register_people.Interface;
using Register_people.Models;
using System.Globalization;

namespace Register_people.Repository
{
    public class PersonRepositoryIfx : IPerson
    {
        /// <summary>
        /// преобразует данные из бд в список граждан
        /// </summary>
        /// <param name="cmd">команда insert</param>
        /// <returns></returns>
        private List<Person> FromDbToList(string cmd)
        {
            List<Person> list = new List<Person>();
            using (var db = new IfxConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString))
            {
                db.Open();
                IfxCommand command = new IfxCommand(cmd, db);
                using (IfxDataReader reader = command.ExecuteReader())
                {
                    for (; reader.Read();)
                    {
                        var person = new Person();
                        person.Id = (int)reader.GetValue(0);
                        person.FirstName = (string)reader.GetValue(1);
                        person.LastName = (string)reader.GetValue(2);
                        person.Patronymic = (string)reader.GetValue(3);
                        person.Birthdate = (DateTime)reader.GetValue(4);
                        list.Add(person);
                    }
                }
               
            }

            return list;
        }
        public List<Person> AllPersons()
        {
            string cmd = "Select * from persons";
            return FromDbToList(cmd);
        }

        public IEnumerable<Person> AskedPersons(PersonParameters parameters)
        {
            var stringCommand = "select * from persons where";
            
            if (!string.IsNullOrEmpty(parameters.FirstName))
            {
                stringCommand += $" firstname MATCHES '{parameters.FirstName.ToUpper()}' and";
            }
            if (!string.IsNullOrEmpty(parameters.LastName))
            {
                stringCommand += $" lastname MATCHES '{parameters.LastName.ToUpper()}' and";
            }
            if(!string.IsNullOrEmpty(parameters.Patronymic))
            {
                stringCommand += $" patronymic MATCHES '{parameters.Patronymic.ToUpper()}' and";
            }
            if (!string.IsNullOrEmpty(parameters.Start.ToString()))
            {
                stringCommand += $" birthdate >= '{Convert.ToDateTime(parameters.Start).Date:d}' and";
            }
            if (!string.IsNullOrEmpty(parameters.End.ToString()))
            {
                stringCommand += $" birthdate <= '{Convert.ToDateTime(parameters.End).Date:d}' and";
            }
            stringCommand = stringCommand.Remove(stringCommand.Length - 3);
            return FromDbToList(stringCommand);
        }

        public int CreatePerson(Person pers)
        {
            try
            {
                using (var db = new IfxConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString))
                {
                    db.Open();
                    IfxCommand commandInsert = new IfxCommand($"insert into persons (firstname, lastname, patronymic, birthdate) values(" +
                                                              $"'{pers.FirstName.ToUpper()}', '{pers.LastName.ToUpper()}', '{pers.Patronymic.ToUpper()}', " +
                                                              $"'{pers.Birthdate.Date.ToString("d")}'); ", db);
                    IfxCommand commandSelect = new IfxCommand("select dbinfo('sqlca.sqlerrd1') from  systables where tabid=1 ", db);
                    commandInsert.ExecuteNonQuery();
                    var reader =commandSelect.ExecuteReader();
                    reader.Read();
                    return (int)reader.GetValue(0);
                }
            }
            catch (Exception )
            {
                return -2;
            }
        }

        public bool CheckPerson(Person pers)
        {
            using (var db = new IfxConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString))
            {
                db.Open();
                IfxCommand commandCheck = new IfxCommand($"select first 1 id from persons where firstname='{pers.FirstName}' and lastname='{pers.LastName}' and patronymic='{pers.Patronymic}' and birthdate='{Convert.ToDateTime(pers.Birthdate).Date:d}'", db);

                var reader = commandCheck.ExecuteReader();
                if (reader.Read())
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }


        }

        public int DeletePerson(int Id)
        {
            try
            {
                using (var db = new IfxConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString))
                {
                    db.Open();
                    IfxCommand command = new IfxCommand($"delete from persons where id = {Id}; ", db);
                    var count = command.ExecuteNonQuery();
                    if (count == 0)
                    {
                        return -1;
                    }
                }

            }
            catch (Exception)
            {
                return -2;
            }


            return 2;
        }

        public int EditPerson(Person pers)
        {
            try
            {
                using (var db = new IfxConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString))
                {
                    db.Open();
                    IfxCommand commandUpdate = new IfxCommand("Update persons set (firstname, lastname, patronymic, birthdate) = (" +
                                                              $"'{pers.FirstName.ToUpper()}', '{pers.LastName.ToUpper()}', '{pers.Patronymic.ToUpper()}', " +
                                                              $"'{pers.Birthdate.Date.ToString("d")}') where id= {pers.Id};", db);
                    var count = commandUpdate.ExecuteNonQuery();
                    if (count == 0)
                    {
                        return -1;
                    }
                }

            }
            catch (Exception)
            {
                return -2;
            }

            return 2;
        }



    }
}