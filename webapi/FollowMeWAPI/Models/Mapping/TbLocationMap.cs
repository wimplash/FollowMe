using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FollowMeWAPI.Models.Mapping
{
    public class TbLocationMap : EntityTypeConfiguration<TbLocation>
    {
        public TbLocationMap()
        {
            // Primary Key
            this.HasKey(t => t.locID);

            // Properties
            this.Property(t => t.locID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.locPoint)
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("TbLocation");
            this.Property(t => t.locID).HasColumnName("locID");
            this.Property(t => t.locATID).HasColumnName("locATID");
            this.Property(t => t.locPoint).HasColumnName("locPoint");
            this.Property(t => t.locSet).HasColumnName("locSet");
            this.Property(t => t.locLong).HasColumnName("locLong");
            this.Property(t => t.locLat).HasColumnName("locLat");
            this.Property(t => t.userID).HasColumnName("userID");
        }
    }
}
