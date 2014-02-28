using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace FollowMeWAPI.Models.Mapping
{
    public class TbTemplateMap : EntityTypeConfiguration<TbTemplate>
    {
        public TbTemplateMap()
        {
            // Primary Key
            this.HasKey(t => t.tID);

            // Properties
            this.Property(t => t.tID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.tName)
                .HasMaxLength(50);

            this.Property(t => t.tDesc)
                .HasMaxLength(200);

            this.Property(t => t.tLtartLatitude)
                .HasMaxLength(50);

            this.Property(t => t.tStartLongitude)
                .HasMaxLength(50);

            this.Property(t => t.tEndLatitud)
                .HasMaxLength(50);

            this.Property(t => t.tEndLongitude)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("TbTemplates");
            this.Property(t => t.tID).HasColumnName("tID");
            this.Property(t => t.tName).HasColumnName("tName");
            this.Property(t => t.tDesc).HasColumnName("tDesc");
            this.Property(t => t.tLtartLatitude).HasColumnName("tLtartLatitude");
            this.Property(t => t.tStartLongitude).HasColumnName("tStartLongitude");
            this.Property(t => t.tEndLatitud).HasColumnName("tEndLatitud");
            this.Property(t => t.tEndLongitude).HasColumnName("tEndLongitude");
        }
    }
}
