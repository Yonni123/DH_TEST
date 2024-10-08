using HD_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using System.Data;
using System.Text.RegularExpressions;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace HD_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        public readonly IConfiguration configuration;
        private readonly AppDbContext context;

        public ContactsController(IConfiguration Configuration, AppDbContext Context)
        {
            configuration = Configuration;
            context = Context;
        }

        // GET: [controller]/GetAllContacts
        [HttpGet("GetAllContacts")]
        public async Task<IActionResult> GetContacts()
        {
            try
            {
                List<Contact> contacts = await context.Contacts.ToListAsync();
                if (contacts == null || !contacts.Any())
                {
                    return NotFound(new { message = "No contacts found." });
                }
                return Ok(contacts);
            }
            catch (DbUpdateException dbEx)
            {
                // Handle database-related errors
                return StatusCode(500, new { message = "Error fetching contacts from the database.", details = dbEx.Message });
            }
            catch (Exception ex)
            {
                // Catch-all for other unexpected errors
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }

        // POST: [controller]/CreateContact
        [HttpPost("CreateContact")]
        public async Task<IActionResult> CreateContact(string name, string phone)
        {
            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(phone))
            {
                return BadRequest("Name and phone cannot be null or empty.");
            }

            // Validate name and phone number formats
            string namePattern = @"^[a-zA-Z\s]+$";
            string phonePattern = @"^0\d{9}$";
            bool nameValid = Regex.Match(name, namePattern).Success;
            bool phoneValid = Regex.Match(phone, phonePattern).Success;

            if (!nameValid)
            {
                return BadRequest("Name can only contain letters and spaces.");
            }
            if (!phoneValid)
            {
                return BadRequest("Phone number must be exactly 10 digits and start with 0.");
            }

            try
            {
                Contact newContact = new Contact(name, phone);
                context.Contacts.Add(newContact);
                await context.SaveChangesAsync();
                return Ok(new { message = "Contact created successfully", newContact });
            }
            catch (DbUpdateException dbEx)
            {
                // Handle database update exceptions (e.g., constraint violations)
                return StatusCode(500, new { message = "Error saving to the database.", details = dbEx.Message });
            }
            catch (ArgumentException argEx)
            {
                // Handle argument-related exceptions (e.g., invalid data)
                return BadRequest(new { message = "Invalid data provided.", details = argEx.Message });
            }
            catch (Exception ex)
            {
                // Catch-all for other unexpected errors
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }
    }
}
