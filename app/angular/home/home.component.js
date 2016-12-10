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
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var listing_service_1 = require('../listing/listing.service');
var token_service_1 = require('../login/token.service');
var HomeComponent = (function () {
    function HomeComponent(listingService, router, formBuilder, _ngZone) {
        this.listingService = listingService;
        this.router = router;
        this.formBuilder = formBuilder;
        this._ngZone = _ngZone;
        this.loading = true;
        this.mode = 'Observable';
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadDefault();
        navigator.geolocation.getCurrentPosition(function (location) {
            // navigator geolocation worked. Sweet.
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
            _this._ngZone.runOutsideAngular(function () {
                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var state = results[2].address_components[2].short_name;
                        var city = results[2].address_components[0].long_name;
                        var input = results[2].address_components[0].long_name + ", " + results[2].address_components[2].short_name;
                        var obj = { "state": state, "city": city };
                        _this._ngZone.run(function () {
                            //this.getHomesParams(obj);
                        });
                    }
                });
            });
        }, function (error) {
            // navigator geolocation didn't work. Load default values
            console.log("couldn't get users current location. loading default location");
            //this.loadDefault();
        });
    };
    HomeComponent.prototype.loadDefault = function () {
        var obj = { "city": "Provo", "state": "UT" };
        this.getHomesParams(obj);
    };
    HomeComponent.prototype.getHomesParams = function (obj) {
        var _this = this;
        this.listingService.getHomesParams(obj)
            .subscribe(function (homes) {
            _this.homes = homes;
            _this.loading = false;
        }, function (error) { return _this.errorMessage = error; });
    };
    HomeComponent.prototype.getHomes = function () {
        var _this = this;
        this.listingService.getHomes()
            .subscribe(function (homes) {
            _this.homes = homes;
            _this.loading = false;
        }, function (error) { return _this.errorMessage = error; });
    };
    HomeComponent.prototype.gotoProperty = function (home) {
        var link = ['/property', home.home_id];
        this.router.navigate(link);
    };
    HomeComponent.prototype.onKey = function (event) {
        var options = {
            types: ['(regions)'],
            componentRestrictions: { country: "us" }
        };
        var input = document.getElementById('search_field');
        var autocomplete = new google.maps.places.Autocomplete(input, options);
    };
    HomeComponent.prototype.logForm = function (value) {
        var input = document.getElementById("search_field").value;
        var link = ['/search', input];
        this.router.navigate(link);
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home-page',
            templateUrl: 'home.component.html',
            styleUrls: ['home.component.css'],
            providers: [listing_service_1.ListingService, token_service_1.TokenService]
        }), 
        __metadata('design:paramtypes', [listing_service_1.ListingService, router_1.Router, forms_1.FormBuilder, core_1.NgZone])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map