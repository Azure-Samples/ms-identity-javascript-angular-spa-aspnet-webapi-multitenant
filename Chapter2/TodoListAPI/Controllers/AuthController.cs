using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoListAPI.Models;
using TodoListAPI.Repository;
using TodoListAPI.Services;

namespace TodoListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        static readonly string[] scopeRequiredByApi = new string[] { "access_as_user" };
        private readonly IZoomAuthService _zoomAuthService;
        private readonly IUserRepository _userRespository;

        public AuthController(IZoomAuthService zoomAuthService, IUserRepository userRepository)
        {
            this._zoomAuthService = zoomAuthService;
            this._userRespository = userRepository;
        }
        

        [HttpPost]
        public async Task<ActionResult<string>> FetchAccessTokenForAuthCode(AuthCode authCode)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            var currentUserUPN = HttpContext.User.Identity.Name;
            if (authCode.App.Equals("zoom"))
            {
                var token = await this._zoomAuthService.GetAccessTokenForAuthCode(authCode.Code);
                var user = await this._userRespository.GetUser(currentUserUPN);
                if(user == null)
                {
                    user = new TodoListAPI.BusinessModels.User()
                    {
                        UserName = currentUserUPN,
                    };
                }
                user.ZoomAccessToken = token.AccessToken;
                user.ZoomRefreshToken = token.RefreshToken;
                await this._userRespository.AddOrUpdate(user);
            } 
            else if (authCode.App.Equals("MicrosoftGraph"))
            {

            }
            return "success";
        } 

        private async Task<string> FetchZoomAccessTokenAsync(string authCode)
        {
            return null;
        }
    }
}
