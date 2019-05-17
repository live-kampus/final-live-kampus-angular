import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './app.service';
import { AuthenticateService } from './user-authenticate.service';
import { Login } from './welcome-login';




@Component({
  templateUrl:'./welcome-login.component.html',
  styleUrls: ['./welcome-login.component.css']
})
export class WelcomeLoginComponent{
  user: Login;
  invalidLogin=false;
  
  submitted: boolean;
  
  constructor(private router: Router, private loginService: LoginService , private authenticateService:AuthenticateService) { }
  
  ngOnInit() {
    this.user = new Login();
  }
  
  
  loginUser() {
    let password = (<HTMLInputElement>document.getElementById("password")).value;
    let email = (<HTMLInputElement>document.getElementById("email")).value;
    this.loginService.loginUser(email, password).subscribe((data) => {
      this.user=data;
      if (data != null) {
        this.invalidLogin = this.authenticateService.authenticate(true,email);
        if(data.email == "admin" && data.password == "admin"){
          sessionStorage.setItem('user',JSON.stringify(this.user));
          alert('logging in') 
          this.router.navigate(["admin"]);
        }
        else {
          sessionStorage.setItem('user',JSON.stringify(this.user));
          alert('logging in') 
          this.router.navigate(["user"]);
        }
      }
      else{
        alert("Invalid username or password");
        this.invalidLogin = true;
      }
    },(err) => {
      
      alert("Invalid credentials");
      this.user.email = "";
      this.user.password = "";
      
    });
    
    
  }
  
}