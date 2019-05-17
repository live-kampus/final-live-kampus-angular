import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from './profile';
import { UserUploadImages } from './uploadImages';



@Injectable()
export class ProfileService{


    baseUrl = "http://localhost:8087/profile/";
    baseUrl1 = "http://localhost:9055/profile/";

    constructor(private httpclient:HttpClient){}

    getprofile():Observable<UserProfile[]>{
        return this.httpclient.get<UserProfile[]>(this.baseUrl);
    }

    findProfileByEmail(): Observable<UserProfile> {      
        let emailId=JSON.parse(sessionStorage.getItem('user')); 
        return this.httpclient.get<UserProfile>(this.baseUrl + emailId.email);
    }

    findProfileByUserName(): Observable<UserProfile> {        
        return this.httpclient.get<UserProfile>(this.baseUrl1);

    }

    uploadImages(fd:FormData):Observable<UserUploadImages>{
        alert(fd.get("email"));
        return this.httpclient.post<UserUploadImages>(this.baseUrl1+"upload/"+fd.get("myEmail"),fd);
    }

    fetch(email:String):Observable<Blob>{
            return this.httpclient.get(this.baseUrl1+"save/"+email, {responseType: 'blob'});
        }

    editProfile(profile:UserProfile): Observable<UserProfile>{
        return this.httpclient.put<UserProfile>(this.baseUrl+"edit",profile);
    }

    
}