using AngularAspNetSample.Core.Model;
using AngularAspNetSample.Core.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AngularAspNetSample.Data
{
    public class Repository<T> : IRepository<T> where T : Entidade, new()
    {
        protected readonly DbContext dbContext;

        public Repository(IDbContextFactory f)
        {
            dbContext = f.GetContext();
        }

        public void Save()
        {
            dbContext.SaveChanges();
        }

        public T Insert(T o)
        {
            //var obj = _unitofwork.Set<T>().Add(item);
            //return obj;

            var t = dbContext.Set<T>().Create();
            //t.InjectFrom(o);
            dbContext.Set<T>().Add(t);
            return t;
        }
        /*
         * public void Update(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentException("Cannot add a null entity.");
            }

            var entry = _unitofwork.Entry<T>(entity);
            var reflection = _unitofwork.Set<T>().Create().GetType();
            var keyName = reflection.GetProperties().Single(p => p.GetCustomAttributes(typeof(KeyAttribute), true).Count() > 0).Name;

            var pkey = reflection.GetProperty(keyName).GetValue(entity);

            if (entry.State == EntityState.Detached)
            {
                var set = _unitofwork.Set<T>();
                T attachedEntity = set.Find(pkey);  // access the key
                if (attachedEntity != null)
                {
                    var attachedEntry = _unitofwork.Entry(attachedEntity);
                    attachedEntry.CurrentValues.SetValues(entity);
                }
                else
                {
                    entry.State = EntityState.Modified; // attach the entity
                }
            }
        }
         * */

        public virtual void Delete(T o)
        {
            dbContext.Set<T>().Remove(o);
        }

        public T Get(int id)
        {
            return dbContext.Set<T>().Find(id);
        }

        public virtual IQueryable<T> Where(Expression<Func<T, bool>> predicate, bool showDeleted = false)
        {
            return dbContext.Set<T>().Where(predicate);
        }

        public virtual IQueryable<T> GetAll()
        {
            return dbContext.Set<T>();
        }
    }
}
