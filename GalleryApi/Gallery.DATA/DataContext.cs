using Gallery.CORE.models;
using Gallery.CORE.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Security;

namespace Gallery.DATA
{
    public class DataContext : DbContext

    {
        private readonly IConfiguration _configuration;

        public DbSet<User> Users { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Permissions> Permissions { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var config = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();

                var connectionString = config.GetConnectionString("DefaultConnection");
                optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            }
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

          
            //modelBuilder.Entity<Album>()
            //   .HasOne(a => a.User)
            //   .WithMany(u => u.Albums) 
            //   .HasForeignKey(a => a.UserId)
            //   .OnDelete(DeleteBehavior.Cascade); 
            //    base.OnModelCreating(modelBuilder);
            //modelBuilder.Entity<Image>()
            //   .HasOne(a => a.User)
            //   .WithMany(u => u.Images)
            //   .HasForeignKey(a => a.UserId)
            //   .OnDelete(DeleteBehavior.Cascade);

           
            base.OnModelCreating(modelBuilder);
        }
    }
}
