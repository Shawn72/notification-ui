using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using NotificationUI.Models;
using System;
using System.Collections;
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

        private readonly IHttpContextAccessor _httpContextAccessor;
        private ISession _session => _httpContextAccessor.HttpContext.Session;

        public string userI;

        public HomeController(ILogger<HomeController> logger, IConfiguration config, AppDBContext _context, IWebHostEnvironment _environment, IHttpContextAccessor httpContextAccessor)
        {
            _logger = logger;
            _configuration = config;
            Context = _context;
            Baseurl = _configuration["StaticStrings:BaseUrl"];
            Environment = _environment;
            SQLConnection = _configuration.GetConnectionString("ConnectionStr");
            _httpContextAccessor = httpContextAccessor;
            userI = _session.GetString("UserId");
        }

        public IActionResult Index() {
            if (userI == null)
            {
                return RedirectToAction("Login", "Account");
            }
            if (userI != null)
            {
                ViewBag.Name = userI;
               // GetMyUserRole();
            }
            return View();
        }

        public IActionResult CheckSessionID()
        {
            if (userI == null)
            {
                return RedirectToAction("Login", "Account");
            }
            ViewBag.Name = userI;
            return View();
        }
        public IActionResult EditCstClaimAlert(int id, int customer_id)
        {
            CheckSessionID();
            try { 
                WebClient wc = new WebClient();
                List<CustomerClaimAlert> claimalert = new List<CustomerClaimAlert>();
                CustomerClaimAlert  alertModel = new CustomerClaimAlert();
                string json = wc.DownloadString(Baseurl + "api/customerclaimalert");
                claimalert = JsonConvert.DeserializeObject<List<CustomerClaimAlert>>(json);
                var a_items = (from a in claimalert where a.id == id && a.customer_id == customer_id select a).GroupBy(o => o.id).Select(m => m.First()).ToList();

                //split down emails here

                //put data to the model manually
                alertModel.id = a_items[0].id;
                alertModel.customer_id = a_items[0].customer_id;
                alertModel.alert_max_amount = a_items[0].alert_max_amount;
                alertModel.country_code = a_items[0].country_code;
                alertModel.alert_max_claim_amount = a_items[0].alert_max_claim_amount;

                string emailaddresses = a_items.Select(m => m.email_address).SingleOrDefault().ToString(); 

                List<EmailListModel> listModel = new List<EmailListModel>();

                //get the email and split it
                string[] emailList = emailaddresses.Split(";");
                foreach (var email in emailList)
                {
                    listModel.Add(new EmailListModel()
                    {
                        email_id = email,
                        email_text = email
                    });
                }
                var emailDrops = new SelectList(listModel, "email_id", "email_text");

                alertModel.Email_Lists = emailDrops.ToList();

                return View(alertModel);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IActionResult ViewCustomerAlertSetting()
        {
            CheckSessionID();
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
            CheckSessionID();
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
            CheckSessionID();
            try { 
                WebClient wc = new WebClient();
                List<CustomerFullUtilShareSetting> utilshare = new List<CustomerFullUtilShareSetting>();
                CustomerFullUtilShareSetting utiltModel = new CustomerFullUtilShareSetting();
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
            CheckSessionID();
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
            CheckSessionID();
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
            CheckSessionID();
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
            CheckSessionID();
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
            CheckSessionID();
            TotalAlertsPages();
            return View();
        }
        public JsonResult PagedCustomerAlerts(int PageNumber, int PageSize)
        {
            WebClient wc = new WebClient();
            List<CustomerAlertModel> alldata = new List<CustomerAlertModel>();
            List<CustomerAlertModel> modelList = new List<CustomerAlertModel>();
            CustomerAlertModel cstAModel = new CustomerAlertModel();
            string json = wc.DownloadString(Baseurl + "api/customeralert/GetAllAlerts?PageNumber=" + PageNumber + "&PageSize=" + PageSize);
            alldata = JsonConvert.DeserializeObject<List<CustomerAlertModel>>(json);
            // var allitems = (from a in alldata select a).ToList();
            foreach (var item in alldata) {
                modelList.Add(new CustomerAlertModel()
                {
                    AlertID = item.AlertID,
                    Customer = item.Customer,
                    Scheme = item.Scheme,
                    Benefit = item.Benefit,
                    Allocation = item.Allocation,
                    MemberName = item.MemberName,
                    FamilyCode = item.FamilyCode,
                    MemberNumber = item.MemberNumber,
                    Expenditure = item.Expenditure,
                    PoolNr = item.PoolNr,
                    Balance = item.Balance,
                    PercentageExpenditure = item.PercentageExpenditure,
                    PercentageBalance = item.PercentageBalance,
                    insert_date = item.insert_date,                
                    memType = item.memType,
                    data_source = item.data_source,
                    policy_id = item.policy_id,
                    customer_id = item.customer_id,
                    other_number = item.other_number,
                    scheme_start_date = item.scheme_start_date,
                    scheme_end_date = item.scheme_end_date,
                    country_code = item.country_code,
                    cat_desc = item.cat_desc,
                    BenSharedString = item.ben_shared == 1 ? "Yes" : "No"                      
                });               
               
             }  
            return Json(modelList);
        }
        public IActionResult EditSchemeUtilAlert(int id)
        {
            CheckSessionID();
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
            CheckSessionID();
            try
            {
                WebClient wc = new WebClient();
                List<CustomerFullUtilShareSetting> util = new List<CustomerFullUtilShareSetting>();
                CustomerFullUtilShareSetting utilShrModel = new CustomerFullUtilShareSetting();

                string json = wc.DownloadString(Baseurl + "api/customerfullutilshare");
                util = JsonConvert.DeserializeObject<List<CustomerFullUtilShareSetting>>(json);
                var allitems = (from a in util where a.pol_id == id select a)
                    .GroupBy(o => o.id).Select(m => m.First()).ToList();

                //put data to the model  manually
                utilShrModel.id = allitems[0].id;
                utilShrModel.customer_id = allitems[0].customer_id;
                utilShrModel.country_code = allitems[0].country_code;
                utilShrModel.percentage_alert = allitems[0].percentage_alert;
                utilShrModel.pol_id = allitems[0].pol_id;
                utilShrModel.insert_date = allitems[0].insert_date;

                string emailaddresses = allitems.Select(m => m.email_address).SingleOrDefault().ToString();

                List<EmailListModel> listModel = new List<EmailListModel>();

                //get the email and split it
                string[] emailList = emailaddresses.Split(";");
                foreach (var email in emailList)
                {
                    listModel.Add(new EmailListModel()
                    {
                        email_id = email,
                        email_text = email
                    });
                }
                var emailDrops = new SelectList(listModel, "email_id", "email_text");

                utilShrModel.Email_Lists = emailDrops.ToList();

                return View(utilShrModel);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IActionResult EditCustomerAlert(int alertId)
        {
            CheckSessionID();

            //  to be implemented

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
                //concatenate emails using ";"
                var emails = csalertSet.email_address;

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
                    "full_member_util_email = @fullMbrUtilEmail, split_report_into_multiple_sheets=@splitReportMulti , " +
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
            CheckSessionID();
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
            CheckSessionID();

            //  listbox implementation here

            try
            {
                WebClient wc = new WebClient();
                List<CustomerAlertSetting> csalert = new List<CustomerAlertSetting>();
                CustomerAlertSetting alertSett = new CustomerAlertSetting();

                string json = wc.DownloadString(Baseurl + "api/customeralertsetting");

                csalert = JsonConvert.DeserializeObject<List<CustomerAlertSetting>>(json);

                var alertitems = (from a in csalert where a.id == id select a).GroupBy(o => o.id).Select(m => m.First()).ToList();

                //put data to the model  manually
                alertSett.id = alertitems[0].id;
                alertSett.customer_id = alertitems[0].customer_id;
                alertSett.customer_name = alertitems[0].customer_name;
                alertSett.percentage_alert = alertitems[0].percentage_alert;
                alertSett.pol_id = alertitems[0].pol_id;
                alertSett.pool_number= alertitems[0].pool_number;
                alertSett.country_code = alertitems[0].country_code;
                alertSett.inpatient_alert = alertitems[0].inpatient_alert;
                alertSett.inpatient_weekly_alert = alertitems[0].inpatient_weekly_alert;
                alertSett.customer_code = alertitems[0].customer_code;
                alertSett.member_perc_util = alertitems[0].member_perc_util;
                alertSett.scheme_util_index = alertitems[0].scheme_util_index;
                alertSett.ip_alert_email = alertitems[0].ip_alert_email;
                alertSett.full_member_util = alertitems[0].full_member_util;
                alertSett.full_member_util_shared = alertitems[0].full_member_util_shared;
                alertSett.full_member_util_email = alertitems[0].full_member_util_email;
                alertSett.perc_report_frequency = alertitems[0].perc_report_frequency;
                alertSett.include_cat_desc = alertitems[0].include_cat_desc;
                alertSett.include_util_summary = alertitems[0].include_util_summary;

                string emailaddresses = alertitems.Select(m => m.email_address).SingleOrDefault().ToString();

                //PopulateList(emailaddresses);

                List<EmailListModel> listModel = new List<EmailListModel>();             

                //get the email and split it
                string[] emailList = emailaddresses.Split(";");
                foreach (var email in emailList)
                {
                    listModel.Add(new EmailListModel()
                    {
                        email_id = email,
                        email_text = email
                    });
                }
                var emailDrops = new SelectList(listModel, "email_id", "email_text");
            
                alertSett.Email_Lists = emailDrops.ToList();

                return View(alertSett);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void PopulateList(string emailaddresses)
        {
            try
            {
                //WebClient wc = new WebClient();
                //List<CustomerAlertSetting> csalert = null;
                EmailListModel listModel = new EmailListModel();

                //string json = wc.DownloadString(Baseurl + "api/customeralertsetting");
                //csalert = JsonConvert.DeserializeObject<List<CustomerAlertSetting>>(json);
                //var alertitems = (from a in csalert where a.id == id select a).GroupBy(o => o.id).Select(m => m.First()).ToList();

                //string emailaddresses =  alertitems.Select(m=>m.email_address).SingleOrDefault().ToString();

                //get the email and split it
                string[] emailList = emailaddresses.Split(";");
                foreach (string email in emailList)
                {
                    listModel.email_id = email;
                    listModel.email_text = email;
                }
              
               // return listModel;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
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
