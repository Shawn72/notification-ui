using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NotificationUI.Models
{
    public class CustomerAlertSetting
    {
		[Key]
		public int? id { get; set; } //to allow nulls on int put ? after int datatype
		public int? customer_id { get; set; }
		public string customer_name { get; set; }
		public int? data_source { get; set; }
		public int? percentage_alert { get; set; }
		public string email_address { get; set; }
		public string pol_id { get; set; }
		public string pool_number { get; set; }
		public string country_code { get; set; }
		public int? inpatient_alert { get; set; }
		public int? inpatient_weekly_alert { get; set; }
		public string customer_code { get; set; }
		public int? member_perc_util { get; set; }
		public int? scheme_util_index { get; set; }
		public string ip_alert_email { get; set; }
		public int full_member_util { get; set; }
		public int full_member_util_shared { get; set; }
		public string full_member_util_email { get; set; }
		public int? scheme_expiry_alert { get; set; }
		public string scheme_expiry_alert_email { get; set; }
		public int? age_cut_off_alert { get; set; }
		public string age_cut_off_email { get; set; }
		public int? split_report_into_multiple_sheets { get; set; }
		public int? perc_report_frequency { get; set; }
		public int? include_cat_desc { get; set; }
		public int? include_util_summary { get; set; }

		public List<SelectListItem> Email_Lists = new List<SelectListItem>();
	}
}
