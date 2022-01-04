using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using site.API.Cache;

namespace site.API.Attributes
{
    public class AdminFilter : ActionFilterAttribute
    {
        private readonly IResidentCache residentCache;
        public AdminFilter(IResidentCache _residentCache)
        {
            residentCache = _residentCache;
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!residentCache.GetCachedResident().IsAdmin)
            {
                context.Result = new BadRequestObjectResult("Please login as admin");
            }
        }
    }
}