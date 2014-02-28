using System;
using System.Collections.Generic;

namespace FollowMeWAPI.Models
{
    public partial class TbLocation
    {
        public int locID { get; set; }
        public Nullable<int> locATID { get; set; }
        public string locPoint { get; set; }
    }
}
