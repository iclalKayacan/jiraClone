using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;
using System;

namespace JiraClone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TaskItemController(ApplicationDbContext context)
        {
            _context = context;
        }

        // PATCH: api/TaskItem/{id}/column
        [HttpPatch("{id}/column")]
        public async Task<IActionResult> UpdateTaskColumn(int id, [FromBody] int columnId)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
                return NotFound();

            task.ColumnId = columnId;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/upload")]
        public async Task<IActionResult> UploadFile(int id, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Dosya yüklenemedi: Dosya bulunamadı veya boş.");

            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
                return NotFound();

            try
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "tasks", id.ToString());
                Directory.CreateDirectory(uploadsFolder);

                var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Dosya yolunu göreceli yol olarak kaydet
                var relativePath = $"/uploads/tasks/{id}/{fileName}";
                task.Attachment = relativePath;
                await _context.SaveChangesAsync();

                return Ok(new { FilePath = relativePath });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Dosya yükleme hatası: {ex.Message}");
            }
        }
    }
}