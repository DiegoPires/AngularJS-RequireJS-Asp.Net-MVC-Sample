using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularAspNetSample.Core
{
    public static class Extension
    {
        public static bool IsInt(this string s)
        {
            int i;
            return int.TryParse(s, out i);
        }
    }
}
