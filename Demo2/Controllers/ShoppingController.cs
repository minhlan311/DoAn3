using Demo2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Demo2.Controllers
{
    public class ShoppingController : Controller
    {
        private TrangSucEntities db = new TrangSucEntities();
        // GET: Shopping
        public ActionResult Cart()
        {
            return View();
        }
        public ActionResult CheckOut()
        {
            return View();
        }
        public JsonResult CreateHoaDon(HoaDon model)
        {
            try
            {
                model.MaHoaDon = Guid.NewGuid().ToString();
                if(model.ChiTietHoaDons.Count>0)
                {
                    foreach(var item in model.ChiTietHoaDons)
                    {
                        item.MaHoaDon = model.MaHoaDon;
                    }
                }
                db.HoaDons.Add(model);
                db.SaveChanges();
                return Json(new { ok = 1 }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { ok = 0 }, JsonRequestBehavior.AllowGet);
            }

        }
    }
}