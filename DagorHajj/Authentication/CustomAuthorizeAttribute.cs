using System;
using System.Collections.Generic;
using System.Web;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;

namespace DagorHajj
{
    public class SafelyAuthorizeAttribute : AuthorizeAttribute
    {
        //private Modules Module { get; set; }
        //private Functions Rights { get; set; }

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            //check whether the licence is expired or not
            //CheckRegistrationExpiry(filterContext);

            //return;

            if (!filterContext.RequestContext.HttpContext.User.Identity.IsAuthenticated)
            {
                var a = UrlParameter.Optional;

                //if Url is not empty then
                if(filterContext.HttpContext.Request.Url == null)
                {
                    filterContext.Result =
                       new RedirectToRouteResult(
                           //new RouteValueDictionary(new { action = "LogOn", controller = "UserManager" }));
                           new RouteValueDictionary(new { action = "Login", controller = "Account", area = "" }));
                    return;
                }

                //if Url is not empty then
                var returnUrl = filterContext.HttpContext.Request.Url.PathAndQuery;
                filterContext.Result =
                       new RedirectToRouteResult(
                           //new RouteValueDictionary(new { action = "LogOn", controller = "UserManager", ReturnUrl = returnUrl }));
                           new RouteValueDictionary(new { action = "Login", controller = "Account", area = "", ReturnUrl = returnUrl }));
                return;
            }

            var area = filterContext.RouteData.DataTokens.ContainsKey("area")
                ? filterContext.RouteData.DataTokens["area"].ToString() : "";
            var controllerName = string.Empty;
            var actionName = string.Empty;
            var routeValues = filterContext.RouteData.Values;            
            
            if (routeValues != null)
            {
                if (routeValues.ContainsKey("action"))
                {
                    actionName = filterContext.RouteData.Values["action"].ToString();

                    var actionCookie = filterContext.HttpContext.Request.Cookies["ActionName"];
                    if (actionCookie == null)
                    {
                        actionCookie = new HttpCookie("ActionName", actionName) { Expires = DateTime.Now.AddMinutes(20) };
                        filterContext.HttpContext.Response.Cookies.Add(actionCookie);
                    }
                }
                if (routeValues.ContainsKey("controller"))
                {
                    controllerName = filterContext.RouteData.Values["controller"].ToString();
                }
            }
            
            if (filterContext.Result is HttpUnauthorizedResult)
            {

                if (controllerName.ToLower() == "home" || controllerName.ToLower() == "ResultSheet")
                    filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(
                                                                         new
                                                                         {
                                                                             action = actionName,
                                                                             controller = controllerName
                                                                         }));
            }

            base.OnAuthorization(filterContext);


            //var userId = filterContext.RequestContext.HttpContext.User.Identity.Name;
            //var userRole = ((AuthenticationProjectPrincipal)filterContext.RequestContext.HttpContext.User).UserData.UserRole;
            //if (string.IsNullOrEmpty(userId))
            //    return;

            var userId = Convert.ToInt32(filterContext.RequestContext.HttpContext.User.Identity.Name);
            var userEmail = string.Empty;
            using (var db = new Models.DagorHajjEntities())
            {
                var user = db.Users.Find(userId);
                if (user != null)
                {
                    userEmail = user.Email;
                }
                if (user.Role.Name == "Super Admin" || user.Role.Name == "Admin")
                {
                    return;
                }
            }

            using (var db = new Models.DagorHajjEntities())
            {
                var privilege = db.AdminSystemUserDetails
                    .FirstOrDefault(x => x.AdminSystemUser.UserId == userId && x.ModuleName == area && x.ControllerName == controllerName);
                if (privilege == null)
                {
                    CloseConnection(filterContext);
                }
                else
                {
                    if (actionName == "")
                    {

                    }
                    switch (actionName.ToLower())
                    {
                        case "":
                        case "index":
                            if (!privilege.ListView) CloseConnection(filterContext);
                            break;
                        case "create":
                            if (!privilege.Create) CloseConnection(filterContext);
                            break;
                        case "edit":
                            if (!privilege.Edit) CloseConnection(filterContext);
                            break;
                        case "reportpreview":
                            if (!privilege.ReportPreview) CloseConnection(filterContext);
                            break;
                        //default:
                        //    CloseConnection(filterContext);
                        //    break;
                    }
                }
            }

            ////convert all actions to lower case
            //for (var i = 0; i < accessToActions.Count; i++)
            //{
            //    accessToActions[i] = accessToActions[i].ToLower();
            //}

            ////convert all controllers to lowercase
            //for (var i = 0; i < accessToModules.Count; i++)
            //{
            //    accessToModules[i] = accessToModules[i].ToLower();
            //}

            //if (!accessToModules.Contains(controllerName.ToLower()))
            //{
            //    //if current controller is not in allowed controllers list, restrict access
            //    CloseConnection(filterContext);
            //    return;
            //}

            //if (!accessToActions.Contains(actionName.ToLower()))
            //{
            //    //if current action is not in allowed actions list, restrict access
            //    CloseConnection(filterContext);
            //}

            //var accessToModules = Utility.GetRoleAccessToControllerAction(userRole, controllerName, actionName);

            //if (!accessToModules)
            //{
            //    //if current action is not in allowed actions list, restrict access
            //    CloseConnection(filterContext);
            //}
        }

        /// <summary>
        /// Closes the connection and sets the status code to Unauthorized
        /// </summary>
        /// <param name="filterContext">The AuthorizationContext</param>
        private void CloseConnection(AuthorizationContext filterContext)
        {
            var response = filterContext.HttpContext.Response;

            filterContext.Result = new HttpStatusCodeResult(403);

            //response.StatusCode = 401;//Unauthorized status code
            //response.Write("<strong><span style=\"font-size:25px;\">You have no permission.</span></strong>");
            //response.Flush();
            //response.Close();
            //response.End();
        }

        /// <summary>
        /// Closes the connection and sets the status code to Unauthorized
        /// </summary>
        /// <param name="filterContext">The AuthorizationContext</param>
        private void CheckRegistrationExpiry(AuthorizationContext filterContext)
        {
            //if(DateTime.Today.Date <= Convert.ToDateTime(GlobalVariables.ExpiryDate))
            //{
            //    return;
            //}

            var response = filterContext.HttpContext.Response;

            response.StatusCode = 403;//Forbidden
            response.Write("Your registration has been expired. Please consult with the software provider.");
            response.Flush();
            response.Close();
            response.End();
        }
    }
}