using System;
using System.ComponentModel.DataAnnotations;

namespace NotificationUI.Models
{
    public class SchemeUtilAlertModel
    {
		[Key]
		public int? id { get; set; }
		public string Customer { get; set; }
		public int? policy_id { get; set; }
		public string Scheme { get; set; }
		public double? Allocation { get; set; }
		public double? Expenditure { get; set; }
		public DateTime? scheme_start_date { get; set; }
		public DateTime? scheme_end_date { get; set; }
		public int? member_count { get; set; }
		public int? member_util_count { get; set; }
		public int? customer_id { get; set; }
		public int? benefit_type { get; set; }
		public DateTime? insert_date { get; set; }
		public string data_source { get; set; }
		public string country_code { get; set; }
	}
}
