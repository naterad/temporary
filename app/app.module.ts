import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './angular/home/home.component';
import { LoginComponent } from './angular/login/login.component';
import { DataComponent } from './angular/data/data.component';
import { HeaderComponent } from './angular/common/header.component';
import { FooterComponent } from './angular/common/footer.component';
import { routing, routedComponents } from './app.routing';

//Include all modules here
@NgModule({
    imports: [
        HttpModule,
        JsonpModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule.forRoot(),
        routing,
    ],


    //Declare components here
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        DataComponent,
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
