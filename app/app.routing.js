"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require("./angular/home/home.component");
var search_component_1 = require("./angular/search/search.component");
var make_offer_component_1 = require("./angular/offers/make_offer.component");
var offer_wiz_component_1 = require("./angular/offers/offer_wiz.component");
var property_component_1 = require("./angular/listing/property.component");
var list_component_1 = require("./angular/listing/list.component");
var login_component_1 = require("./angular/login/login.component");
var facebooklogin_component_1 = require("./angular/login/facebooklogin.component");
var legal_component_1 = require("./angular/common/legal.component");
var googlelogin_component_1 = require("./angular/login/googlelogin.component");
var register_component_1 = require("./angular/login/register.component");
var my_offers_component_1 = require("./angular/offers/my_offers.component");
var account_component_1 = require("./angular/login/account.component");
var add_component_1 = require("./angular/add/add.component");
var next_steps_component_1 = require("./angular/offers/next_steps.component");
var appRoutes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'search',
        component: search_component_1.SearchComponent
    },
    {
        path: 'search/:input',
        component: search_component_1.SearchComponent
    },
    {
        path: 'property/:id',
        component: property_component_1.PropertyComponent
    },
    {
        path: 'list',
        component: list_component_1.ListComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'login/:redirect',
        component: login_component_1.LoginComponent
    },
    {
        path: 'login/:redirect/:id',
        component: login_component_1.LoginComponent
    },
    {
        path: 'facebook',
        component: facebooklogin_component_1.FacebookLoginComponent
    },
    {
        path: 'legal',
        component: legal_component_1.LegalComponent
    },
    {
        path: 'google',
        component: googlelogin_component_1.GoogleLoginComponent
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent
    },
    {
        path: 'my-offers',
        component: my_offers_component_1.MyOffersComponent
    },
    {
        path: 'account',
        component: account_component_1.AccountComponent
    },
    {
        path: 'add',
        component: add_component_1.AddComponent
    },
    {
        path: 'next-steps',
        component: next_steps_component_1.NextStepsComponent
    },
    {
        path: 'make-offer/:id',
        component: offer_wiz_component_1.OfferWizComponent
    },
    //If making offer with no ID, reject and go to home page
    {
        path: 'make-offer',
        redirectTo: '/',
        pathMatch: 'full'
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: false });
exports.routedComponents = [home_component_1.HomeComponent, search_component_1.SearchComponent, make_offer_component_1.MakeOfferComponent, property_component_1.PropertyComponent, list_component_1.ListComponent,
    legal_component_1.LegalComponent, googlelogin_component_1.GoogleLoginComponent, facebooklogin_component_1.FacebookLoginComponent, register_component_1.RegisterComponent, login_component_1.LoginComponent, my_offers_component_1.MyOffersComponent, account_component_1.AccountComponent];
//# sourceMappingURL=app.routing.js.map