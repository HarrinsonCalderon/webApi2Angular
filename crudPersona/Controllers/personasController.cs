using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using crudPersona.Models;

namespace crudPersona.Controllers
{
    public class personasController : ApiController
    {
        private mvcapicrudEntities db = new mvcapicrudEntities();

        // GET: api/personas
        public IQueryable<persona> Getpersona()
        {
            return db.persona;
        }

        // GET: api/personas/5
        [ResponseType(typeof(persona))]
        public IHttpActionResult Getpersona(int id)
        {
            persona persona = db.persona.Find(id);
            if (persona == null)
            {
                return NotFound();
            }

            return Ok(persona);
        }

        // PUT: api/personas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putpersona(int id, persona persona)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != persona.id)
            {
                return BadRequest();
            }

            db.Entry(persona).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!personaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/personas
        [ResponseType(typeof(persona))]
        public IHttpActionResult Postpersona(persona persona)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.persona.Add(persona);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = persona.id }, persona);
        }

        // DELETE: api/personas/5
        [ResponseType(typeof(persona))]
        public IHttpActionResult Deletepersona(int id)
        {
            persona persona = db.persona.Find(id);
            if (persona == null)
            {
                return NotFound();
            }

            db.persona.Remove(persona);
            db.SaveChanges();

            return Ok(persona);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool personaExists(int id)
        {
            return db.persona.Count(e => e.id == id) > 0;
        }
        [HttpGet]
        public IEnumerable<persona> cargarPersona()
        {
            var db = new mvcapicrudEntities();
            return db.persona.ToList();
        }
        [HttpPost]
        public Reply login(persona pe)
        {
            string nombre = pe.nombre;
            Reply r=new Reply();
            List<persona> l = null;
            try
            {
                using (mvcapicrudEntities bd = new mvcapicrudEntities())
                {
                    l = (from a in bd.persona
                         where a.nombre==nombre
                         select a
                         ).ToList();
                }
                if (l.Count() > 0)
                {
                    r.result = 1;
                    r.menssage = "Se encontro";
                    //Generar token
                    r.data = Guid.NewGuid().ToString();
                    //actualizamos el token del usuario logiado
                    persona p = l.First();
                    p.token = r.data.ToString();
                    using (mvcapicrudEntities bd = new mvcapicrudEntities())
                    {
                        bd.Entry(p).State = System.Data.Entity.EntityState.Modified;
                        bd.SaveChanges();
                    }
                }
                else
                {
                    r.menssage = "No se encontro";
                }
            }
            catch (Exception e)
            {
                r.result = 0;
                r.menssage = "Ha ocurrido un error";
            }
           

                return r;
        }
        [HttpGet]
       public Reply verificarToken(string tok)

        {
          
            Reply rta = new Reply();
            string token = tok;
            List<persona> l = null;
             l = (from a in db.persona
                     where a.token == token
                     select a).ToList();
            if (l.Count() > 0) rta.result = 1;
            else rta.result = 0;
                return rta;
        }

    }
}