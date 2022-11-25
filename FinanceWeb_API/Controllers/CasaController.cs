using Microsoft.AspNetCore.Mvc;

namespace FinanceWeb_API.Controllers
{
    [ApiController]
    [Route("/")]
    public class CasaController : ControllerBase
    {
        [HttpGet]
        public ActionResult Inicio()
        {
            return new ContentResult
            {
                ContentType = "text/html",
                Content = "<h1>Finance Web API, is working!</h1>"
            };
        }
    }
}