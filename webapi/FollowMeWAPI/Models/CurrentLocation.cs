using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FollowMeWAPI.Models
{
    public class CurrentLocation
    {
        public string userName { get; set; }
        public string userEmail { get; set; }
        public string userImgUrl { get; set; }
        public double? longtitude { get; set; }
        public double? latitude { get; set; }

    }
}