import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncidentsService } from '../data/incidents.service';
import { NotificationsService } from '../data/notifications.service';
import { TechniciansService } from '../data/technicians.service';
import { UserService } from '../data/user.service';

@Component({
  selector: 'app-available-technicians',
  templateUrl: './available-technicians.component.html',
  styleUrls: ['./available-technicians.component.css']
})
export class AvailableTechniciansComponent implements OnInit {

  constructor(@Inject(forwardRef(() => TechniciansService)) public techniciansServices : any,
  @Inject(forwardRef(() => NotificationsService)) public notificationServices : any,
  @Inject(forwardRef(() => UserService)) public userServices : any,
  @Inject(forwardRef(() => IncidentsService)) public incidentsService : any, private route : Router) { }

  success_message = '';
  technicians = [];
  selectedAddress = null;
  user = null;
  incidentDetails = null;

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.incidentDetails = JSON.parse(sessionStorage.getItem('incidentDetails'));

    console.log(this.user);
    // let address = localStorage.getItem('address');
        let address = 'Pretoria';

    let addedIncidentId = localStorage.getItem('id');

    console.log(address);
    console.log(addedIncidentId);

    this.selectedAddress = address;

    if(address != null){
      this.techniciansServices.retrieveTechnicians(address).subscribe(data => {
        if(data != null){
          console.log('Technician Details');
          this.technicians = data;
          console.log(data);
        }
      });
    }
  }

  selectTechnician(technician){
    console.log(technician);

    let notification = {
      dateCreated : new Date(),
      notificationName : "New Incident Logged",
      notificationDescription : this.user.firstName + ' ' + this.user.lastName + ' has logged an issue with you, Please review',
      userId : this.user.id,
      isViewed : false
    }

    this.notificationServices.saveNotification(notification).subscribe(data => {
      if(data != null){
        console.log(data);
      }
    });

    let userDetails = null;
    console.log(technician.userId);
    this.userServices.retrieveUserUsingId(technician.userId).subscribe(data => {
      if(data != null){
        this.incidentDetails.technicianName = data.firstName + ' ' + data.lastName;
      }else{
        console.log('No User Found');

      }
    });

    console.log(this.incidentDetails)
    console.log(userDetails)

    this.incidentDetails.technicianId = technician.userId;
    this.incidentDetails.status = 'Waiting for technician to respond';


    this.incidentsService.saveIncident(this.incidentDetails).subscribe(data => {
      if(data != null){
        console.log(this.incidentDetails);
        this.route.navigate(['/home']); 

      }
    });
  }

}
