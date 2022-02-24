using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NotificationUI.Models
{
    public class CustomerAlertModel
    {
		[Key]
		public Int64? AlertID { get; set; }
		public string Customer { get; set; }
		public string Scheme { get; set; }
		public string MemberName { get; set; }
		public string FamilyCode { get; set; }
		public string MemberNumber { get; set; }
		public string Benefit { get; set; }
		public int? PoolNr { get; set; }

		[Column(TypeName = "decimal(18,0)")]
		public decimal? Allocation { get; set; }
		public double? Expenditure { get; set; }
		public double? Balance { get; set; }
		public double? PercentageExpenditure { get; set; }
		public double? PercentageBalance { get; set; }
		public string insert_date { get; set; }
		public int? ben_shared { get; set; }
		public int? memType { get; set; }
		public string data_source { get; set; }
		public int? policy_id { get; set; }
		public int? customer_id { get; set; }
		public string other_number { get; set; }
		public string scheme_start_date { get; set; }
		public string scheme_end_date { get; set; }
		public string country_code { get; set; }
		public string cat_desc { get; set; }
	}
}
