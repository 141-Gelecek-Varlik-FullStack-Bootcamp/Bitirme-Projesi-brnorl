using System;
using Microsoft.Extensions.Caching.Memory;
using site.DB.Models;

namespace site.API.Cache
{
    public class ResidentCache : IResidentCache
    {
        private const string KEY = "resident";
        private readonly IMemoryCache memoryCache;
        public ResidentCache(IMemoryCache _memoryCache)
        {
            memoryCache = _memoryCache;
        }
        public void Cache(Resident resident)
        {
            var option = new MemoryCacheEntryOptions
            {//cache için ayarlamalar, cache'de tutulacak verinin yaşam süresi ayarlanır.
                SlidingExpiration = TimeSpan.FromDays(1),
                AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(1),

            };
            memoryCache.Set<Resident>(KEY, resident, option);
        }
        public Resident GetCachedResident()
        {
            Resident resident = new Resident();
            if (!memoryCache.TryGetValue(KEY, out resident))
            {
                return resident;
            }
            return memoryCache.Get<Resident>(KEY);
        }
    }
}