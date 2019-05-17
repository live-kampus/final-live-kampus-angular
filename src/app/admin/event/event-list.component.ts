import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from './event.service';
import { UserEvent } from 'src/app/user/event/user-event';
import { FileResource } from 'src/app/user/event/fileResouces';
import { UserUploadImages } from 'src/app/user/profile/uploadImages';
import { Login } from 'src/app/welcome-login';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
    // selector: 'event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.css']
    
})
export class EventListComponent implements OnInit {
    

    event: UserEvent;
    events: UserEvent[];
    file: FileResource[];
    images: UserUploadImages;
    // url: object[] = [];
    url: Object;
    url2: object[] = [];
    selectedFile: File;
    user:Login;
    constructor(private eventService: EventService ,
        private route: ActivatedRoute, private sanitizer: DomSanitizer) { }
        
        
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


        }

        //     this.route.paramMap.subscribe((map) => {
        //         this.eventService.findEvent().subscribe((data) => {
        //             this.events = data;
        //             console.log(data);
        //         });
        //     });
        // }

        // delbtn(eventName: string){
        //     this.eventService.deleteEventByName(eventName).subscribe((data)=>{
        //         location.reload(true);
        //     })
    
    