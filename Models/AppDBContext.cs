using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace NotificationUI.Models
{
    public class AppDBContext : IdentityDbContext<UserModel>
    {
        private readonly DbContextOptions _options;

        public AppDBContext(DbContextOptions options) : base(options)
        {
            _options = options;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        //Add the rest of the entities down here
        //public DbSet<CustomerAlertSetting> Customer_Alert_Setting { get; set; }
        //public DbSet<CustomerClaimAlert> customer_claim_alert { get; set; }
        //public DbSet<CustomerFullUtilShareSetting> Customer_full_util_share_setting { get; set; }
        //public DbSet<IndividualStatementConfig> individual_statement_config { get; set; }
        //public DbSet<SentStatement> send_statement { get; set; }
        //public DbSet<SchemeUtilAlertModel> SchemeUtilAlert { get; set; }
        //public DbSet<CustomerAlertModel> CustomerAlert { get; set; }
        public DbSet<UserModel> AspNetUsers { get; set; }
    }
}
