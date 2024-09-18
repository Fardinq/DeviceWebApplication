using System.ComponentModel.DataAnnotations;

namespace DeviceWebApplication.Models
{
    public class Device
    {
        [Key]
        public int id { get; set; }
        public string? Product { get; set; }
        public string? Description { get; set; }
        public int? Price { get; set; }
        public DateTime? Created { get; set; }

    }
}
