using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NotificationUI.EmailService;
using NotificationUI.Models;
using StackExchange.Redis;
using System;

namespace NotificationUI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string connectionString = Configuration.GetConnectionString("ConnectionStr");

            services.AddDbContext<AppDBContext>(c => c.UseSqlServer(connectionString));

            services.AddIdentity<UserModel, IdentityRole>().AddEntityFrameworkStores<AppDBContext>().AddDefaultTokenProviders();
            //services.Configure<DataProtectionTokenProviderOptions>(opt =>
            // opt.TokenLifespan = TimeSpan.FromHours(2));

            var emailConfig = Configuration
            .GetSection("EmailConfiguration")
            .Get<EmailConfig>();

            services.AddSingleton(emailConfig);

            services.AddScoped<IEmailSender, EmailSender>();

            services.AddRazorPages();
            services.AddControllersWithViews();
            services.ConfigureApplicationCookie(options =>
            {
                options.LoginPath = "/Account/Login";

            });

            services.AddDistributedMemoryCache();

            services.AddSession(options => {
                options.Cookie.Name = "_aspnetCoreSession";
                options.IdleTimeout = TimeSpan.FromMinutes(5);//You can set Time   
                options.Cookie.IsEssential = true;
            });           
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {           
            app.UseDeveloperExceptionPage();

            app.UseExceptionHandler("/Error");

            app.UseHsts();

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseAuthentication();

            app.UseSession();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();
                endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
