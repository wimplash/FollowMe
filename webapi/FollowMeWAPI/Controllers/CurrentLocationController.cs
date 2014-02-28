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
    public class CurrentLocationController : ApiController
    {
        private dmgtfollowmeContext db = new dmgtfollowmeContext();

        // GET api/CurrentLocation
        public IEnumerable<CurrentLocation> GetLocations(int setId)
        {
            IEnumerable<CurrentLocation> locs = from c in db.TbLocations
                                                join a in db.TbActiveTrips on c.locATID equals a.atID
                                                join u in db.TbUsers on a.atUID equals u.uID
                                                where c.locSet == setId
                                                select new CurrentLocation
                                                {
                                                    userName = u.uFirstName + " " + u.uLastName,
                                                    userEmail = u.uEmail,
                                                    userImgUrl = "",
                                                    latitude = c.locLat,
                                                    longtitude = c.locLong

                                                };
            return locs;
        }

        // GET api/CurrentLocation/5
        public TbLocation GetTbLocation(int id)
        {
            TbLocation tblocation = db.TbLocations.Find(id);
            if (tblocation == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return tblocation;
        }

        // PUT api/CurrentLocation/5
        public HttpResponseMessage PutTbLocation(int id, TbLocation tblocation)
        {
            if (ModelState.IsValid && id == tblocation.locID)
            {
                db.Entry(tblocation).State = EntityState.Modified;

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

        // POST api/CurrentLocation
        public HttpResponseMessage PostTbLocation(TbLocation tblocation)
        {
            if (ModelState.IsValid)
            {
                db.TbLocations.Add(tblocation);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, tblocation);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = tblocation.locID }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/CurrentLocation/5
        public HttpResponseMessage DeleteTbLocation(int id)
        {
            TbLocation tblocation = db.TbLocations.Find(id);
            if (tblocation == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.TbLocations.Remove(tblocation);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, tblocation);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}