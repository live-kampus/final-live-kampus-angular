import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserEvent } from './user-event';
import { FileResource } from './fileResouces';

@Injectable()
export class EventService{
    
    baseUrl = "http://localhost:8085/";
    baseUrl1="http://localhost:9020/"

    constructor(private http:HttpClient){}
    
    findAll(): Observable<UserEvent[]> {
        return this.http.get<UserEvent[]>(this.baseUrl + "event");
    }

    addNewEvent(event:UserEvent):Observable<UserEvent>{
        return this.http.post<UserEvent>(this.baseUrl + "event",event);
    }

    getEventByName(eventName:string):Observable<UserEvent>{
        return this.http.get<UserEvent>(this.baseUrl + "event/" + eventName) 
    }

    uploadImages(fd:FormData):Observable<UserEvent>{
        return this.http.post<UserEvent>(this.baseUrl1+"upload/"+fd.get("email"),fd);
    }

    fetchAllById(id: String):Observable<Blob>{
        return this.http.get(this.baseUrl1+"/retrieve/"+id, {responseType: 'blob'});
    }
    
    fetchAll():Observable<FileResource[]>{
        return this.http.get<FileResource[]>(this.baseUrl1+"save");
    }

}   