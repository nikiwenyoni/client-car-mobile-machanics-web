import { Injectable, Inject, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {

  private baseURL = 'http://localhost:8088/car-mobile-mechanics/api/incidents/';  

  constructor(@Inject(forwardRef(() => HttpClient)) public httpClient : HttpClient) {    
  }

  saveIncident(incident : any){
    return this.httpClient.post<any>(this.baseURL + 'save',incident);
  }

  getIncidentsByUserId(userId){
    return this.httpClient.get<any>(this.baseURL + 'fetch/user_id/' + userId);
  }
}
