import { Component } from '@angular/core';
import { Room } from './room';
import { RoomService } from './room.service';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
    templateUrl:"./roomspace.component.html",
    styleUrls:["./roomspace.component.css"]
    //selector:"roomspace"
})

export class RoomSpaceComponent {

    adminroom:Room;
//roomName:String;
adminrooms:Room[];

constructor( private roomService:RoomService,
   private routes: ActivatedRoute,
   private route:Router) { }
ngOnInit():void{
   this.routes.paramMap.subscribe((map)=>{
       this.roomService.findAll().subscribe((data)=>{
           this.adminrooms=data;
           console.log(data);

       });
   });
}

deleteRoom(adminroom:Room){
    this.roomService.deleteByName(adminroom.roomName).subscribe((data)=>{
        this.route.navigate['/admin/roomspace'];
        location.reload(true);
    })
}
 


addNewRoom(){
   console.log("success");
   this.roomService.addNewRoom(this.adminroom).subscribe((data)=>{
       console.log(this.adminroom);
       console.log("success");
       if(data !=null) {
           alert("room added successfully");
           this.route.navigate["/admin/rooms"];
           var element = document.getElementById("addRoom");
           element.classList.remove("show");
           document.querySelector('.modal-backdrop').classList.remove("fade","modal-backdrop");
       }
   });
}
}