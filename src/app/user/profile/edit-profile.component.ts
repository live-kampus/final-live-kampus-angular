import { Component } from '@angular/core';
import { ProfileService } from './profile.service';
import { Route, Router } from '@angular/router';
import { UserProfile } from './profile';

@Component({
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class EditProfileComponent {

    profile:UserProfile;


    constructor(private profileService: ProfileService,
        private route: Router) {}
    
        
      ngOnInit():void{
        //we have to read the route parameters
    
            this.profile = new UserProfile();
        };
    
      
        editProfile(profile:UserProfile){
          this.profileService.editProfile(profile).subscribe((data)=>{
            this.profile=data;
          })
        }
}
