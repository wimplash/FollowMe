using System;
using System.Collections.Generic;

namespace FollowMeWAPI.Models
{
    public partial class TbActiveTrip
    {
        public int atID { get; set; }
        public Nullable<int> atPTID { get; set; }
        public Nullable<int> atUID { get; set; }
        public bool atAccepted { get; set; }
    }
}
