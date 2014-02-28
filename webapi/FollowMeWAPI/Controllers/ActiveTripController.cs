using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using FollowMeWAPI.Models;

namespace FollowMeWAPI.Controllers
{
    public class ActiveTripController : ApiController
    {
        private dmgtfollowmeContext db = new dmgtfollowmeContext();

        // GET api/ActiveTrip
        public IEnumerable<ActiveTrip> GetActiveTrips(int userId)
        {
            IEnumerable<ActiveTrip> trips = from t in db.TbTemplates
                                            join p in db.TbPlannedTrips on t.tID equals p.ptTID
                                            join a in db.TbActiveTrips on p.ptID equals a.atPTID
                                            where a.atUID == userId
                                            select new ActiveTrip
                                                      {
                                                          tripName = t.tName,
                                                          status = 0
                                                      };

            return trips;
        }

        // GET api/ActiveTrip/5
        public TbActiveTrip GetTbActiveTrip(int id)
        {
            TbActiveTrip tbactivetrip = db.TbActiveTrips.Find(id);
            if (tbactivetrip == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return tbactivetrip;
        }

        // PUT api/ActiveTrip/5
        public HttpResponseMessage PutTbActiveTrip(int id, TbActiveTrip tbactivetrip)
        {
            if (ModelState.IsValid && id == tbactivetrip.atID)
            {
                db.Entry(tbactivetrip).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST api/ActiveTrip
        public HttpResponseMessage PostTbActiveTrip(TbActiveTrip tbactivetrip)
        {
            if (ModelState.IsValid)
            {
                db.TbActiveTrips.Add(tbactivetrip);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, tbactivetrip);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = tbactivetrip.atID }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/ActiveTrip/5
        public HttpResponseMessage DeleteTbActiveTrip(int id)
        {
            TbActiveTrip tbactivetrip = db.TbActiveTrips.Find(id);
            if (tbactivetrip == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.TbActiveTrips.Remove(tbactivetrip);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, tbactivetrip);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}