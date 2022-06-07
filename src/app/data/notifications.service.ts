import { HttpClient } from '@angular/common/http';
import { forwardRef, Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private baseURL = 'http://localhost:8088/car-mobile-mechanics/api/notifications/';  

  constructor(@Inject(forwardRef(() => HttpClient)) public httpClient : HttpClient) {    
  }

  saveNotification(notification) {
    return this.httpClient.post<any>(this.baseURL + 'save', notification);
  }
}
