import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileResource } from 'src/app/user/event/fileResouces';

@Injectable()
export class EventService {
    baseUrl = 'http://localhost:8085/'
    baseUrl1="http://localhost:9020/"


    constructor(private http: HttpClient ) {}
    findEvent(): Observable<Event[]> {

        return this.http.get<Event[]>(this.baseUrl+"event");

    }

    findEventByName(eventName:string): Observable<Event> {
        return this.http.get<Event>(this.baseUrl+"event/"+eventName);
    }

    deleteEventByName(eventName: string):Observable<Event>{
        return this.http.delete<Event>(this.baseUrl+"event/"+eventName);
    }

    fetchAllById(id: String):Observable<Blob>{
        return this.http.get(this.baseUrl1+"/retrieve/"+id, {responseType: 'blob'});
    }
    
    fetchAll():Observable<FileResource[]>{
        return this.http.get<FileResource[]>(this.baseUrl1+"save");
    }

}
