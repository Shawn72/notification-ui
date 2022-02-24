using System;
using System.ComponentModel.DataAnnotations;

namespace NotificationUI.Models
{
    public class CustomerFullUtilShareSetting
    {

		[Key]
		public int? id { get; set; }
		public string country_code { get; set; }
		public int? customer_id { get; set; }
		public int? pol_id { get; set; }
		public string email_address { get; set; }
		public DateTime insert_date { get; set; }
		public int? percentage_alert { get; set; }
	}
}
