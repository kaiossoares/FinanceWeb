using Microsoft.AspNetCore.Mvc;
using FinanceWeb_API.Data;
using FinanceWeb_API.Models;

namespace FinanceWeb_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GastoController : ControllerBase
    {
        private FinanceContext _context;
        public GastoController (FinanceContext context)
        {
            // construtor
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Gasto>> GetAll()
        {
            return _context.Gasto.ToList();
        }

        [HttpGet("{GastoId}")]
        public ActionResult<List<Gasto>> Get(int GastoId)
        {
            try
            {
                var result = _context.Gasto.Find(GastoId);
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
        public async Task<ActionResult> post(Gasto model)
        {
            try
            {
                _context.Gasto.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/Gasto/{model.id}", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{GastoId}")]
        public async Task<IActionResult> put(int GastoId, Gasto dadosGastoAlt)
        {
            try
            {
                //verifica se existe Gasto a ser alterado
                var result = await _context.Gasto.FindAsync(GastoId);
                if (GastoId != result.id)
                {
                    return BadRequest();
                }
                result.nomeGasto = dadosGastoAlt.nomeGasto;
                result.valorGasto = dadosGastoAlt.valorGasto;
                await _context.SaveChangesAsync();
                return Created($"/api/Gasto/{dadosGastoAlt.id}", dadosGastoAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpDelete("{GastoId}")]
        public async Task<ActionResult> delete(int GastoId)
        {
            try
            {
                //verifica se existe gasto a ser excluído
                var gasto = await _context.Gasto.FindAsync(GastoId);
                if (gasto == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(gasto);
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