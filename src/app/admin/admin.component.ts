import { Component } from '@angular/core';
import { Login } from '../welcome-login';

@Component({
   // selector: "admin-panel",
   templateUrl: "./admin.component.html",
   styleUrls: ["./admin.component.css"]
})
export class AdminComponent{

   user:Login;

   constructor(){

       this.user=JSON.parse(sessionStorage.getItem("user"));
       console.log(this.user);
   }

}