using site.DB.Models;

namespace site.API.Cache
{
    public interface IResidentCache
    {
        public void Cache(Resident resident);
        public Resident GetCachedResident();
    }
}