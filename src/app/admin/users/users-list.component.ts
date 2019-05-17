import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from './profile';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user/user';
import { ProfileService } from 'src/app/user/profile/profile.service';


@Component({
    // selector:'user-list',
    templateUrl:'./users-list.component.html',
    styleUrls:['./users-list.component.css']
})
export class UserListComponent{

    // profile:UserProfile[];
    profile:User[];

    user:User;


    constructor(private profileService:UserService,private route:ActivatedRoute){}

    ngOnInit(){


        this.profileService.findAll().subscribe((data)=>{
            console.log(data);
            this.profile=data;
        },err=>{
            console.log(err);
        })
}


viewbtn(email:string){
    this.profileService.findUserById(email).subscribe((data)=>{
      this.user=data;
      alert(this.user.email);
    })
  }

}