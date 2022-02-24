using System;
using System.ComponentModel.DataAnnotations;

namespace NotificationUI.Models
{
    public class IndividualStatementConfig
    {
		[Key]
		public int? id { get; set; }
		public string customer_name { get; set; }
		public string data_source { get; set; }
		public string country_code { get; set; }
		public string customer_logo { get; set; }
		public string customer_logo2 { get; set; }
		public int? pol_id { get; set; }
		public int? main_benefit { get; set; }
		public int? family_benefit { get; set; }
		public DateTime insert_date { get; set; }
		public string policy_name { get; set; }
		public int? customer_id { get; set; }
		public int? send_frequeny { get; set; }
		public DateTime last_send_date { get; set; }
		public int? password_type { get; set; }
		public int? split_password_from_statement { get; set; }
		public int? Include_image_banner { get; set; }
		public string Image_name { get; set; }
		public string report_template_file { get; set; }
		public int? email_blast_enabled { get; set; }
		public int? zero_allocation_excempt { get; set; }
		public int? mail_domain { get; set; }
	}
}
