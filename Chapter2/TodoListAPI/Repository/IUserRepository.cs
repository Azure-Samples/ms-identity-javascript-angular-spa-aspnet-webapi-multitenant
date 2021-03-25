using System.Threading.Tasks;
using TodoListAPI.BusinessModels;

namespace TodoListAPI.Repository
{
    public interface IUserRepository
    {
        Task<bool> SaveUser(User user);

        Task<User> GetUser(string userName);

        Task<bool> AddOrUpdate(User user);
    }
}
