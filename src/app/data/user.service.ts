import { Injectable, Inject, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private baseURL = 'http://localhost:8088/car-mobile-mechanics/api';  

  constructor(@Inject(forwardRef(() => HttpClient)) public httpClient : HttpClient) {    
  }

  login(username : string, password : string) {
    return this.httpClient.get<any>(this.baseURL + '/users/login/username/' + username + '/password/' + password);
  }

  retrieveAllUsers() {
    return this.httpClient.get<any>(this.baseURL + '/users/all');
  }

  updateUser(user : any){
    return this.httpClient.post<any>(this.baseURL + '/users/update',user);
  }

  registerUser(user : any){
    return this.httpClient.post<any>(this.baseURL + '/users/save',user);
  }

  retrieveUserUsingId(id) {
    return this.httpClient.get<any>(this.baseURL + '/users/retrieve/id/' + id );
  }

}
