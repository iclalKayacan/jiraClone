using System;
using System.Collections.Generic;

public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Assignee { get; set; }
    public DateTime CreatedAt { get; set; }
    public int ColumnId { get; set; }

    // Attachment yerine Attachments kullan
    public List<TaskAttachment> Attachments { get; set; } = new List<TaskAttachment>();
}

public class TaskAttachment
{
    public int Id { get; set; }
    public int TaskItemId { get; set; }
    public string FilePath { get; set; }
    public string FileName { get; set; }
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

    public TaskItem TaskItem { get; set; }
}