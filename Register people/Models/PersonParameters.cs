using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Register_people.Models
{
    public class PersonParameters
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Patronymic { get; set; }
        public DateTime? Start { get; set; } 
        public DateTime? End { get; set; } 
    }
}