import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/data/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(@Inject(forwardRef(() => UserService)) public userService : any, private route : Router) { }


  userForm : FormGroup;
  inValidLogin = false;
  error_message = '';
  success_message = '';
  selectedGender;
  user = null;
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      cellNumber: new FormControl('', Validators.required),
      firstPassword: new FormControl('', Validators.required),
      secondPassword: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required)
    });
    console.log(this.userForm);
  }

  selected(){
  }

  register(){

    let role = {
      description: "Apply and view application status",
      id: 2,
      roleName: "Customer"
    }
    let user = {
      firstName : this.userForm.value.firstName,
      lastName : this.userForm.value.lastName,
      email : this.userForm.value.email,
      cellNumber : this.userForm.value.cellNumber,
      firstPassword : this.userForm.value.firstPassword,
      secondPassword : this.userForm.value.secondPassword,
      password : this.userForm.value.secondPassword,
      gender : this.userForm.value.gender,
      role : role,
    };
    
    if(!this.validateUser(user)){
        return;
    }

    console.log(user);

    this.userService.registerUser(user).subscribe(data => {
      if(data != null){
        console.log('User successfulyy added');
        this.success_message = 'Thank you ' + user.firstName + ' for registering. Please click';
      }else{
        this.error_message = 'Unable to register user. Email Address Already exists.'
      }
    });

  }

  validateUser(user){
    let isValid = true;
    
    if(user.firstName == ''){
        this.error_message = 'Please provide a value for first name field';
        return false;
    }

    if(user.firstName.length < 5){
      this.error_message = 'First name must have atlest 5 characters';
      return false;
     }

    if(user.lastName == ''){
      this.error_message = 'Please provide a value for surname field';
      return false;
    }

    if(user.lastName.length < 5){
      this.error_message = 'Surname must have atlest 5 characters';
      return false;
    }
    
    if(user.email == ''){
      this.error_message = 'Please provide a value for email address field';
      return false;
    }

    if(user.cellNumber == ''){
      this.error_message = 'Please provide value for cell number field';
      return false;
    }

    if(user.cellNumber.length < 10){
      this.error_message = 'Cell number must have 10 degits';
      return false;
    }


    if(user.firstPassword == ''){
      this.error_message = 'Please provide a value for password field';
      return false;
    }


    if(user.secondPassword == ''){
      this.error_message = 'Please provide a value for confirm password field';
      return false;
    }

    if(user.secondPassword != user.firstPassword){
      this.error_message = 'Passwords do not metch';
      return false;
    }

    if(user.gender == ''){
      this.error_message = 'Please provide value for gender field';
      return false;
    }

    return isValid;
  }
}
