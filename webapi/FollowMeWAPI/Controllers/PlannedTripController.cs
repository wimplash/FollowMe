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
    [AllowCrossSiteJsonAttribute]
    public class PlannedTripController : ApiController
    {
        private dmgtfollowmeContext db = new dmgtfollowmeContext();

        // GET api/Default1
        public IEnumerable<PlannedTrip> GetPlannedTrips()
        {
            IEnumerable<PlannedTrip> plannedTrips = from p in db.TbPlannedTrips
                                                    select new PlannedTrip {
                                                        id = p.ptID,
                                                        templateId = p.ptTID,
                                                        users = (from u in db.TbUsers
                                                                 where p.ptUID == u.uID
                                                                 select new User
                                                                 {
                                                                     Id = u.uID,
                                                                     FirstName = u.uFirstName,
                                                                     LastName = u.uLastName,
                                                                     Email = u.uEmail
                                                                 })
                                                    };

            return plannedTrips;
        }

        // GET api/Default1/5
        public TbPlannedTrip GetTbPlannedTrip(int id)
        {
            TbPlannedTrip tbplannedtrip = db.TbPlannedTrips.Find(id);
            if (tbplannedtrip == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return tbplannedtrip;
        }

        // PUT api/Default1/5
        public HttpResponseMessage PutPlannedTrip(int id, PlannedTrip plannedTrip)
        {
            if (ModelState.IsValid && id == plannedTrip.id)
            {
                TbPlannedTrip tbplannedtrip = new TbPlannedTrip
                {
                    ptID = plannedTrip.id,
                    ptTID = plannedTrip.templateId,
                    //ptUID = plannedTrip.users.
                };

                db.Entry(tbplannedtrip).State = EntityState.Modified;

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

        // POST api/Default1
        public HttpResponseMessage PostTbPlannedTrip(TbPlannedTrip tbplannedtrip)
        {
            if (ModelState.IsValid)
            {
                db.TbPlannedTrips.Add(tbplannedtrip);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, tbplannedtrip);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = tbplannedtrip.ptID }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/Default1/5
        public HttpResponseMessage DeleteTbPlannedTrip(int id)
        {
            TbPlannedTrip tbplannedtrip = db.TbPlannedTrips.Find(id);
            if (tbplannedtrip == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.TbPlannedTrips.Remove(tbplannedtrip);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, tbplannedtrip);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}