import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IncidentsService } from '../data/incidents.service';
import { NotificationsService } from '../data/notifications.service';
import { UserService } from '../data/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(@Inject(forwardRef(() => UserService)) public userService : any,
  @Inject(forwardRef(() => NotificationsService)) public notificationServices : any,
  @Inject(forwardRef(() => IncidentsService)) public incidentsService : any, private route : Router) { }

  incidentForm : FormGroup;
  alreadyRequested = false;
  error_message = '';
  success_message = '';
  user = null;
  incidents = null;

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.incidentForm = new FormGroup({
      vehicleMake: new FormControl('', Validators.required),
      bodyType: new FormControl('', Validators.required),
      transmission: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      reason: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required)

    });

    this.incidentsService.getIncidentsByUserId(this.user.id).subscribe(data => {
      if(data != null){
        if (data.length > 0) {
          console.log(this.incidents );
          this.incidents = data;
          this.alreadyRequested = true;
        }
      }
      console.log(this.alreadyRequested );

    });


  }


  requestTechnician(){
    console.log('Requesting a technician');

    let incident = {
      vehicleMake : this.incidentForm.value.vehicleMake,
      bodyType : this.incidentForm.value.bodyType,
      transmission : this.incidentForm.value.transmission,
      color : this.incidentForm.value.color,
      address : this.incidentForm.value.address,
      reason : this.incidentForm.value.reason,
      user : this.user.id,
      dateCreated : new Date(),
      status : 'Pending',
      isAssigned : false,
      city : this.incidentForm.value.city,
      loggedBy : this.user.firstName + this.user.firstName,
      id : 0
    } 

    if(!this.validateIncident(incident)){
      return;
    }
    console.log(incident);

    this.incidentsService.saveIncident(incident).subscribe(data => {
      if(data != null){
        console.log('Incident successfully added');
        localStorage.setItem('address',incident.city);
        localStorage.setItem('incident',data.id);
        sessionStorage.setItem('incidentDetails',JSON.stringify(data));
        this.success_message = 'Please click on next button to procced';
      }
    });

  }

  validateIncident(incident){
      let isValid = true;

      if(incident.vehicleMake == ''){
        this.error_message = 'Please provide a value for vehicle made or model field';
        return false;
      }

      if(incident.bodyType == ''){
        this.error_message = 'Please provide a value for body type field';
        return false;
      }

      if(incident.transmission == ''){
        this.error_message = 'Please provide a value for transmission field';
        return false;
      }

      if(incident.address == ''){
        this.error_message = 'Please provide a value for address field';
        return false;
      }

      if(incident.reason == ''){
        this.error_message = 'Please provide a value for reason field';
        return false;
      }
      return isValid;
  }
}
