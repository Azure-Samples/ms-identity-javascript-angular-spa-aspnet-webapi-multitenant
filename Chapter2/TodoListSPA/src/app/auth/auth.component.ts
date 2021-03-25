import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "../auth.servive";
import { AuthCode } from "../models/authcode";

@Component({
    selector: 'auth-component',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
  })
  export class AuthComponent implements OnInit {
    
    constructor(private route : ActivatedRoute,
        private authService : AuthService,
        private router : Router) { }
 
    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            var authCode = params['code']; 
            if(sessionStorage.getItem('current_login_attempt') === 'zoom')
            {
                console.log("current_login_attempt is set to zoom");
                sessionStorage.removeItem('current_login_attempt');
                var code = new AuthCode();
                code.app = "zoom";
                code.code = authCode;
                this.authService.postAuthCode(code).subscribe(
                    (response) => {
                        console.log("success response " );
                        console.log(response);
                        this.router.navigate(['../migration-view'], { relativeTo: this.route });
                    },
                    (error) => {
                        console.log("error when fetching accesstoken for zoom auth code");
                        console.log(error)
                        this.router.navigate(['../migration-view'], { relativeTo: this.route });
                    }
                );            
            }           
        });
    }

    
  }