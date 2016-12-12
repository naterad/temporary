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
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
// import { MaterialModule } from '@angular/material';
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var app_component_1 = require("./app.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var home_component_1 = require("./angular/home/home.component");
var header_component_1 = require("./angular/common/header.component");
var footer_component_1 = require("./angular/common/footer.component");
var app_routing_1 = require("./app.routing");
//--PrimeNG Modules--
var primeng_1 = require("primeng/primeng");
var primeng_2 = require("primeng/primeng");
var primeng_3 = require("primeng/primeng");
var primeng_4 = require("primeng/primeng");
var primeng_5 = require("primeng/primeng");
var primeng_6 = require("primeng/primeng");
var primeng_7 = require("primeng/primeng");
var primeng_8 = require("primeng/primeng");
var primeng_9 = require("primeng/primeng");
var primeng_10 = require("primeng/primeng");
var primeng_11 = require("primeng/primeng");
var primeng_12 = require("primeng/primeng");
//Include all modules here
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            http_1.HttpModule,
            http_1.JsonpModule,
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_2.ReactiveFormsModule,
            ng_bootstrap_1.NgbModule.forRoot(),
            // MaterialModule.forRoot(),
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
            footer_component_1.FooterComponent
        ],
        bootstrap: [
            app_component_1.AppComponent
        ],
        schemas: [
            core_2.CUSTOM_ELEMENTS_SCHEMA
        ]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map