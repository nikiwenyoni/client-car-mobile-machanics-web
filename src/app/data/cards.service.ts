import { Injectable, Inject, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardsService {


  private baseURL = 'http://localhost:8088/car-mobile-mechanics/api/cards/';  

  constructor(@Inject(forwardRef(() => HttpClient)) public httpClient : HttpClient) {    
  }

  saveCard(card : any){
    return this.httpClient.post<any>(this.baseURL + 'save',card);
  }

  retrieveCards(userId){
    return this.httpClient.get<any>(this.baseURL + 'find/user_id/' + userId);
  }

}
