import { HttpClient } from '@angular/common/http';
import { forwardRef, Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TechniciansService {


  private baseURL = 'http://localhost:8088/car-mobile-mechanics/api/technicians/';  

  constructor(@Inject(forwardRef(() => HttpClient)) public httpClient : HttpClient) {    
  }

  retrieveTechnicians(address) {
    return this.httpClient.get<any>(this.baseURL + 'find/address/' + address);
  }
}
