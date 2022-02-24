using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using NotificationUI.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace NotificationUI.Controllers
{
    public class HomeController : Controller
    {

        private readonly ILogger<HomeController> _logger;

        private readonly IConfiguration _configuration;

        public static string Baseurl;

        private IWebHostEnvironment Environment;
        private AppDBContext Context { get; }

        public string SQLConnection;

        CultureInfo culture = new CultureInfo("en-US");

        public HomeController(ILogger<HomeController> logger, IConfiguration config, AppDBContext _context, IWebHostEnvironment _environment)
        {
            _logger = logger;
            _configuration = config;
            Context = _context;
            Baseurl = _configuration["StaticStrings:BaseUrl"];
            Environment = _environment;
            SQLConnection = _configuration.GetConnectionString("ConnectionStr");
        }

        public IActionResult Index() {
            var userI = HttpContext.Session.GetString("UserId");
            ViewBag.Name = userI;
            if (userI == null)
            {
                return RedirectToAction("Login", "Account");
            }
            return View();
        }
        public IActionResult EditCstClaimAlert(int id, int customer_id)
        {
            try { 
                WebClient wc = new WebClient();
                List<CustomerClaimAlert> claimalert = null;
                string json = wc.DownloadString(Baseurl + "api/customerclaimalert");
                claimalert = JsonConvert.DeserializeObject<List<CustomerClaimAlert>>(json);
                var a_items = (from a in claimalert where a.id == id && a.customer_id == customer_id select a).GroupBy(o => o.id).Select(m => m.First()).ToList();
                return View(a_items);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IActionResult ViewCustomerAlertSetting()
        {
            try { 
                WebClient wc = new WebClient();
                List<CustomerAlertSetting> csalert = null;
                string json = wc.DownloadString(Baseurl + "api/customeralertsetting");
                csalert = JsonConvert.DeserializeObject<List<CustomerAlertSetting>>(json);
                var alertitems = (from a in csalert select a).ToList();
                return View(alertitems);
            }
            catch (Exception)
            {
                throw;
            }
        }       
        public IActionResult ViewCustomerClaimAlert()
        {
            try
            {
                WebClient wc = new WebClient();
                List<CustomerClaimAlert> csalert = null;
                string json = wc.DownloadString(Baseurl + "api/customerclaimalert");
                csalert = JsonConvert.DeserializeObject<List<CustomerClaimAlert>>(json);
                var claimalertitems = (from a in csalert select a).ToList();
                return View(claimalertitems);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public IActionResult ViewFullUtilShareSetting()
        {
            try { 
                WebClient wc = new WebClient();
                List<CustomerFullUtilShareSetting> utilshare = null;
                string json = wc.DownloadString(Baseurl + "api/customerfullutilshare");
                utilshare = JsonConvert.DeserializeObject<List<CustomerFullUtilShareSetting>>(json);
                var allitems = (from a in utilshare select a).ToList();
                return View(allitems);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IActionResult ViewStatementConfig()
        {
            try { 
                WebClient wc = new WebClient();
                List<IndividualStatementConfig> config = null;
                string json = wc.DownloadString(Baseurl + "api/statementconfig");
                config = JsonConvert.DeserializeObject<List<IndividualStatementConfig>>(json);
                var allitems = (from a in config select a).ToList();
                return View(allitems);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IActionResult ViewSentStatement()
        {
            try { 
                WebClient wc = new WebClient();
                List<SentStatement> sstatement = null;
                string json = wc.DownloadString(Baseurl + "api/sentstatement");
                sstatement = JsonConvert.DeserializeObject<List<SentStatement>>(json);
                var allitems = (from a in sstatement select a).ToList();
                return View(allitems);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IActionResult ViewSchemeUtilAlert()
        {
            try { 
                WebClient wc = new WebClient();
                List<SchemeUtilAlertModel> alert = null;
                string json = wc.DownloadString(Baseurl + "api/schemeutilalert");
                alert = JsonConvert.DeserializeObject<List<SchemeUtilAlertModel>>(json);
                var allitems = (from a in alert select a).ToList();
                return View(allitems);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IActionResult ViewCustomerAlert()
        {
            try
            {
                WebClient wc = new WebClient();
                List<CustomerClaimAlert> csalert = null;
                string json = wc.DownloadString(Baseurl + "api/customeralert");
                csalert = JsonConvert.DeserializeObject<List<CustomerClaimAlert>>(json);
                var claimalertitems = (from a in csalert select a).ToList();
                return View(claimalertitems);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IActionResult PagedCustomerAlertsPage()
        {
            TotalAlertsPages();
            return View();
        }
        public JsonResult PagedCustomerAlerts(int PageNumber, int PageSize)
        {
            WebClient wc = new WebClient();
            List<CustomerAlertModel> alldata = null;
            string json = wc.DownloadString(Baseurl + "api/customeralert/GetAllAlerts?PageNumber=" + PageNumber + "&PageSize=" + PageSize);
            alldata = JsonConvert.DeserializeObject<List<CustomerAlertModel>>(json);
            var allitems = (from a in alldata select a).ToList();
            return Json(allitems);
        }
        public IActionResult EditSchemeUtilAlert(int id)
        {
            try
            {
                WebClient wc = new WebClient();
                List<SchemeUtilAlertModel> alert = null;
                string json = wc.DownloadString(Baseurl + "api/schemeutilalert");
                alert = JsonConvert.DeserializeObject<List<SchemeUtilAlertModel>>(json);
                var allitems = (from a in alert where a.id == id select a).ToList();
                return View(allitems);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IActionResult EditFullUtilSetting(int id)
        {
            try
            {
                WebClient wc = new WebClient();
                List<CustomerFullUtilShareSetting> util = null;
                string json = wc.DownloadString(Baseurl + "api/customerfullutilshare");
                util = JsonConvert.DeserializeObject<List<CustomerFullUtilShareSetting>>(json);
                var allitems = (from a in util where a.id == id select a)
                    .GroupBy(o => o.id).Select(m => m.First()).ToList();
                return View(allitems);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IActionResult EditCustomerAlert(int alertId)
        {
          //  er

            return View();
        }
        public void TotalAlertsPages()
        {
            try
            {
                WebClient wc = new WebClient();
                string json = wc.DownloadString(Baseurl + "api/customeralert/totalpages");
                TempData["totalnumberofpages"] = json;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IActionResult FilterAlertBySchemeName(string schemeName)
        {
            try
            {
                List<CustomerAlertModel> calertModel = new List<CustomerAlertModel>();
                using (SqlConnection con = new SqlConnection(SQLConnection))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand();
                    cmd.Connection = con; //initialize connection
                    cmd.CommandText = "SELECT AlertID, Customer, Scheme,MemberName,FamilyCode, MemberNumber," + "Benefit, PoolNr, Allocation, Expenditure, Balance, PercentageExpenditure, PercentageBalance, insert_date, ben_shared, memType, data_source, policy_id, customer_id, other_number, scheme_start_date, scheme_end_date, country_code, cat_desc FROM [dbo].CustomerAlert WHERE Scheme=@schemeName";

                    cmd.Parameters.AddWithValue("@schemeName", schemeName);

                    using (SqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            calertModel.Add(new CustomerAlertModel
                            {
                                AlertID = (long?)sdr["AlertID"],
                                Customer = sdr["Customer"].ToString(),
                                Scheme = sdr["Scheme"].ToString(),
                                MemberName = sdr["MemberName"].ToString(),
                                FamilyCode = sdr["FamilyCode"].ToString(),
                                MemberNumber = sdr["MemberNumber"].ToString(),
                                Benefit = sdr["Scheme"].ToString(),
                                PoolNr = (int?)sdr["PoolNr"],
                                Allocation = (decimal?)sdr["Allocation"],
                                Expenditure = (double?)sdr["Expenditure"],
                                Balance = (double?)sdr["Balance"],
                                PercentageExpenditure = (double?)sdr["PercentageExpenditure"],
                                PercentageBalance = (double?)sdr["PercentageBalance"],
                                insert_date = sdr["insert_date"] as string,
                                ben_shared = (int?)sdr["ben_shared"],
                                memType = (int?)sdr["memType"],
                                data_source = (string)sdr["data_source"],
                                policy_id = (int?)sdr["policy_id"],
                                customer_id = (int?)sdr["customer_id"],
                                other_number = (string)sdr["data_source"],
                                scheme_start_date = sdr["scheme_start_date"] as string,
                                scheme_end_date = sdr["scheme_end_date"] as string,
                                country_code = (string)sdr["country_code"],
                                cat_desc = (string)sdr["cat_desc"]
                            });
                        }

                    }
                    con.Close();
                    return View(calertModel);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IActionResult FilterAlertByCustomerName(string customerName)
        {
            try
            {
                List<CustomerAlertModel> calertModel = new List<CustomerAlertModel>();
                using (SqlConnection con = new SqlConnection(SQLConnection))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand();
                    cmd.Connection = con; //initialize connection
                    cmd.CommandText = "SELECT AlertID, Customer, Scheme,MemberName,FamilyCode, MemberNumber," + "Benefit, PoolNr, Allocation, Expenditure, Balance, PercentageExpenditure, PercentageBalance, insert_date, ben_shared, memType, data_source, policy_id, customer_id, other_number, scheme_start_date, scheme_end_date, country_code, cat_desc FROM [dbo].CustomerAlert WHERE Customer=@customerName";

                    cmd.Parameters.AddWithValue("@customerName", customerName);

                    using (SqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            calertModel.Add(new CustomerAlertModel
                            {
                                AlertID = (long?)sdr["AlertID"],
                                Customer = sdr["Customer"].ToString(),
                                Scheme = sdr["Scheme"].ToString(),
                                MemberName = sdr["MemberName"].ToString(),
                                FamilyCode = sdr["FamilyCode"].ToString(),
                                MemberNumber = sdr["MemberNumber"].ToString(),
                                Benefit = sdr["Scheme"].ToString(),
                                PoolNr = (int?)sdr["PoolNr"],
                                Allocation = (decimal?)sdr["Allocation"],
                                Expenditure = (double?)sdr["Expenditure"],
                                Balance = (double?)sdr["Balance"],
                                PercentageExpenditure = (double?)sdr["PercentageExpenditure"],
                                PercentageBalance = (double?)sdr["PercentageBalance"],
                                insert_date = sdr["insert_date"] as string,
                                ben_shared = (int?)sdr["ben_shared"],
                                memType = (int?)sdr["memType"],
                                data_source = (string)sdr["data_source"],
                                policy_id = (int?)sdr["policy_id"],
                                customer_id = (int?)sdr["customer_id"],
                                other_number = (string)sdr["data_source"],
                                scheme_start_date = sdr["scheme_start_date"] as string,
                                scheme_end_date = sdr["scheme_end_date"] as string,
                                country_code = (string)sdr["country_code"],
                                cat_desc = (string)sdr["cat_desc"]
                            });
                        }

                    }
                    con.Close();
                    return View(calertModel);
                }
            }
            catch (Exception ex)
            {
#pragma warning disable CA2200 // Rethrow to preserve stack details
                throw ex;
#pragma warning restore CA2200 // Rethrow to preserve stack details
            }
        }
        public async Task<JsonResult> UpdateCstUtilAlert(SchemeUtilAlertModel utilAlert)
        {
            try
            {
                var stCode = (dynamic)null;
                var res = (dynamic)null;
                var json = JsonConvert.SerializeObject(utilAlert); 

                var stringContent = new StringContent(json, Encoding.UTF8, "application/json"); ;
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(Baseurl);
                var response = await client.PutAsync("api/schemeutilalert/" + utilAlert.id, stringContent);

                stCode = (int)response.StatusCode;

                if (stCode == 200)
                {
                    res = "success";
                    Json(res);
                }
                else //500, 404, anything other than 200, switch default
                {
                    res = "error";
                    Json(res);
                }
                return Json(res);
            }
            catch (Exception)
            {
                return null;
            }
        }
        public JsonResult UpdateClaimAlert(CustomerClaimAlert claimlAlert)
        {
            try
            {
                //update using pure sql, EF core will fail, so no Api call here
                var res = (dynamic)null;
                using (SqlConnection con = new SqlConnection(SQLConnection))
                {
                    using (SqlCommand cmd = new SqlCommand("UPDATE TOP(1) dbo.customer_claim_alert SET alert_max_claim_amount = @cstmaxclaimamt, alert_max_amount=@amaxalert WHERE id = " + claimlAlert.id, con))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.AddWithValue("@cstmaxclaimamt", claimlAlert.alert_max_claim_amount);
                        cmd.Parameters.AddWithValue("@amaxalert", claimlAlert.alert_max_amount);
                        con.Open();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected > 0)
                        {
                            res = "success";
                        }
                        else { res = "error"; }
                       
                        con.Close();
               
                        return Json(res);
                    }
                }                   
            }
            catch (Exception)
            {
                throw;
            }
        }
        public JsonResult UpdateFullShareSet(CustomerFullUtilShareSetting utilSet)
        {
            try
            {
                //update using pure sql, EF core will fail, so no Api call here
                var res = (dynamic)null;
                using (SqlConnection con = new SqlConnection(SQLConnection))
                {
                    using (SqlCommand cmd = new SqlCommand("UPDATE dbo.Customer_full_util_share_setting SET email_address = @emailAddress, percentage_alert=@percentAlert WHERE id = " + utilSet.id, con))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.AddWithValue("@emailAddress", utilSet.email_address);
                        cmd.Parameters.AddWithValue("@percentAlert", utilSet.percentage_alert);
                        con.Open();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected > 0)
                        {
                            res = "success";
                        }
                        else { res = "error"; }

                        con.Close();

                        return Json(res);
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }

        }
        public JsonResult UpdateCustomerAlertSettn(CustomerAlertSetting csalertSet)
        { 
            try
            {
                //update using pure sql, EF core will fail, so no Api call here
                var res = (dynamic)null;
                using (SqlConnection con = new SqlConnection(SQLConnection))
                {
                    using (SqlCommand cmd = new SqlCommand("UPDATE dbo.customer_alert_setting SET " +
                    "customer_name = @cstName, percentage_alert=@percentAlert, " +
                    "email_address = @emailAddress, pol_id=@polId , " +
                    "country_code=@ctryCode, customer_code = @cstCode ," +
                    "inpatient_alert = @inpAlert, inpatient_weekly_alert=@inpWeeklyAlert , " +
                    "member_perc_util=@mbrPercUtil, pool_number = @poolNumber ," +
                    "scheme_util_index = @schmUtilIndex, ip_alert_email=@ipAlertEmail ," +
                    "full_member_util = @fullMbrUtil, full_member_util_shared=@fullMbrUtilShared , " +
                    "full_member_util_email = @fullMbrUtilEmail, scheme_expiry_alert_email=@schmXpryalertEmail, " +
                    "age_cut_off_alert = @ageCutoffAlert, split_report_into_multiple_sheets=@splitReportMulti , " +
                    "perc_report_frequency = @percRprtFreq, include_cat_desc=@inclCatDescr , "+
                     "include_util_summary = @inclUtilSumm WHERE id = " + csalertSet.id, con))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.AddWithValue("@cstName", csalertSet.customer_name);
                        cmd.Parameters.AddWithValue("@percentAlert", csalertSet.percentage_alert);
                        cmd.Parameters.AddWithValue("@emailAddress", csalertSet.email_address.Trim());
                        cmd.Parameters.AddWithValue("@polId", csalertSet.pol_id);
                        cmd.Parameters.AddWithValue("@poolNumber", csalertSet.pool_number);
                        cmd.Parameters.AddWithValue("@ctryCode", csalertSet.country_code);
                        cmd.Parameters.AddWithValue("@inpAlert", csalertSet.inpatient_alert);
                        cmd.Parameters.AddWithValue("@inpWeeklyAlert", csalertSet.inpatient_weekly_alert);
                        cmd.Parameters.AddWithValue("@cstCode", csalertSet.customer_code);
                        cmd.Parameters.AddWithValue("@mbrPercUtil", csalertSet.member_perc_util);
                        cmd.Parameters.AddWithValue("@schmUtilIndex", csalertSet.scheme_util_index);
                        cmd.Parameters.AddWithValue("@ipAlertEmail", csalertSet.ip_alert_email);
                        cmd.Parameters.AddWithValue("@fullMbrUtil", csalertSet.full_member_util);
                        cmd.Parameters.AddWithValue("@fullMbrUtilShared", csalertSet.full_member_util_shared);
                        cmd.Parameters.AddWithValue("@fullMbrUtilEmail", csalertSet.full_member_util_email);
                        cmd.Parameters.AddWithValue("@schmXpryalertEmail", csalertSet.scheme_expiry_alert_email);
                        cmd.Parameters.AddWithValue("@ageCutoffAlert", csalertSet.age_cut_off_alert);
                        cmd.Parameters.AddWithValue("@splitReportMulti", csalertSet.split_report_into_multiple_sheets);
                        cmd.Parameters.AddWithValue("@percRprtFreq", csalertSet.perc_report_frequency);
                        cmd.Parameters.AddWithValue("@inclCatDescr", csalertSet.include_cat_desc);
                        cmd.Parameters.AddWithValue("@inclUtilSumm", csalertSet.include_util_summary);

                        con.Open();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected > 0)
                        {
                            res = "success";
                        }
                        else { res = "error"; }

                        con.Close();

                        return Json(res);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public IActionResult EditStatementConfig(int id)
        {
            try
            {
                WebClient wc = new WebClient();
                List<IndividualStatementConfig> modelf = null;
                string json = wc.DownloadString(Baseurl + "api/statementconfig");
                modelf = JsonConvert.DeserializeObject<List<IndividualStatementConfig>>(json);
                var allitems = (from a in modelf where a.id == id select a).GroupBy(o => o.id).Select(m => m.First()).ToList();
                return View(allitems);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public IActionResult EditCstAlertSetting(int id)
        {
            try
            {
                WebClient wc = new WebClient();
                List<CustomerAlertSetting> csalert = null;
                string json = wc.DownloadString(Baseurl + "api/customeralertsetting");
                csalert = JsonConvert.DeserializeObject<List<CustomerAlertSetting>>(json);
                var alertitems = (from a in csalert where a.id == id select a).GroupBy(o => o.id).Select(m => m.First()).ToList();
                return View(alertitems);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public JsonResult UpdateStatementConfig(IndividualStatementConfig config)
        {
            try
            {
                //update using pure sql, EF core will fail, so no Api call here
                var res = (dynamic)null;
                using (SqlConnection con = new SqlConnection(SQLConnection))
                {
                    using (SqlCommand cmd = new SqlCommand("UPDATE dbo.individual_statement_config SET " +
                    "customer_name = @cstName, main_benefit=@mainBenefit, " +
                    "family_benefit = @familyBenefit, " +
                    "send_frequeny=@sendFrequency, password_type = @passwdType ," +
                    "split_password_from_statement = @passwdSplit, Include_image_banner=@inclImgBanner , " +
                    "Image_name=@imgName, report_template_file = @rprtTempFile ," +
                    "zero_allocation_excempt = @zeroAllocExcmpt, mail_domain=@emDomain WHERE id = " + config.id, con))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.AddWithValue("@cstName", config.customer_name);
                        cmd.Parameters.AddWithValue("@mainBenefit", config.main_benefit);
                        cmd.Parameters.AddWithValue("@familyBenefit", config.family_benefit);
                        cmd.Parameters.AddWithValue("@sendFrequency", config.send_frequeny);
                        cmd.Parameters.AddWithValue("@passwdType", config.password_type);
                        cmd.Parameters.AddWithValue("@passwdSplit", config.split_password_from_statement);
                        cmd.Parameters.AddWithValue("@inclImgBanner", config.Include_image_banner);
                        cmd.Parameters.AddWithValue("@imgName", config.Image_name);
                        cmd.Parameters.AddWithValue("@rprtTempFile", config.report_template_file);
                        cmd.Parameters.AddWithValue("@zeroAllocExcmpt", config.zero_allocation_excempt);
                        cmd.Parameters.AddWithValue("@emDomain", config.mail_domain);

                        con.Open();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected > 0)
                        {
                            res = "success";
                        }
                        else { res = "error"; }

                        con.Close();

                        return Json(res);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

    }
}
