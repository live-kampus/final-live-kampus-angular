import { Component, OnInit } from '@angular/core';
import { UserRoom } from './user-room';
import { UserRoomService } from './user-roomspace.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './user-roomspace.component.html',
    styleUrls: ['./user-roomspace.component.css']
})
export class UserRoomSpaceComponent implements OnInit{

    room:UserRoom;
    rooms:UserRoom[];
    constructor(private userRoomService:UserRoomService,
        private routes:ActivatedRoute,
        private route:Router) {}
            ngOnInit(): void {
                this.routes.paramMap.subscribe((map)=>{
                    this.userRoomService.findAll().subscribe((data)=> {
                        this.rooms=data;
                        console.log(data);
                });
            });
            }
            addNewRoom(){
                console.log("success");
                this.userRoomService.addNewRoom(this.room).subscribe((data)=>{
                    console.log(this.room);
                    console.log("success");
                    if(data !=null) {
                        alert("room added successfully");
                        this.route.navigate["/user/rooms"];
                        var element = document.getElementById("addRoom");
                        element.classList.remove("show");
                        document.querySelector('.modal-backdrop').classList.remove("fade","modal-backdrop");
                    }
                });
            }
        

}