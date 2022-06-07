import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/data/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(@Inject(forwardRef(() => UserService)) public userService, private route : Router) { }

  loginForm : FormGroup;
  inValidLogin = false;
  errorMessage = '';

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login(){
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;

    if(username == ''){
      this.errorMessage = 'Please provide value for username';
      return;
    }

    if(username.length < 5){
      this.errorMessage = 'Please provide atleast 5 characters for username';
      return;
    }


    if(password == ''){
      this.errorMessage = 'Please provide value for password';
      return;
    }

    this.userService.login(username,password).subscribe(data => {
      console.log(data);
      try{
        if(data != null){
          this.inValidLogin = false;
          console.log('Valid login');
          if(data.role.roleName == 'Customer'){
            this.route.navigate(['/home']); 
          }else{
            this.errorMessage = 'You are not authorised to access this system';
          }
          sessionStorage.setItem('user',JSON.stringify(data));
        }else{
          this.inValidLogin = true;
          console.log('Incorrect username or password');
          this.errorMessage = 'Incorrect username or password.';
        }
      }catch(ex){
        this.errorMessage = 'Errror';
      }
    });

  }

}
