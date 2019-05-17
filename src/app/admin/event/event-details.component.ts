import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { ActivatedRoute } from '@angular/router';

@Component({

    //selector: 'event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponents implements OnInit {

    event: Event;

    constructor(private eventService: EventService,
                private route: ActivatedRoute) { }


        ngOnInit(): void {
            //we have to read the route parameters
            this.route.paramMap.subscribe((map) => {
                // tslint:disable-next-line:prefer-const
                let eventId = (map.get('eventName'));
                console.log(eventId);
                this.eventService.findEventByName(eventId).subscribe((data) => {
                    this.event = data;
                    console.log(data);
                });
            });
}
}
