﻿using System;

namespace Register_people.Models
{
    public class Person
    {
        public int? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Patronymic { get; set; }
        public DateTime Birthdate { get; set; }

    }
}