using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using SSLiquour.Context;
using SSLiquour.Interfaces;
using SSLiquour.Models;
using System.Security.Claims;

namespace SSLiquour.Services
{
    public class LiquorService : ILiquorService
    {

        private readonly JwtContext _jwtContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public LiquorService(JwtContext jwtContext, IHttpContextAccessor httpContextAccessor)
        {
            _jwtContext = jwtContext;
            _httpContextAccessor = httpContextAccessor;
        }

        public int GetCurrentUserId()
        {
            var userIdValue = _httpContextAccessor.HttpContext.User.FindFirst("Id")?.Value;

            if (int.TryParse(userIdValue, out int userId))
            {
                return userId;
            }
            // Handle the case where userId is not a valid integer
            // Log the error or handle it according to your application's needs
            throw new InvalidOperationException("User ID is not in a valid format or is missing.");
        }


        public Liquor AddLiquor(Liquor liquor)
        {

            liquor.UserID = GetCurrentUserId();
            var liq = _jwtContext.Liquors.Add(liquor);
            _jwtContext.SaveChanges();
            return liq.Entity;
        }

        public bool DeleteLiquor(int id)
        {
            try
            {

                int userId = GetCurrentUserId();
                var liq = _jwtContext.Liquors.SingleOrDefault(l => l.Id == id && l.UserID == userId);
            if (liq == null)
                throw new Exception("User Not Found");
            else
            {
                _jwtContext.Liquors.Remove(liq);
                _jwtContext.SaveChanges();
                return true;
            }
            } catch (Exception ex)
            {
                return false;
            }
        }

        public Liquor GetLiquor(int id)
        {
            int userId = GetCurrentUserId();
            var liq = _jwtContext.Liquors.SingleOrDefault(l => l.Id == id && l.UserID == userId);
            return liq;
        }

        public List<Liquor> GetLiquorDetails()
        {
            // Try to get the user ID, but do not throw an exception if it's not present
            var userIdValue = _httpContextAccessor.HttpContext.User.FindFirst("Id")?.Value;
            int userId;
            if (!int.TryParse(userIdValue, out userId))
            {
                // Return all liquors if there is no valid user ID (e.g., user not logged in)
                return _jwtContext.Liquors.ToList();
            }

            // Return only the liquors that belong to the logged-in user
            return _jwtContext.Liquors.Where(l => l.UserID == userId).ToList();
        }


        public Liquor UpdateLiquor(Liquor liquor)
        {
            int userId = GetCurrentUserId();
            var existingLiquor = _jwtContext.Liquors.SingleOrDefault(l => l.Id == liquor.Id && l.UserID == userId);
            if (existingLiquor == null)
                throw new Exception("Liquor not found or not authorized to update.");
            existingLiquor.Name = liquor.Name;
            existingLiquor.brand = liquor.brand;
            existingLiquor.category = liquor.category;
            existingLiquor.abv = liquor.abv;
            existingLiquor.volume = liquor.volume;
            existingLiquor.CountryOfOrigin = liquor.CountryOfOrigin;
            existingLiquor.stockAmount = liquor.stockAmount;
            existingLiquor.Price = liquor.Price;
            existingLiquor.UserID = userId;


            _jwtContext.Liquors.Update(existingLiquor);
            _jwtContext.SaveChanges();
            return existingLiquor;
        }
    }
}
