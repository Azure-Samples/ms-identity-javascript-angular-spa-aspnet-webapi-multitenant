using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoListAPI.Models
{
    public class AppConfiguration
    {
        public string ZoomAppId { get; set; }

        public string AADAppId { get; set; }

        public AppConfiguration()
        {
            // default App Id
            ZoomAppId = "hgm9UQHyQPG28XsemDlWKg";
            AADAppId = "6d8d39e8-ccb1-498d-99a0-955a57bd344d";
        }

    }
}
