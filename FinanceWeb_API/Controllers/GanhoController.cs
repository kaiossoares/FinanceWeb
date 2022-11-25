using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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

        [HttpGet("{GanhoId}")]
        public ActionResult<List<Ganho>> Get(int GanhoId)
        {
            try
            {
                var result = _context.Ganho.Find(GanhoId);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> post(Ganho model)
        {
            try
            {
                _context.Ganho.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/Ganho/{model.id}", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{GanhoId}")]
        public async Task<IActionResult> put(int GanhoId, Ganho dadosGanhoAlt)
        {
            try
            {
                //verifica se existe Ganho a ser alterado
                var result = await _context.Ganho.FindAsync(GanhoId);
                if (GanhoId != result.id)
                {
                    return BadRequest();
                }
                result.nomeGanho = dadosGanhoAlt.nomeGanho;
                result.valorGanho = dadosGanhoAlt.valorGanho;
                await _context.SaveChangesAsync();
                return Created($"/api/aluno/{dadosGanhoAlt.id}", dadosGanhoAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpDelete("{GanhoId}")]
        public async Task<ActionResult> delete(int GanhoId)
        {
            try
            {
                //verifica se existe aluno a ser excluído
                var ganho = await _context.Ganho.FindAsync(GanhoId);
                if (ganho == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(ganho);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

    }
}