using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FollowMeWAPI.Models.Mapping
{
    public class TbPointOfInterestMap : EntityTypeConfiguration<TbPointOfInterest>
    {
        public TbPointOfInterestMap()
        {
            // Primary Key
            this.HasKey(t => t.poiID);

            // Properties
            this.Property(t => t.poiID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.poiPlaceName)
                .HasMaxLength(50);

            this.Property(t => t.poiLong)
                .HasMaxLength(50);

            this.Property(t => t.poiLat)
                .HasMaxLength(50);

            this.Property(t => t.poiPlaceDesc)
                .HasMaxLength(2000);

            // Table & Column Mappings
            this.ToTable("TbPointOfInterest");
            this.Property(t => t.poiID).HasColumnName("poiID");
            this.Property(t => t.poiTID).HasColumnName("poiTID");
            this.Property(t => t.poiPlaceName).HasColumnName("poiPlaceName");
            this.Property(t => t.poiLong).HasColumnName("poiLong");
            this.Property(t => t.poiLat).HasColumnName("poiLat");
            this.Property(t => t.poiPlaceDesc).HasColumnName("poiPlaceDesc");
            this.Property(t => t.poiInterestSeq).HasColumnName("poiInterestSeq");
        }
    }
}
