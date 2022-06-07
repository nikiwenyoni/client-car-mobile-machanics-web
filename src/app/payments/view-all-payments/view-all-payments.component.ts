import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { CardsService } from 'src/app/data/cards.service';

@Component({
  selector: 'app-view-all-payments',
  templateUrl: './view-all-payments.component.html',
  styleUrls: ['./view-all-payments.component.css']
})
export class ViewAllPaymentsComponent implements OnInit {

  constructor(@Inject(forwardRef(() => CardsService)) public cardsServices : any) { }


  cards = [];
  user = null;

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.cardsServices.retrieveCards(this.user.id).subscribe(data => {
      if(data != null){
        this.cards = data;
        console.log(this.cards);
      }
    });
  }

}
