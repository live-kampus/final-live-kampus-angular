import { Component } from '@angular/core';
import { ProfileService } from './profile.service';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from './profile';
import { User } from '../user';
import { UserUploadImages } from './uploadImages';
import { DomSanitizer } from '@angular/platform-browser';
import { FileResource } from './fileResource';

@Component({
    templateUrl:'./profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent{
    profile:UserProfile;
    user:User;
    file: FileResource[];
    images: UserUploadImages;
    // url: object[] = [];
    url: Object;
    url2: object[] = [];
    selectedFile: File;
    constructor(private profileService:ProfileService,private route:ActivatedRoute,
        private sanitizer: DomSanitizer){}

    ngOnInit(){

        this.user = JSON.parse(sessionStorage.getItem('user'));

        
        // this.profileService.findProfileByEmail().subscribe((data)=>{
        //     console.log(data);
        //     this.profile=data;
        // },err=>{
        //     console.log(err);
        // })

        this.profileService.findProfileByUserName().subscribe((data) => {
            console.log(data);
            this.selectedFile;
            this.profile = data;
        }, err => {
            console.log(err);
        })


        this.images = new UserUploadImages();

        let user3 = JSON.parse(sessionStorage.getItem('user'));
        let myEmail = user3.email;
        this.profileService.fetch(myEmail).subscribe((data) => {
            var newBlob = new Blob([data], { type: "application/json" });
            console.log(newBlob);
            const x = window.URL.createObjectURL(newBlob);
            // this.url.push(this.sanitizer.bypassSecurityTrustUrl(x));
            this.url=this.sanitizer.bypassSecurityTrustUrl(x);
            console.log(data);
            console.log(this.url);
            console.log(x);
        });
}

onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
   // alert("divya")
   // alert(sessionStorage.getItem('city'))
    let user3 = JSON.parse(sessionStorage.getItem('user'));
    let myEmail = user3.email;
    alert(myEmail);
    //alert(sessionStorage.getItem("email"))
  //  alert(JSON.parse(JSON.stringify(sessionStorage.getItem('myEmail'))))
    const fd = new FormData();
    fd.append('filePath', this.selectedFile, this.selectedFile.name);
    fd.append('myEmail', myEmail);

    alert(fd.get('myEmail'));
    alert(this.selectedFile.name);
    this.profileService.uploadImages(fd).subscribe((data) => {
        console.log(event);
    });
    this.profileService.fetch(myEmail).subscribe((data) => {
        var newBlob = new Blob([data], { type: "application/json" });
        console.log(newBlob);
        const x = window.URL.createObjectURL(newBlob);
        // this.url.push(this.sanitizer.bypassSecurityTrustUrl(x));
        this.url=this.sanitizer.bypassSecurityTrustUrl(x);
        console.log(data);
        console.log(this.url);
        console.log(x);
    });

}
}