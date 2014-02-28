using System;
using System.Collections.Generic;

namespace FollowMeWAPI.Models
{
    public partial class TbTemplate
    {
        public int tID { get; set; }
        public string tName { get; set; }
        public string tDesc { get; set; }
        public string tLtartLatitude { get; set; }
        public string tStartLongitude { get; set; }
        public string tEndLatitud { get; set; }
        public string tEndLongitude { get; set; }
    }
}
