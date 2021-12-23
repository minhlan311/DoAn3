using Demo2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Demo2.Controllers
{
    public class SanPhamController : Controller
    {
        private TrangSucEntities db = new TrangSucEntities();
        public ActionResult DanhSach(string MaLoai)
        {
            ViewBag.MaLoai = MaLoai;
            return View();
        }
        // GET: SanPham
        public ActionResult Chitiet(string MaSP)
        {
            ViewBag.MaSP = MaSP;
            return View();
        }
        public JsonResult GetChiTiet(int MaSP)
        {
            var obj = db.SanPhams.Select(a => new
            {
                MaSP = a.MaSP,
                TenSP = a.TenSP,
                Anh = a.Anh,
                Gia = a.Gia,
                listSPXemNHieu = db.SanPhams.Select(b=> new
                {
                    MaLoai = b.MaLoai,
                    MaSP = b.MaSP,
                    TenSP = b.TenSP,
                    Anh = b.Anh,
                    Gia = b.Gia,
                    Xem = b.Xem
                }).Where(x => x.MaLoai == a.MaLoai).OrderByDescending(x=>x.Xem).Take(10).ToList(),
                listSPCungLoai = db.SanPhams.Select(b => new
                {
                    MaLoai = b.MaLoai,
                    MaSP = b.MaSP,
                    TenSP = b.TenSP,
                    Anh = b.Anh,
                    Gia = b.Gia,
                    Xem = b.Xem
                }).Where(x=>x.MaLoai == a.MaLoai).OrderByDescending(x=>x.MaSP).Take(10).ToList()
            }).SingleOrDefault(x => x.MaSP == MaSP);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDanhSach(int MaLoai,int page, int limit)
        {
            if (page == 0)
                page = 1;

            if (limit == 0)
                limit = int.MaxValue;

            var skip = (page - 1) * limit;

            var list = db.SanPhams.Where(x => x.MaLoai == MaLoai).Select(a => new
            {
                MaSP = a.MaSP,
                TenSP = a.TenSP,
                Anh = a.Anh,
                Gia = a.Gia
            }).OrderBy(x=>x.TenSP).Skip(skip).Take(limit).ToList();
            var total = db.SanPhams.Where(x => x.MaLoai == MaLoai).Count();
            return Json(new { list = list, total = total }, JsonRequestBehavior.AllowGet);
        }
    }
}