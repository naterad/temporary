import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { MaterialModule } from '@angular/material';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './angular/home/home.component';
import { HeaderComponent } from './angular/common/header.component';
import { FooterComponent } from './angular/common/footer.component';
import { routing, routedComponents } from './app.routing';

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
        // MaterialModule.forRoot(),
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
        FooterComponent
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class AppModule {
    constructor(

    ) { }
}
