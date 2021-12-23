using Demo2.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Demo2.Controllers
{
    public class AdminController : Controller
    {
        private TrangSucEntities db = new TrangSucEntities();
        public ActionResult Index()
        {
            var user = (User)Session["user"];
            if (user == null)
            {
                return RedirectToAction("Login", "Admin");
            }
            else
            {
                return View();
            }
        }
        public ActionResult SanPham()
        {
            var user = (User)Session["user"];
            if (user == null)
            {
                return RedirectToAction("Login", "Admin");
            }
            else
            {
                return View();
            }
        }
        
        public ActionResult test()
        {
            
           
                return View();
          
        }
        public ActionResult LogOut()
        {
            Session["user"] = null;
            return RedirectToAction("Login", "Admin");
        }
        public ActionResult Login()
        {
            return View();
        }
        public JsonResult AjaxLogin(string TaiKhoan, string MatKhau)
        {
            try
            {
                var user = db.Users.SingleOrDefault(x => x.TaiKhoan == TaiKhoan && x.MatKhau == MatKhau);
                if (user != null)
                {
                    Session["user"] = user;
                }
                return Json(new { ok = 1 }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { ok = 0 }, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult GetDanhSach(int page, int limit)
        {
            var user = (User)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                if (page == 0)
                    page = 1;

                if (limit == 0)
                    limit = int.MaxValue;

                var skip = (page - 1) * limit;

                var list = db.SanPhams.Select(a => new
                {
                    MaSP = a.MaSP,
                    TenSP = a.TenSP,
                    Anh = a.Anh,
                    Gia = a.Gia
                }).OrderBy(x => x.TenSP).Skip(skip).Take(limit).ToList();
                var total = db.SanPhams.Count();
                return Json(new { list = list, total = total }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult Upload()
        {
            try
            {
                HttpPostedFileBase file = Request.Files[0];
                if (file != null)
                {
                    string path = Server.MapPath("~") + "assets\\images\\product\\medium-size";
                    string fileName = file.FileName;
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    string fullPath = path + "\\" + fileName;
                    file.SaveAs(fullPath);
                    return Json("assets/images/product/medium-size/" + fileName, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult AjaxAddSanPham(SanPham sp)
        {
            var user = (User)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                { 
                    db.SanPhams.Add(sp);
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch(Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }

        public JsonResult AjaxUpdateSanPham(SanPham sp)
        {
            var user = (User)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    var obj = db.SanPhams.SingleOrDefault(x => x.MaSP == sp.MaSP);
                    obj.Gia = sp.Gia;
                    obj.TenSP = sp.TenSP;
                    obj.Anh = sp.Anh;
                    obj.MaLoai = sp.MaLoai;
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }

        public JsonResult AjaxXoaSanPham(SanPham sp)
        {
            var user = (User)Session["user"];
            if (user == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    var obj = db.SanPhams.SingleOrDefault(x => x.MaSP == sp.MaSP);
                    db.SanPhams.Remove(obj);
                    db.SaveChanges();
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

        }


    }
}