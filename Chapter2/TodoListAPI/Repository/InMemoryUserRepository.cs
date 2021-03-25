using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoListAPI.BusinessModels;

namespace TodoListAPI.Repository
{
    public class InMemoryUserRepository : IUserRepository
    {
        private ConcurrentDictionary<string, User> userDictionary = new ConcurrentDictionary<string, User>();

        public Task<bool> AddOrUpdate(User user)
        {
            userDictionary.AddOrUpdate(user.UserName, user, (key, _) => user);
            return Task.FromResult(true);
        }

        public Task<User> GetUser(string userName)
        {
            User user = null;
            if(userDictionary.ContainsKey(userName))
            {
                user = userDictionary[userName];
            }
            return Task.FromResult(user);
        }

        public Task<bool> SaveUser(User user)
        {
            userDictionary.GetOrAdd(user.UserName, user);
            return Task.FromResult(true);
        }


    }
}
