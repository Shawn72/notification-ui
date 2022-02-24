using System;

namespace NotificationUI.Models
{
    public class SentStatement
    {
		public Int64? id { get; set; }
		public string email_object { get; set; }
		public DateTime? insert_date { get; set; }
		public int? sent { get; set; }
		public DateTime? send_date { get; set; }
		public int? pol_id { get; set; }
		public string family_code { get; set; }
		public string sent_log { get; set; }
	}
}
