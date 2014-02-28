using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FollowMeWAPI.Models
{
    public class TripTemplate
    {
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public IQueryable<PointOfInterest> pois { get; set; }
    }
}