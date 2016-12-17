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
var material_1 = require("@angular/material");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var app_component_1 = require("./app.component");
var home_component_1 = require("./angular/home/home.component");
var header_component_1 = require("./angular/common/header.component");
var footer_component_1 = require("./angular/common/footer.component");
var app_routing_1 = require("./app.routing");
//--PrimeNG Modules--
// import { SliderModule } from 'primeng/primeng';
// import { GrowlModule } from 'primeng/primeng';
// import { DataListModule } from 'primeng/primeng';
// import { CalendarModule } from 'primeng/primeng';
// import { CheckboxModule } from 'primeng/primeng';
// import { InputMaskModule } from 'primeng/primeng';
// import { InputSwitchModule } from 'primeng/primeng';
// import { ToggleButtonModule } from 'primeng/primeng';
// import { DropdownModule } from 'primeng/primeng';
// import { TooltipModule } from 'primeng/primeng';
// import { SelectButtonModule } from 'primeng/primeng';
// import { DialogModule } from 'primeng/primeng';
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
            // NgbModule.forRoot(),
            material_1.MaterialModule.forRoot(),
            app_routing_1.routing,
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