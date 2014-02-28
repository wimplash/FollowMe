using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FollowMeWAPI.Models
{
    public class PlannedTrip
    {
        public int id { get; set; }
        public int? templateId { get; set; }
        public IQueryable<User> users { get; set; }

    }
}