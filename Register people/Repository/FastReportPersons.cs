using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Text;
using System.Web.Mvc;
using FastReport;
using Newtonsoft.Json;
using Register_people.Interface;
using Register_people.Models;
using System.Web;

namespace Register_people.Repository
{
    public class FastReportPersons:IReport
    {
        public FileStreamResult Generate(List<Person> listPersons)
        {
            FastReport.Utils.Config.WebMode = true;
            using (Report rep = new Report())
            {
                rep.Load(HttpContext.Current.Server.MapPath(ConfigurationManager.ConnectionStrings["ReportString"].ConnectionString));
                rep.RegisterData(listPersons, "PersonsRef");
                if (rep.Report.Prepare())
                {
                    using (FastReport.Export.PdfSimple.PDFSimpleExport pdfExport = new FastReport.Export.PdfSimple.PDFSimpleExport())
                    {
                        pdfExport.ShowProgress = false;
                        pdfExport.Subject = "Subject Report";
                        pdfExport.Title = "Register sitizens";
                        MemoryStream ms = new MemoryStream();
                        rep.Export(pdfExport, ms);
                        ms.Position = 0;
                        return new FileStreamResult(ms, "application/pdf");
                    }
                }
                else
                {
                    return null;
                }
            }
        }
    }
}