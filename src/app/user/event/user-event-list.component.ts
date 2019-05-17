import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserEvent } from './user-event';
import { UserUploadImages } from '../profile/uploadImages';
import { DomSanitizer } from '@angular/platform-browser';

import { Login } from 'src/app/welcome-login';
import { FileResource } from './fileResouces';



@Component({
    templateUrl: './user-event-list.component.html',
    styleUrls: ['./user-event-list.component.css']
})
export class UserEventlistComponent implements OnInit {
    
    
    event: UserEvent;
    events: UserEvent[];
    file: FileResource[];
    images: UserUploadImages;
    // url: object[] = [];
    url: Object;
    url2: object[] = [];
    selectedFile: File;
    user:Login;
    constructor(private eventService: EventService,
        private route: Router, private sanitizer: DomSanitizer) { }
        
        ngOnInit(): void {
            this.event = new UserEvent();
            
            this.eventService.fetchAll().subscribe((data) => {
                this.file = data;
                let myurl;
                let count = 0;
                var loop = (id: number) => {
                    this.eventService.fetchAllById(this.file[id].id).subscribe((result) => {
                        var newBlob = new Blob([result], { type: "application/json" });
                        const x = window.URL.createObjectURL(newBlob);
                        myurl = this.sanitizer.bypassSecurityTrustUrl(x);
                        this.url2.push(myurl);
                        if (count < this.file.length-1) {
                            count++;
                            loop(count);
                        }
                    });
                    
                }
                loop(count);
            });
            
        }
        
        
        
        
        uploadImage() {
            const fd = new FormData();
            let user1= JSON.parse(sessionStorage.getItem("user"));
            // console.log(user1);
            // console.log(user1.email);
            fd.append('email', user1.email);
            fd.append('eventName', this.event.eventName);
            fd.append('eventVenue', this.event.eventVenue);
            fd.append('eventDate', this.event.eventDate);
            // fd.append('eventTime',this.event.eventTime);
            fd.append('eventhostedBy', this.event.eventhostedBy);
            fd.append('filePath', this.selectedFile, this.selectedFile.name);
            this.eventService.uploadImages(fd).subscribe((data) => {
            });
            
        }
        onFileSelected(event) {
            this.selectedFile = <File>event.target.files[0];
        }
        eventR(eventName: string) {
            
            this.eventService.getEventByName(eventName).subscribe((data) => {
                this.event = data;
            })
        }
        
        
    }
    