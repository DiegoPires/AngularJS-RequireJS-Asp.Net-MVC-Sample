using AngularAspNetSample.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace AngularAspNetSample.Core.Service
{
    public interface ICrudService<T> where T : Entidade, new()
    {
        int Create(T item);
        void Save();
        void Delete(int id);
        T Get(int id);
        IEnumerable<T> GetAll();
        IEnumerable<T> Where(Expression<Func<T, bool>> func, bool showDeleted = false);
    }
}
