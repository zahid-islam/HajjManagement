using System;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using DagorHajj.DAL;
using DagorHajj.Utility;
using DagorHajj.ViewModels;
using System.IO;
using System.Reflection;
using System.Text;

namespace DagorHajj.Controllers
{
    public class AccountController : Controller
    {
        private readonly UnitOfWork _unitOfWork  = new UnitOfWork();

        //
        // GET: /Account/

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet, OutputCache(NoStore = true, Duration = 1)]
        public ActionResult LogIn()
        {
            try
            {
                //Response.Cache.SetCacheability(HttpCacheability.NoCache);
                //Response.Cache.SetExpires(DateTime.UtcNow.AddHours(-1));
                //Response.Cache.SetNoStore();

                if (User.Identity.IsAuthenticated)
                {
                    return RedirectToAction("Index", "Home");
                }

                return View();
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("LoginErro", ex.Message);
                return View("Error");
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogIn(UserViewModel user, string returnUrl)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var foundUser = _unitOfWork.UserRepository.GetAll().FirstOrDefault(u => u.Email == user.UserID && u.Password == user.Password);
                    if (foundUser == null)
                    {
                        ViewBag.ErrorMessage = "Wrong User ID or Password. Please try again with right credentials.";
                        ModelState.Remove("Password");
                        return View(user);
                    }

                    if (!foundUser.IsActive)
                    {
                        ViewBag.ErrorMessage = "This account has been expired. Please contact the system administrator.";
                        ModelState.Remove("Password");
                        return View(user);
                    }

                    //set timeout for this login
                    var timeOut = 480;        //office duration = 8 hours

                    //for demo users update login information

                    foundUser.LastLoggedInDateTime = DateTime.Now;      //record the last login timestamp
                    foundUser.LoginCount += 1;  //increase the login count

                    //update user info on the basis of login system
                    if (foundUser.Role.Name == "Demo User")
                    {
                        //disable user if it reaches number of allowed logins
                        if (foundUser.LoginCount >= foundUser.AllowedNoOfLogins)
                        {
                            foundUser.IsActive = false;
                        }
                    }

                    _unitOfWork.UserRepository.Update(foundUser);
                    _unitOfWork.Save();

                    //calculate the allowed minutes for timeout
                    var loginTimeoutDeactive = foundUser.Role.Name == "Admin"
                        && foundUser.AllowedLoginHours == 0
                        && foundUser.AllowedLoginMinutes == 0;
                    if (foundUser.Role.Name == "Demo User")         //old condition: if(!loginTimeoutDeactive)
                    {
                        //this rule will be effective only if the allowed login our or allowed login minutes are set
                        timeOut = foundUser.AllowedLoginHours * 60 + foundUser.AllowedLoginMinutes;
                    }

                    var authTicket = new FormsAuthenticationTicket(1, foundUser.Id.ToString(), DateTime.Now,
                        DateTime.Now.AddMinutes(timeOut), user.RememberMe,
                        foundUser.Email, FormsAuthentication.FormsCookiePath);

                    var encryptedTicket = FormsAuthentication.Encrypt(authTicket);
                    var authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket)
                    {
                        HttpOnly = true
                    };
                    Response.Cookies.Add(authCookie);
                    
                    //store user data in userInfo cookie
                    var userInfoCookie = Request.Cookies["userInfo"];
                    if (userInfoCookie == null)
                    {
                        //no cookie found, create it
                        userInfoCookie = new HttpCookie("userInfo");
                        userInfoCookie.Values.Add("Email", user.UserID);
                    }
                    else
                    {
                        // update the cookie values
                        userInfoCookie.Values["Email"] = user.UserID;
                    }
                    // update the expiration timestamp
                    userInfoCookie.Expires = DateTime.Now.AddMinutes(timeOut);

                    // create/overwrite the cookie
                    Response.Cookies.Add(userInfoCookie);

                    if (Url.IsLocalUrl(returnUrl) && returnUrl.Length > 1 && returnUrl.StartsWith("/")
                        && !returnUrl.StartsWith("//") && !returnUrl.StartsWith("/\\"))
                    {
                        return Redirect(returnUrl);
                    }
                    return RedirectToAction("Index", "Home");
                }

                ModelState.Remove("Password");
                return View(user);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("LoginErro", ex.Message);
                ViewBag.ErrorMessage = ex.Message;
                return View("Error");
            }
        }


        //[HttpPost]
        //public ActionResult ChangePassword(string newPassword, string oldPassword)
        //{
        //    try
        //    {
        //        var adminSystemUser =
        //            _db.Users.SingleOrDefault(a => a.Email == User.Identity.Name && a.Password == oldPassword);
        //        if (adminSystemUser == null)
        //        {
        //            return Json(new { Success = true, Message = GlobalVariables.OldPasswordNotExistMessage }, JsonRequestBehavior.AllowGet);
        //        }

        //        adminSystemUser.Password = newPassword;
        //        _db.ObjectStateManager.ChangeObjectState(adminSystemUser, EntityState.Modified);
        //        _db.SaveChanges();

        //        var returnResult = new {Success = true, Message = GlobalVariables.PasswordChangedMessage};
        //        return Json(returnResult, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        var returnResult = new { Success = false, Message = GlobalVariables.ErrorPrefixMessage + ex.Message };
        //        return Json(returnResult, JsonRequestBehavior.AllowGet);
        //    }
        //}
        
        //[NonAction]
        //public UserViewModel ValidateUser(UserViewModel user)
        //{
        //    return _db.Users.SingleOrDefault(usr => usr.UserId == user.UserName && usr.Password == user.Password);
        //}

        //
        // GET: /User/LogOff

        [HttpGet]
        public ActionResult LogOff()
        {
            ExpireCookie(".ASPXAUTH");
            ExpireCookie("userInfo");
            Session.Clear();
            Session.Abandon();

            var authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
            if (authCookie != null)
            {
                authCookie.Expires = DateTime.Now.AddDays(-1);
            }

            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetExpires(DateTime.Now);

            FormsAuthentication.SignOut();

            return RedirectToAction("LogIn", "Account");
        }

        [NonAction]
        private void ExpireCookie(string cookieName)
        {
            if (Request.Cookies[cookieName] == null) return;
            var cookie = new HttpCookie(cookieName) { Expires = DateTime.Now.AddDays(-1d) };
            Response.Cookies.Add(cookie);
        }
    }
}
