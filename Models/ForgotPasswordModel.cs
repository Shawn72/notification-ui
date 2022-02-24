using System.ComponentModel.DataAnnotations;

namespace NotificationUI.Models
{
    public class ForgotPasswordModel
    {

        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
