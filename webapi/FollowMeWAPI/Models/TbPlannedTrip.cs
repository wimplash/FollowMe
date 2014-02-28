using System;
using System.Collections.Generic;

namespace FollowMeWAPI.Models
{
    public partial class TbPlannedTrip
    {
        public int ptID { get; set; }
        public Nullable<int> ptUID { get; set; }
        public Nullable<bool> ptActive { get; set; }
        public Nullable<System.DateTime> ptStart { get; set; }
        public string ptDesc { get; set; }
        public Nullable<int> ptTID { get; set; }
    }
}
