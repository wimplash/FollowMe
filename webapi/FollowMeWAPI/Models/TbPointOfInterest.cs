using System;
using System.Collections.Generic;

namespace FollowMeWAPI.Models
{
    public partial class TbPointOfInterest
    {
        public int poiID { get; set; }
        public Nullable<int> poiTID { get; set; }
        public string poiPlaceName { get; set; }
        public string poiLong { get; set; }
        public string poiLat { get; set; }
        public string poiPlaceDesc { get; set; }
        public Nullable<int> poiInterestSeq { get; set; }
    }
}
