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
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var forms_2 = require('@angular/forms');
var app_component_1 = require('./app.component');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var home_component_1 = require('./angular/home/home.component');
var header_component_1 = require('./angular/common/header.component');
var footer_component_1 = require('./angular/common/footer.component');
var search_component_1 = require('./angular/search/search.component');
var make_offer_component_1 = require('./angular/offers/make_offer.component');
var offer_wiz_component_1 = require('./angular/offers/offer_wiz.component');
var login_component_1 = require('./angular/login/login.component');
var property_component_1 = require('./angular/listing/property.component');
var facebooklogin_component_1 = require('./angular/login/facebooklogin.component');
var googlelogin_component_1 = require('./angular/login/googlelogin.component');
var register_component_1 = require('./angular/login/register.component');
var list_component_1 = require('./angular/listing/list.component');
var legal_component_1 = require('./angular/common/legal.component');
var app_routing_1 = require('./app.routing');
var truncate_pipe_1 = require('./angular/shared/truncate.pipe');
var my_offers_component_1 = require('./angular/offers/my_offers.component');
var account_component_1 = require('./angular/login/account.component');
var add_component_1 = require('./angular/add/add.component');
var next_steps_component_1 = require('./angular/offers/next_steps.component');
//--PrimeNG Modules--
var primeng_1 = require('primeng/primeng');
var primeng_2 = require('primeng/primeng');
var primeng_3 = require('primeng/primeng');
var primeng_4 = require('primeng/primeng');
var primeng_5 = require('primeng/primeng');
var primeng_6 = require('primeng/primeng');
var primeng_7 = require('primeng/primeng');
var primeng_8 = require('primeng/primeng');
var primeng_9 = require('primeng/primeng');
var primeng_10 = require('primeng/primeng');
var primeng_11 = require('primeng/primeng');
var primeng_12 = require('primeng/primeng');
//Include all modules here
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                http_1.JsonpModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_2.ReactiveFormsModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                app_routing_1.routing,
                //--PrimeNG Modules--
                primeng_1.SliderModule,
                primeng_2.GrowlModule,
                primeng_3.DataListModule,
                primeng_4.CalendarModule,
                primeng_5.CheckboxModule,
                primeng_6.InputMaskModule,
                primeng_7.InputSwitchModule,
                primeng_8.ToggleButtonModule,
                primeng_9.DropdownModule,
                primeng_10.TooltipModule,
                primeng_11.SelectButtonModule,
                primeng_12.DialogModule
            ],
            //Declare components here
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                make_offer_component_1.MakeOfferComponent,
                offer_wiz_component_1.OfferWizComponent,
                property_component_1.PropertyComponent,
                list_component_1.ListComponent,
                login_component_1.LoginComponent,
                search_component_1.SearchComponent,
                facebooklogin_component_1.FacebookLoginComponent,
                googlelogin_component_1.GoogleLoginComponent,
                register_component_1.RegisterComponent,
                legal_component_1.LegalComponent,
                app_routing_1.routedComponents,
                truncate_pipe_1.TruncatePipe,
                my_offers_component_1.MyOffersComponent,
                account_component_1.AccountComponent,
                add_component_1.AddComponent,
                next_steps_component_1.NextStepsComponent
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map