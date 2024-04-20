using SSLiquour.Models;

namespace SSLiquour.Interfaces
{
    public interface ILiquorService
    {
        public List<Liquor> GetLiquorDetails();
        public int GetCurrentUserId();
        public Liquor GetLiquor(int id);
        public Liquor AddLiquor(Liquor liquor);
        public Liquor UpdateLiquor(Liquor liquor);
        public bool DeleteLiquor(int id);
    }
}
