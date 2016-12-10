import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './angular/home/home.component';
import { SearchComponent } from './angular/search/search.component';
import { MakeOfferComponent } from './angular/offers/make_offer.component';
import { OfferWizComponent } from './angular/offers/offer_wiz.component';
import { PropertyComponent } from './angular/listing/property.component';
import { ListComponent } from './angular/listing/list.component';
import { LoginComponent } from './angular/login/login.component';
import { FacebookLoginComponent } from './angular/login/facebooklogin.component';
import { LegalComponent } from './angular/common/legal.component';
import { GoogleLoginComponent } from './angular/login/googlelogin.component';
import { RegisterComponent } from './angular/login/register.component';
import { MyOffersComponent } from './angular/offers/my_offers.component';
import { AccountComponent } from './angular/login/account.component';
import { AddComponent } from './angular/add/add.component';
import { NextStepsComponent } from './angular/offers/next_steps.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'search/:input',
    component: SearchComponent
  },
  {
    path: 'property/:id',
    component: PropertyComponent
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/:redirect',
    component: LoginComponent
  },
  {
    path: 'login/:redirect/:id',
    component: LoginComponent
  },
  {
    path: 'facebook',
    component: FacebookLoginComponent
  },
  {
    path: 'legal',
    component: LegalComponent
  },
  {
    path: 'google',
    component: GoogleLoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'my-offers',
    component: MyOffersComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: 'next-steps',
    component: NextStepsComponent
  },
  {
    path: 'make-offer/:id',
    component: OfferWizComponent
  },

  //If making offer with no ID, reject and go to home page
  {
    path: 'make-offer',
    redirectTo: '/',
    pathMatch: 'full'
  }

  // Example:
  // {
  //   path: '',
  //   redirectTo: '/dashboard',
  //   pathMatch: 'full'
  // }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: false });
export const routedComponents = [HomeComponent, SearchComponent, MakeOfferComponent, PropertyComponent, ListComponent,
LegalComponent, GoogleLoginComponent, FacebookLoginComponent, RegisterComponent, LoginComponent, MyOffersComponent, AccountComponent];
