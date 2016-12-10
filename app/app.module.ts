///
/// MIKASO INC. ("COMPANY") CONFIDENTIAL
/// Unpublished Copyright (c) 2016 Mikaso, Inc., All Rights Reserved.
///
/// NOTICE:  All information contained herein is, and remains the property of COMPANY. The intellectual and technical concepts contained
/// herein are proprietary to COMPANY and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law.
/// Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
/// from COMPANY.  Access to the source code contained herein is hereby forbidden to anyone except current COMPANY employees, managers or contractors who have executed
/// Confidentiality and Non-disclosure agreements explicitly covering such access.
///
/// The copyright notice above does not evidence any actual or intended publication or disclosure of  this source code, which includes
/// information that is confidential and/or proprietary, and is a trade secret, of  COMPANY.   ANY REPRODUCTION, MODIFICATION, DISTRIBUTION, PUBLIC  PERFORMANCE,
/// OR PUBLIC DISPLAY OF OR THROUGH USE  OF THIS  SOURCE CODE  WITHOUT  THE EXPRESS WRITTEN CONSENT OF COMPANY IS STRICTLY PROHIBITED, AND IN VIOLATION OF APPLICABLE
/// LAWS AND INTERNATIONAL TREATIES.  THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY ANY RIGHTS
/// TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
///


import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './angular/home/home.component';
import { HeaderComponent } from './angular/common/header.component';
import { FooterComponent } from './angular/common/footer.component';
import { SearchComponent } from './angular/search/search.component';
import { MakeOfferComponent } from './angular/offers/make_offer.component';
import { OfferWizComponent } from './angular/offers/offer_wiz.component';
import { LoginComponent } from './angular/login/login.component';
import { PropertyComponent } from './angular/listing/property.component';
import { FacebookLoginComponent } from './angular/login/facebooklogin.component';
import { GoogleLoginComponent } from './angular/login/googlelogin.component';
import { RegisterComponent } from './angular/login/register.component';
import { ListComponent } from './angular/listing/list.component';
import { LegalComponent } from './angular/common/legal.component';
import { routing, routedComponents } from './app.routing';
import { TruncatePipe } from './angular/shared/truncate.pipe';
import { MyOffersComponent } from './angular/offers/my_offers.component';
import { AccountComponent } from './angular/login/account.component';
import { AddComponent } from './angular/add/add.component';
import { NextStepsComponent } from './angular/offers/next_steps.component';

//--PrimeNG Modules--
import { SliderModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { DataListModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
import { InputSwitchModule } from 'primeng/primeng';
import { ToggleButtonModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { SelectButtonModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';


//Include all modules here
@NgModule({
    imports: [
        HttpModule,
        JsonpModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        routing,

        //--PrimeNG Modules--
        SliderModule,
        GrowlModule,
        DataListModule,
        CalendarModule,
        CheckboxModule,
        InputMaskModule,
        InputSwitchModule,
        ToggleButtonModule,
        DropdownModule,
        TooltipModule,
        SelectButtonModule,
        DialogModule
    ],


    //Declare components here
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        MakeOfferComponent,
        OfferWizComponent,
        PropertyComponent,
        ListComponent,
        LoginComponent,
        SearchComponent,
        FacebookLoginComponent,
        GoogleLoginComponent,
        RegisterComponent,
        LegalComponent,
        routedComponents,
        TruncatePipe,
        MyOffersComponent,
        AccountComponent,
        AddComponent,
        NextStepsComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {
    constructor(

    ) { }
}
