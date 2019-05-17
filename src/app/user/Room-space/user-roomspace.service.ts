import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRoom } from './user-room';

@Injectable()
export class UserRoomService{
    
    baseUrl = "http://localhost:8000/";

    constructor(private http:HttpClient){}

    // findBookBycatagory(category:string):Observable<Event[]>{
    //     return this.http.get<Event[]>(this.baseUrl +"books/"+category);
    // }

    
    findAll(): Observable<UserRoom[]> {
        return this.http.get<UserRoom[]>(this.baseUrl + "room");
    }

    addNewRoom(room:UserRoom):Observable<UserRoom>{
        return this.http.post<UserRoom>(this.baseUrl + "room",room);
    }
    

}