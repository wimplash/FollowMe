using System;
using System.Collections.Generic;

namespace FollowMeWAPI.Models
{
    public partial class TbUser
    {
        public int uID { get; set; }
        public string uFirstName { get; set; }
        public string uLastName { get; set; }
        public string uEmail { get; set; }
        public string uPWD { get; set; }
        public string uImag { get; set; }
    }
}
