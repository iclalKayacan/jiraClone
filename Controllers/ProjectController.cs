using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JiraClone.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProjectController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("my")]
        public async Task<ActionResult<IEnumerable<Project>>> GetMyProjects()
        {
            // Şimdilik tüm projeleri döndürelim
            // İleride kullanıcı kimlik doğrulaması eklendiğinde,
            // sadece kullanıcının projelerini filtreleyebilirsiniz
            return await _context.Projects.ToListAsync();
        }
    }
}