using Microsoft.AspNetCore.Mvc;
using FinanceWeb_API.Data;
using FinanceWeb_API.Models;

namespace FinanceWeb_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class MetaController : ControllerBase
    {
        private FinanceContext _context;

        public MetaController(FinanceContext context)
        {
            // construtor
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Meta>> GetAll()
        {
            return _context.Meta.ToList();
        }

        [HttpGet("{MetaId}")]
        public ActionResult<List<Meta>> Get(int MetaId)
        {
            try
            {
                var result = _context.Meta.Find(MetaId);
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
        public async Task<ActionResult> post(Meta model)
        {
            try
            {
                _context.Meta.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/Meta/{model.id}", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{MetaId}")]
        public async Task<IActionResult> put(int MetaId, Meta dadosMetaAlt)
        {
            try
            {
                //verifica se existe Meta a ser alterado
                var result = await _context.Meta.FindAsync(MetaId);
                if (MetaId != result.id)
                {
                    return BadRequest();
                }
                result.nomeMeta = dadosMetaAlt.nomeMeta;
                result.valorMeta = dadosMetaAlt.valorMeta;
                await _context.SaveChangesAsync();
                return Created($"/api/Meta/{dadosMetaAlt.id}", dadosMetaAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpDelete("{MetaId}")]
        public async Task<ActionResult> delete(int MetaId)
        {
            try
            {
                //verifica se existe Meta a ser excluído
                var meta = await _context.Meta.FindAsync(MetaId);
                if (meta == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(meta);
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