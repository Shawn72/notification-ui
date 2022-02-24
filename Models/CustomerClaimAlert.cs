using System;
using System.ComponentModel.DataAnnotations;

namespace NotificationUI.Models
{
    public class CustomerClaimAlert
    {
		[Key]
		public int? id { get; set; }
		public Int64? customer_id { get; set; }
		public int? alert_max_amount { get; set; }
		public string email_address { get; set; }
		public string country_code { get; set; }
		public int? alert_max_claim_amount { get; set; }
	}
}
