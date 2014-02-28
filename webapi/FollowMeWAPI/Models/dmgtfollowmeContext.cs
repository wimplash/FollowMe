using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using FollowMeWAPI.Models.Mapping;

namespace FollowMeWAPI.Models
{
    public partial class dmgtfollowmeContext : DbContext
    {
        static dmgtfollowmeContext()
        {
            Database.SetInitializer<dmgtfollowmeContext>(null);
        }

        public dmgtfollowmeContext()
            : base("Name=dmgtfollowmeContext")
        {
        }

        public DbSet<TbActiveTrip> TbActiveTrips { get; set; }
        public DbSet<TbLocation> TbLocations { get; set; }
        public DbSet<TbPlannedTrip> TbPlannedTrips { get; set; }
        public DbSet<TbPointOfInterest> TbPointOfInterests { get; set; }
        public DbSet<TbTemplate> TbTemplates { get; set; }
        public DbSet<TbUser> TbUsers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new TbActiveTripMap());
            modelBuilder.Configurations.Add(new TbLocationMap());
            modelBuilder.Configurations.Add(new TbPlannedTripMap());
            modelBuilder.Configurations.Add(new TbPointOfInterestMap());
            modelBuilder.Configurations.Add(new TbTemplateMap());
            modelBuilder.Configurations.Add(new TbUserMap());
        }
    }
}
