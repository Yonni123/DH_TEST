using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HD_Backend.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; } // Map to the Contacts table
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {
        
        }
    }

    [Table("Contacts")]
    public class Contact
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // The Id will be auto-generated
        public int ID { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public Contact()
        {

        }

        public Contact(string name, string phone)
        {
            Name = name;
            Phone = phone;
        }
    }
}
