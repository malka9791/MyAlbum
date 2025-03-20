using Gallery.CORE.models;
using Gallery.CORE.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Security;

namespace Gallery.DATA
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Tag> Tags { get; set; }
        //public DbSet<ImagesTags> ImagesTags { get; set; }
        public DbSet<Album> Albums { get; set; }
        //public DbSet<ImagesAlbums> ImagesAlbums { get; set; }
        public DbSet<Permissions> Permissions { get; set; }

        // אם ברצונך להגדיר את הקשר למסד נתונים באופן חיצוני
        //public DataContext(DbContextOptions<DataContext> options)
        //    : base(options)
        //{
        //}
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

          
            modelBuilder.Entity<Album>()
               .HasOne(a => a.User)
               .WithMany(u => u.Albums) 
               .HasForeignKey(a => a.UserId)
               .OnDelete(DeleteBehavior.Cascade); 
                base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Image>()
               .HasOne(a => a.User)
               .WithMany(u => u.Images)
               .HasForeignKey(a => a.UserId)
               .OnDelete(DeleteBehavior.Cascade);
            base.OnModelCreating(modelBuilder);

            //    // קשרים בין Users ל-Images
            //    modelBuilder.Entity<Image>()
            //        .HasOne(i => i.User)
            //        .WithMany(u => u.Images)
            //        .HasForeignKey(i => i.UserId);

            //    // קשרים בין Users ל-Albums
            //    modelBuilder.Entity<Album>()
            //        .HasOne(a => a.User)
            //        .WithMany(u => u.Albums)
            //        .HasForeignKey(a => a.UserId);

            //    // קשרים בין Albums ל-Images (דרך טבלת ImagesAlbumss)
            //    modelBuilder.Entity<ImagesAlbums>()
            //        .HasKey(af => new { af.AlbumId, af.ImageId });

            //    modelBuilder.Entity<ImagesAlbums>()
            //        .HasOne(af => af.Album)
            //        .WithMany(a => a.ImagesAlbumss)
            //        .HasForeignKey(af => af.AlbumId);

            //    modelBuilder.Entity<ImagesAlbums>()
            //        .HasOne(af => af.Image)
            //        .WithMany(i => i.ImagesAlbumss)
            //        .HasForeignKey(af => af.FileId);

            //    // קשרים בין Images ל-ImagesTagss
            //    modelBuilder.Entity<ImagesTags>()
            //        .HasKey(it => new { it.ImageId, it.TagId });

            //    modelBuilder.Entity<ImagesTags>()
            //        .HasOne(it => it.Image)
            //        .WithMany(i => i.ImagesTagss)
            //        .HasForeignKey(it => it.ImageId);

            //    modelBuilder.Entity<ImagesTags>()
            //        .HasOne(it => it.Tag)
            //        .WithMany(t => t.ImagesTagss)
            //        .HasForeignKey(it => it.TagId);

            //    // קשרים בין Users ל-Permissions
            //    modelBuilder.Entity<Permissions>()
            //        .HasOne(p => p.User)
            //        .WithMany(u => u.Permissions)
            //        .HasForeignKey(p => p.UserId);

            //    // קשרים בין Albums ל-Permissions
            //    modelBuilder.Entity<Permissions>()
            //        .HasOne(p => p.Album)
            //        .WithMany(a => a.Permissions)
            //        .HasForeignKey(p => p.AlbumId);
        }
    }
}
