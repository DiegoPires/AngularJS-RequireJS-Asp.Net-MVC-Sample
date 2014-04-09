
using AngularAspNetSample.Core;
using AngularAspNetSample.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace AngularAspNetSample
{
    public class CalendarioController : ApiController
    {
        public class Calendar
        {
            string id;
            string title;
            string description;
            string url;
            string Class;
            string stringstart;
            string end;
        }

        [HttpGet]
        [ActionName("Carregar")]
        public HttpResponseMessage Carregar()
        {
            HttpResponseMessage result = null;


            NameValueCollection data = HttpUtility.ParseQueryString(Request.RequestUri.Query);

            // Parametros da pesquisa
            DateTime? dataEntrega = RequestHelpers.ObterDataOuNulo(data["Data"]);
            if (!dataEntrega.HasValue)
                dataEntrega = DateTime.Now;

            //List<Entrega> entregas = _repoEntrega.PesquisarEntregas(null, null, null, dataEntrega);

            //dynamic lst = entregas.Select(x => new
            //{
            //    id = x.idEntrega,
            //    title = x.Projeto.sigla,
            //    description = x.descricaoAtividade,
            //    url = "#",
            //    Class = "event-warning",
            //    start = (x.dataEntregaPrevista.Value - new DateTime(1969, 12, 31)).TotalMilliseconds,
            //    end = (x.dataEntregaPrevista.Value - new DateTime(1969, 12, 31)).TotalMilliseconds
            //}).ToList();

            JObject obj = new JObject();
            //obj.Add("entregas", JsonConvert.SerializeObject(entregas));
            //obj.Add("calendar", JsonConvert.SerializeObject(lst));

            result = Request.CreateResponse(HttpStatusCode.OK, obj);


            return result;
        }
    }
}
