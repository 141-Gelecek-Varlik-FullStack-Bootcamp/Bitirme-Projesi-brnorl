using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using site.API.Cache;

namespace site.API.Attributes
{
    public class LoginFilter : ActionFilterAttribute
    {
        private readonly IResidentCache residentCache;
        public LoginFilter(IResidentCache _residentCache)
        {
            residentCache = _residentCache;
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {

            if (residentCache.GetCachedResident() is null)
            {
                context.Result = new BadRequestObjectResult("You're not logged in");
            }
        }
    }
}