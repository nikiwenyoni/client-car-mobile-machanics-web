import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CardsService } from 'src/app/data/cards.service';
import { UserService } from 'src/app/data/user.service';

@Component({
  selector: 'app-new-payment-details',
  templateUrl: './new-payment-details.component.html',
  styleUrls: ['./new-payment-details.component.css']
})
export class NewPaymentDetailsComponent implements OnInit {

  constructor(@Inject(forwardRef(() => UserService)) public userService : any,
  @Inject(forwardRef(() => CardsService)) public cardsServices : any, private route : Router) { }


  cardForm : FormGroup;
  inValidLogin = false;
  message = '';
  success_message = '';

  user = null;
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.cardForm = new FormGroup({
      bankName: new FormControl('', Validators.required),
      accountHolder: new FormControl('', Validators.required),
      cardNumber: new FormControl('', Validators.required),
      expiryDate: new FormControl('', Validators.required),
      securityCode: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required)
    });
    console.log(this.cardForm );
  }

  addNewCardDetails(){
    let card = {
    'bankName' : this.cardForm.value.bankName,
    'accountHolder' : this.cardForm.value.accountHolder,
    'cardNumber' : this.cardForm.value.cardNumber,
    'expiryDate' : this.cardForm.value.expiryDate,
    'securityCode' : this.cardForm.value.securityCode,
    'postalCode' : this.cardForm.value.postalCode,
    'user' : this.user.id
    }

    if(!this.validateForm(card)){
        return;
    }

    console.log(card);
    this.message = '';
    this.cardsServices.saveCard(card).subscribe(data => {
      if(data != null){
        this.user.application = data;
        console.log('Application successfully submitted');
        this.success_message = 'Card details successfully captured';
      }
    });
  }

  validateForm(card) : Boolean{
      console.log(card.bankName);
      let isValid = true;
      if(card.bankName == ''){
        this.message = 'Please provide value for bank name';
        console.log('ERRRR');
        return false;
      }

      if(card.accountHolder == ''){
        this.message = 'Please provide value for account holder name';
        return false;
      }

      if(card.cardNumber == ''){
        this.message = 'Please provide value for card number';
        return false;
      }

      if(card.expiryDate == ''){
        this.message = 'Please provide value for expiry date';
        return false;
      }

      if(card.securityCode == ''){
        this.message = 'Please provide value for security code';
        return false;
      }

      if(card.securityCode.length != 3){
        this.message = 'Invalid Value for security code. It must have 3 characters';
        return false;
      }

      if(card.postalCode == ''){
        this.message = 'Please provide value for postal code';
        return false;
      }
      return isValid;
  }
}
