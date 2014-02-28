using System;
using System.Collections.Generic;

namespace FollowMeWAPI.Models
{
    public partial class TbLocation
    {
        public int locID { get; set; }
        public Nullable<int> locATID { get; set; }
        public string locPoint { get; set; }
        public Nullable<int> locSet { get; set; }
        public Nullable<double> locLong { get; set; }
        public Nullable<double> locLat { get; set; }
        public int userID { get; set; }
    }
}
