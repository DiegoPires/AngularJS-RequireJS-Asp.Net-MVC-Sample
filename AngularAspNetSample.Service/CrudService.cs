using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AngularAspNetSample.Core.Model;
using AngularAspNetSample.Core.Repository;
using AngularAspNetSample.Core.Service;

namespace AngularAspNetSample.Service
{
    public class CrudService<T> : ICrudService<T> where T : Entidade, new()
    {
        protected IRepository<T> repo;

        public CrudService(IRepository<T> repo)
        {
            this.repo = repo; 
        }

        public IEnumerable<T> GetAll()
        {
            return repo.GetAll();
        }

        public T Get(int id)
        {
            return repo.Get(id);
        }

        public virtual int Create(T item)
        {
            var newItem = repo.Insert(item);
            repo.Save();
            return newItem.Id;
        }

        public void Save()
        {
            repo.Save();
        }

        public virtual void Delete(int id)
        {
            repo.Delete(repo.Get(id));
            repo.Save();
        }

        public IEnumerable<T> Where(Expression<Func<T, bool>> predicate, bool showDeleted = false)
        {
            return repo.Where(predicate, showDeleted);
        }
    }
}
