using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularAspNetSample.Web
{
    public static class Extension
    {
        public static bool IsInt(this string s)
        {
            int i;
            return int.TryParse(s, out i);
        }
    }

    public class RequestHelpers
    {
        public static int? ObterInteiroOuNulo(string strValue)
        {
            int? intValue = null;

            if (!string.IsNullOrEmpty(strValue) && strValue != "0" && strValue.IsInt())
            {
                intValue = Convert.ToInt32(strValue);
            }

            return intValue;
        }

        public static int? ObterInteiroZeroOuNulo(string strValue)
        {
            int? intValue = null;

            if (!string.IsNullOrEmpty(strValue) && strValue.IsInt())
            {
                intValue = Convert.ToInt32(strValue);
            }

            return intValue;
        }

        public static System.DateTime? ObterDataOuNulo(string strValue)
        {
            System.DateTime? datValue = null;


            if (!string.IsNullOrEmpty(strValue))
            {
                try
                {
                    datValue = Convert.ToDateTime(strValue);
                }
                catch
                {
                }
            }

            return datValue;
        }

        public static TimeSpan? ObterHoraOuNulo(string strValue)
        {
            TimeSpan? tsValue = null;

            if (!string.IsNullOrEmpty(strValue))
            {

                strValue = strValue.Replace(":", "");

                try
                {
                    if (strValue.IsInt())
                        tsValue = new TimeSpan(int.Parse(strValue.Substring(0, 2)), int.Parse(strValue.Substring(2, 2)), 0);
                }
                catch (Exception e)
                {
                }
            }

            return tsValue;
        }

        public static bool? ObterBooleanOuNulo(string strValue)
        {
            bool? value = null;

            try
            {
                value = bool.Parse(strValue);
            }
            catch
            {
            }

            return value;
        }
    }
}