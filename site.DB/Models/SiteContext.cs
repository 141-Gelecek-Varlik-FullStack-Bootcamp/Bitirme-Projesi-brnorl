using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace site.DB.Models
{
    public partial class SiteContext : DbContext
    {
        public SiteContext()
        {
        }

        public SiteContext(DbContextOptions<SiteContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Apartment> Apartments { get; set; }
        public virtual DbSet<Bill> Bills { get; set; }
        public virtual DbSet<Resident> Residents { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=Site;Trusted_Connection=True;");
            }
        }
        //dotnet ef dbcontext scaffold "Server=.\SQLEXPRESS;Database=Site;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -o Models -f
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Turkish_CI_AS");

            modelBuilder.Entity<Apartment>(entity =>
            {
                entity.ToTable("Apartment");

                entity.Property(e => e.Block)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Bill>(entity =>
            {
                entity.ToTable("Bill");

                entity.Property(e => e.Electric).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.Gas).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.Water).HasColumnType("numeric(18, 2)");
            });

            modelBuilder.Entity<Resident>(entity =>
            {
                entity.ToTable("Resident");

                entity.Property(e => e.Dues).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Message).HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.TcNo)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.VecihlePlate).HasMaxLength(50);

                entity.HasOne(d => d.Apartment)
                    .WithMany(p => p.Residents)
                    .HasForeignKey(d => d.ApartmentId)
                    .HasConstraintName("FK_Resident_Apartment");

                entity.HasOne(d => d.Bill)
                    .WithMany(p => p.Residents)
                    .HasForeignKey(d => d.BillId)
                    .HasConstraintName("FK_Resident_Bill");
            });

            OnModelCreatingPartial(modelBuilder);
        }



        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
