using Microsoft.EntityFrameworkCore;
using DeviceWebApplication.Models;

namespace DeviceWebApplication.data
{
    public class ApplicationDb:DbContext
    {
        public ApplicationDb(DbContextOptions<ApplicationDb>options):base(options)   
        {
                
        }
        public DbSet<Device> Device { get; set; }  

    }
}
