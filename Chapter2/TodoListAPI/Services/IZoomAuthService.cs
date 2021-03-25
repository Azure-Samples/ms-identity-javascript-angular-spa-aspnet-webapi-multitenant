using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoListAPI.BusinessModels;

namespace TodoListAPI.Services
{
    public interface IZoomAuthService
    {
        Task<Token> GetAccessTokenForAuthCode(string authCode);
    }
}
