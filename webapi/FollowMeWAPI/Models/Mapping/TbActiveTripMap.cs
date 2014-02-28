using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FollowMeWAPI.Models.Mapping
{
    public class TbActiveTripMap : EntityTypeConfiguration<TbActiveTrip>
    {
        public TbActiveTripMap()
        {
            // Primary Key
            this.HasKey(t => t.atID);

            // Properties
            this.Property(t => t.atID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("TbActiveTrip");
            this.Property(t => t.atID).HasColumnName("atID");
            this.Property(t => t.atPTID).HasColumnName("atPTID");
            this.Property(t => t.atUID).HasColumnName("atUID");
            this.Property(t => t.atAccepted).HasColumnName("atAccepted");
        }
    }
}
