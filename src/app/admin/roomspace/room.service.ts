import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from './room';

@Injectable()
export class RoomService{
    baseUrl="http://localhost:8000/"

    constructor(private http:HttpClient){}

    
    findAll():Observable<Room[]>{

        return this.http.get<Room[]>(this.baseUrl + "room");

    }
    findByName(room:String): Observable<Room>{
        return this.http.get<Room>(this.baseUrl + "room/"+room);
    }

    addNewRoom(room:Room): Observable<Room[]> {
        return this.http.post<Room[]>(this.baseUrl + "room",room);
    }
    deleteByName(roomName:String): Observable<Room>{
        return this.http.delete<Room>(this.baseUrl + "room/"+ roomName);
    }
}