using System.ComponentModel.DataAnnotations;

namespace MyWoServer.Dtos.AreaDtos
{
    public class CreateAreaDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(100)]
        public string? Icon { get; set; }

        [RegularExpression(
        "^#[0-9A-Fa-f]{6}$",
        ErrorMessage = "Color must be a valid hex color."
         )]
        public string? Color { get; set; }
    }
}
