using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularAspNetSample.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Contacts()
        {    
            return View();
        }

        public ActionResult Sale()
        {
            return View();
        }

        public ActionResult Products()
        {
            return View();
        }

        public ActionResult Calendar()
        {
            return View();
        }

        public ActionResult Dashboard()
        {
            return View();
        }
    }
}