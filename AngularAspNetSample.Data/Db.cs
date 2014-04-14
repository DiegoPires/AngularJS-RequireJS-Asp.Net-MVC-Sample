using AngularAspNetSample.Core.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularAspNetSample.Data
{
    public class Db : DbContext
    {
        public Db()
        {
            Database.SetInitializer<Db>(null);
        }

        public DbSet<Contato> Contato { get; set; }
        public DbSet<Evento> Evento { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }
    }
}
