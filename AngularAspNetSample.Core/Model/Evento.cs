using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularAspNetSample.Core.Model
{
    public class Evento : Entidade
    {
        public DateTime Data { get; set; }
        public string Descricao { get; set; }
    }
}
