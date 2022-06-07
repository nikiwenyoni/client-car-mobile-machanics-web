import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AvailableTechniciansComponent } from './available-technicians/available-technicians.component';
import { ViewAllPaymentsComponent } from './payments/view-all-payments/view-all-payments.component';
import { ServiceHistoryComponent } from './service-history/service-history.component';
import { NewPaymentDetailsComponent } from './payments/new-payment-details/new-payment-details.component';
import { EditPaymentDetailsComponent } from './payments/edit-payment-details/edit-payment-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    EditProfileComponent,
    AvailableTechniciansComponent,
    ViewAllPaymentsComponent,
    ServiceHistoryComponent,
    ViewAllPaymentsComponent,
    NewPaymentDetailsComponent,
    EditPaymentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule ,
    ReactiveFormsModule
  ],
  providers: [BrowserAnimationsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
