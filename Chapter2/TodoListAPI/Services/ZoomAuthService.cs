using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using TodoListAPI.BusinessModels;
using TodoListAPI.Services.Responses;

namespace TodoListAPI.Services
{
    public class ZoomAuthService : IZoomAuthService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;

        public ZoomAuthService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
            _httpClient.BaseAddress = new Uri(_config["ZoomBaseUrl"]);
            _httpClient.DefaultRequestHeaders
                .Accept
                .Add(new MediaTypeWithQualityHeaderValue("application/json"));
            
        }
       
        public async Task<Token> GetAccessTokenForAuthCode(string authCode)
        {
            var zoomUrl = _config["ZoomBaseUrl"] + _config["ZoomTokenPath"] + GetQueryString(authCode);
            var reqMessage = new HttpRequestMessage(HttpMethod.Post, _config["ZoomTokenPath"] + GetQueryString(authCode));            
            reqMessage.RequestUri = new Uri(zoomUrl);
            reqMessage.Headers.Add("Authorization", "Basic " + GetZoomClientCred());
            var responseMessage = await _httpClient.SendAsync(reqMessage);
            var response = await responseMessage.Content.ReadAsStringAsync();
            var token = JsonConvert.DeserializeObject<Token>(response);
            return token;
        }

        private string GetQueryString(string authCode)
        {
            return "?grant_type=authorization_code"
                + "&redirect_uri=" + _config["RedirectUri"] 
                + "&code=" + authCode;
        }

        private string GetZoomClientCred()
        {
            var secret = _config["ZoomClientId"] + ":" + _config["ZoomAppSecret"];
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(secret);
            return Convert.ToBase64String(plainTextBytes);
        }
    }
}
