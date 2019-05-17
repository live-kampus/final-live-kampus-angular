    
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AdminUser } from './admin-user';
import { UserProfile } from './profile';
import { User } from 'src/app/user/user';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService{

    baseUrl="http://localhost:8087/profile"

    constructor(private httpclient:HttpClient){}

    private data = new BehaviorSubject(undefined);

    user:User;

    getprofiles():Observable<UserProfile[]>{
        return this.httpclient.get<UserProfile[]>(this.baseUrl);
    }

    // findUserById(userId : number): Observable<UserProfile> {
    //     return this.httpclient.get<UserProfile>(this.baseUrl+ "/"+userId);
    // }

    findUserById(userId : string): Observable<User> {
        return this.httpclient.get<User>("http://localhost:8081/details/"+userId);
    }


    findAll():Observable<User[]>{
        return this.httpclient.get<User[]>("http://localhost:8081/findAll");

    }
    
    updateData(data:object[]){

        this.data.next(data);
    }
}