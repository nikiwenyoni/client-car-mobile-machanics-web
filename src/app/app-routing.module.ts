import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AvailableTechniciansComponent } from './available-technicians/available-technicians.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { EditPaymentDetailsComponent } from './payments/edit-payment-details/edit-payment-details.component';
import { NewPaymentDetailsComponent } from './payments/new-payment-details/new-payment-details.component';
import { ViewAllPaymentsComponent } from './payments/view-all-payments/view-all-payments.component';
import { ViewPaymentDetailsComponent } from './payments/view-payment-details/view-payment-details.component';
import { ServiceHistoryComponent } from './service-history/service-history.component';

const routes: Routes = [
  {path: '', component : LoginComponent },
  {path: 'register', component : RegisterComponent },
  {path: 'login', component : LoginComponent },
  {path: 'home', component : HomeComponent },
  {path: 'edit-profile', component : EditProfileComponent },
  {path: 'view-payment-details', component : ViewPaymentDetailsComponent },
  {path: 'edit-payment-details', component : EditPaymentDetailsComponent },
  {path: 'available-technicians', component : AvailableTechniciansComponent },
  {path: 'new-payment', component : NewPaymentDetailsComponent },
  {path: 'all-payments', component : ViewAllPaymentsComponent },
  {path: 'service-history', component : ServiceHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
