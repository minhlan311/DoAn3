using Demo2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Demo2.Controllers
{
    public class HomeController : Controller
    {
        private TrangSucEntities db = new TrangSucEntities();
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetLoaiSP()
        {
            var list = db.LoaiSPs.Select(a => new
            {
                MaLoai = a.MaLoai,
                MaLoaiCha = a.MaLoaiCha,
                TenLoai = a.TenLoai,  
                SLCon = db.LoaiSPs.Where(x=>x.MaLoaiCha == a.MaLoai).Count()
            }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSPMoi()
        {
            var list = db.SanPhams.Select(a => new
            {
                MaSP = a.MaSP,
                TenSP = a.TenSP,
                Anh = a.Anh,
                Gia = a.Gia
            }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSPXem()
        {
            var list = db.SanPhams.OrderByDescending(x=>x.Xem).Select(a => new
            {
                MaSP = a.MaSP,
                TenSP = a.TenSP,
                Anh = a.Anh,
                Gia = a.Gia
            }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}