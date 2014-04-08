
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
    public class ContatoController : ApiController
    {

        public ContatoController()
        {

        }

        #region Pesquisar

        [HttpGet]
        [ActionName("CarregarPesquisa")]
        public HttpResponseMessage CarregarPesquisa()
        {
            HttpResponseMessage result = null;

            //var Contatos = _repository.ListarContatos();

            //JObject obj = new JObject();
            //obj.Add("Contatos", JsonConvert.SerializeObject(Contatos));

            result = Request.CreateResponse(HttpStatusCode.OK);


            return result;
        }

        #endregion

        #region Manter

        [HttpGet]
        [ActionName("CarregarManter")]
        public HttpResponseMessage CarregarManter()
        {
            HttpResponseMessage result = null;

            JObject obj = new JObject();
            //obj.Add("Contato", JsonConvert.SerializeObject(entContato));

            result = Request.CreateResponse(HttpStatusCode.OK, obj);

            return result;
        }

        [HttpPost]
        [ActionName("Salvar")]
        public HttpResponseMessage Salvar(JObject json)
        {
            HttpResponseMessage result = null;

            //Contato Contato;
            //try
            //{
            //    Contato = JsonConvert.DeserializeObject(json["Contato"].ToString(), typeof(Contato)) as Contato;
            //}
            //catch (Newtonsoft.Json.JsonReaderException ex)
            //{
            //    result = Request.CreateResponse(HttpStatusCode.BadRequest, "Objeto inválido, certifique-se de ter preenchido o formulário corretamente.");
            //    return result;
            //}

            //ResultadoExecucao<Contato> resultado = _repository.Salvar(Contato);
            //if (!resultado.CancelaExecucao)
            //{
            JObject obj = new JObject();
            //obj.Add("Contato", JsonConvert.SerializeObject(resultado.Retorno));
            //obj.Add("mensagem", resultado.Mensagem);

            result = Request.CreateResponse(HttpStatusCode.OK, obj);
            //}
            //else if (resultado.Excecao == null)
            //    result = Request.CreateResponse(HttpStatusCode.BadRequest, resultado.Mensagem);
            //else
            //    result = Request.CreateResponse(HttpStatusCode.InternalServerError, resultado.Mensagem);

            return result;
        }

        #endregion

    }
}
