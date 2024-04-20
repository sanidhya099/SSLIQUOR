using SSLiquour.Models;
using SSLiquour.RequestModels;

namespace SSLiquour.Interfaces
{
    public interface IAuthService
    {
        User AddUser(User user);

        string Login(LoginRequest loginRequest);


    }
}
