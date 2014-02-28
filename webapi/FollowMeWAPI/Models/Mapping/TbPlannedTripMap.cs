using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FollowMeWAPI.Models.Mapping
{
    public class TbPlannedTripMap : EntityTypeConfiguration<TbPlannedTrip>
    {
        public TbPlannedTripMap()
        {
            // Primary Key
            this.HasKey(t => t.ptID);

            // Properties
            this.Property(t => t.ptID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ptDesc)
                .HasMaxLength(200);

            // Table & Column Mappings
            this.ToTable("TbPlannedTrip");
            this.Property(t => t.ptID).HasColumnName("ptID");
            this.Property(t => t.ptUID).HasColumnName("ptUID");
            this.Property(t => t.ptActive).HasColumnName("ptActive");
            this.Property(t => t.ptStart).HasColumnName("ptStart");
            this.Property(t => t.ptDesc).HasColumnName("ptDesc");
            this.Property(t => t.ptTID).HasColumnName("ptTID");
        }
    }
}
