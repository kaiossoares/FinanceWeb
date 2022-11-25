using Microsoft.AspNetCore.Mvc;
using FinanceWeb_API.Data;
using FinanceWeb_API.Models;

namespace FinanceWeb_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GanhoController : ControllerBase
    {
        private FinanceContext _context;
        public GanhoController(FinanceContext context)
        {
            // construtor
            _context = context;
        }
        [HttpGet]
        public ActionResult<List<Ganho>> GetAll()
        {
            return _context.Ganho.ToList();
        }
    }
}