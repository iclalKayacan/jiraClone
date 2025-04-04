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
        public async Task<IActionResult> UploadFiles(int id, [FromForm] List<IFormFile> files)
        {
            if (files == null || !files.Any())
                return BadRequest("Dosya yüklenemedi: Dosyalar bulunamadı veya boş.");

            var task = await _context.Tasks
                .Include(t => t.Attachments)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (task == null)
                return NotFound();

            try
            {
                var uploadsFolder = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot", // wwwroot klasörüne kaydet
                    "uploads",
                    "tasks",
                    id.ToString()
                );
                Directory.CreateDirectory(uploadsFolder);

                var filePaths = new List<string>();
                var newAttachments = new List<TaskAttachment>();

                foreach (var file in files)
                {
                    var uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    // Göreceli URL yolu oluştur
                    var relativePath = $"/uploads/tasks/{id}/{uniqueFileName}";

                    var attachment = new TaskAttachment
                    {
                        TaskItemId = id,
                        FilePath = relativePath,
                        FileName = file.FileName
                    };

                    newAttachments.Add(attachment);
                    filePaths.Add(relativePath);
                }

                task.Attachments.AddRange(newAttachments);
                await _context.SaveChangesAsync();

                return Ok(new { FilePaths = filePaths });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}