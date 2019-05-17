import { Component } from '@angular/core';
import { UserService } from './user.service';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from './profile';
import { User } from 'src/app/user/user';

@Component({
    selector:'user-details',
    templateUrl:'./users-details.component.html',
    styleUrls:['./users-details.component.css']
})
export class UserDetailsComponent{


    // profile:UserProfile;
    profile:User;

    constructor(private userService:UserService,
        private route: ActivatedRoute) { }


        ngOnInit():void{
            //we have to read the route parameters
            this.route.paramMap.subscribe((map)=>{
                let userId=String(map.get("email")); 
                console.log(userId); 
                this.userService.findUserById(userId).subscribe((data)=>{
                    this.profile=data;
                //    alert(this.profile.profile.userName);
                })  
            });
            
    //    this.route.paramMap.subscribe((map)=>{
    //        let email = map.get("email");
    //        this.userService.findUserById(email).subscribe(())
    //    })
                
                
                }

    // usersdetails= [
    //     {
    //         "name": "Akshay",
    //         "email":"gsdkf@gmail.com",
    //         "contact":1523641256,
    //         "address":"WebGLShaderPrecisionForma",
    //         "city":"",
    //         "state":"",
    //         "gender":"",
    //         "school":"",
    //         "dob":"",
    //         "bio":""
    //     }
    // ]
}