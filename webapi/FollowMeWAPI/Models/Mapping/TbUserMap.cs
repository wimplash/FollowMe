using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FollowMeWAPI.Models.Mapping
{
    public class TbUserMap : EntityTypeConfiguration<TbUser>
    {
        public TbUserMap()
        {
            // Primary Key
            this.HasKey(t => t.uID);

            // Properties
            this.Property(t => t.uID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.uFirstName)
                .HasMaxLength(50);

            this.Property(t => t.uLastName)
                .HasMaxLength(50);

            this.Property(t => t.uEmail)
                .HasMaxLength(50);

            this.Property(t => t.uPWD)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("TbUsers");
            this.Property(t => t.uID).HasColumnName("uID");
            this.Property(t => t.uFirstName).HasColumnName("uFirstName");
            this.Property(t => t.uLastName).HasColumnName("uLastName");
            this.Property(t => t.uEmail).HasColumnName("uEmail");
            this.Property(t => t.uPWD).HasColumnName("uPWD");
        }
    }
}
