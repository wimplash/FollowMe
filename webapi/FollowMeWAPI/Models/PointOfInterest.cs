using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FollowMeWAPI.Models
{
    public class PointOfInterest
    {
        public int? id { get; set; }
        public string placeName { get; set; }
        public string longt { get; set; }
        public string lat { get; set; }
        public string placeDesc { get; set; }
        public int? seq { get; set; }
    }
}