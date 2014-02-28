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
    public class TripTemplateController : ApiController
    {
        private dmgtfollowmeContext db = new dmgtfollowmeContext();

        // GET api/TripTemplate
        public IEnumerable<TripTemplate> GetTemplates()
        {
            IEnumerable<TripTemplate> tripTemplates = from t in db.TbTemplates
                                                      select new TripTemplate
                                                      {
                                                          id = t.tID,
                                                          name = t.tName,
                                                          description = t.tDesc,
                                                          pois = (from p in db.TbPointOfInterests
                                                                 where p.poiTID == t.tID
                                                                 select new PointOfInterest { 
                                                                     id = p.poiID,
                                                                     lat = p.poiLat,
                                                                     longt = p.poiLong,
                                                                     placeDesc = p.poiPlaceDesc,
                                                                     placeName = p.poiPlaceName,
                                                                     seq = p.poiInterestSeq

})
                                                      };

            return tripTemplates;
        }

        // GET api/TripTemplate/5
        public TbTemplate GetTbTemplate(int id)
        {
            TbTemplate tbtemplate = db.TbTemplates.Find(id);
            if (tbtemplate == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return tbtemplate;
        }

        // PUT api/TripTemplate/5
        public HttpResponseMessage PutTbTemplate(int id, TbTemplate tbtemplate)
        {
            if (ModelState.IsValid && id == tbtemplate.tID)
            {
                db.Entry(tbtemplate).State = EntityState.Modified;

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

        // POST api/TripTemplate
        public HttpResponseMessage PostTbTemplate(TbTemplate tbtemplate)
        {
            if (ModelState.IsValid)
            {
                db.TbTemplates.Add(tbtemplate);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, tbtemplate);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = tbtemplate.tID }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/TripTemplate/5
        public HttpResponseMessage DeleteTbTemplate(int id)
        {
            TbTemplate tbtemplate = db.TbTemplates.Find(id);
            if (tbtemplate == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.TbTemplates.Remove(tbtemplate);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, tbtemplate);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}