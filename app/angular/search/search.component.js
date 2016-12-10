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
var router_1 = require('@angular/router');
var router_2 = require('@angular/router');
var listing_service_1 = require('../listing/listing.service');
var token_service_1 = require('../login/token.service');
var SearchComponent = (function () {
    function SearchComponent(listingService, router, route, _ngZone) {
        this.listingService = listingService;
        this.router = router;
        this.route = route;
        this._ngZone = _ngZone;
        this.mode = 'Observable';
        this.homeTypes = ['', 'Home', 'Apartment', 'Condo', 'Townhome', 'Manufactured', 'Lot'];
        this.offset = 50;
        this.searchLocation = "Loading...";
        this.loading = false;
        this.moreHomes = true;
        this.oldHomesSize = 0;
        this.bedsParam = 0;
        this.bathsParam = 0;
        this.sqftParam = 0;
        this.yearBuiltParam = 0;
        this.priceMinParam = 0;
        this.priceMaxParam = 2000000;
        this.mapMarkers = [];
        this.rangeValues = [0, 2000000];
        this.slider_max = 2000000;
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.route.params.forEach(function (params) {
            if (params['input'] !== undefined) {
                var input = params['input'];
                console.log("Param was: " + input);
                var res = input.split(", ");
                console.log(res);
                if (res.length == 2) {
                    _this.setLocation(res[0]);
                    var state = { "state": res[0] };
                    _this.getHomesParams(state);
                }
                else if (res.length == 3) {
                    _this.setLocation(res[0] + ", " + res[1]);
                    var cityState = { "state": res[1], "city": res[0] };
                    _this.getHomesParams(cityState);
                }
                else {
                    _this.loadDefault();
                }
            }
            else {
                //If no params are entered, this gets current city of user
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
                                /// remove this stuff
                                obj = { "state": "UT", "city": "Provo" };
                                input = "Provo, UT";
                                _this._ngZone.run(function () {
                                    _this.setLocation(input);
                                    _this.getHomesParams(obj);
                                });
                            }
                        });
                    });
                }, function (error) {
                    // navigator geolocation didn't work. Load default values
                    console.log("couldn't get users current location. loading default location");
                    _this.loadDefault();
                });
            }
        });
    };
    SearchComponent.prototype.loadDefault = function () {
        this.setLocation("Provo, UT");
        var obj = { "state": "UT", "city": "Provo" };
        this.getHomesParams(obj);
    };
    SearchComponent.prototype.setLocation = function (input) {
        this.searchLocation = input;
    };
    SearchComponent.prototype.changeBedsParam = function (value) {
        this.bedsParam = value;
        this.updateMarkers(true);
        this.createObject();
        this.getHomesParams(this.searchObject);
    };
    SearchComponent.prototype.changeBathsParam = function (value) {
        this.bathsParam = value;
        this.updateMarkers(true);
        this.createObject();
        this.getHomesParams(this.searchObject);
    };
    SearchComponent.prototype.changeSqFtParam = function (value) {
        this.sqftParam = value;
        this.updateMarkers(true);
        this.createObject();
        this.getHomesParams(this.searchObject);
    };
    SearchComponent.prototype.changeYearBuiltParam = function (value) {
        this.yearBuiltParam = value;
        this.updateMarkers(true);
        this.createObject();
        this.getHomesParams(this.searchObject);
    };
    SearchComponent.prototype.changeSlider = function (value) {
        console.log(value);
        this.updateMarkers(false);
    };
    SearchComponent.prototype.searchSubmit = function () {
        var input = document.getElementById("search_field").value;
        var res = input.split(", ");
        this.createObject();
        if (res.length == 2) {
            this.setLocation(res[0]);
            this.searchObject["state"] = res[0];
            delete this.searchObject["city"];
        }
        else if (res.length == 3) {
            this.setLocation(res[0] + ", " + res[1]);
            this.searchObject["city"] = res[0];
            this.searchObject["state"] = res[1];
        }
        this.getHomesParams(this.searchObject);
    };
    SearchComponent.prototype.createObject = function () {
        if (this.bedsParam == 0) {
            delete this.searchObject["bedrooms"];
        }
        else {
            this.searchObject["bedrooms"] = this.bedsParam;
        }
        if (this.bathsParam == 0) {
            delete this.searchObject["bathrooms"];
        }
        else {
            this.searchObject["bathrooms"] = this.bathsParam;
        }
        if (this.sqftParam == 0) {
            delete this.searchObject["square_feet"];
        }
        else {
            this.searchObject["square_feet"] = this.sqftParam;
        }
        if (this.yearBuiltParam == 0) {
            delete this.searchObject["year_built"];
        }
        else {
            this.searchObject["year_built"] = this.yearBuiltParam;
        }
    };
    SearchComponent.prototype.doSomething = function (event) {
        // console.debug("Scroll Event", document.body.scrollTop);
        // console.log(document.getElementById("scroll-container").scrollTop);
        if (document.getElementById("scroll-container").scrollTop != 0) {
            console.log("load more");
            this.loadMoreHomes();
        }
    };
    SearchComponent.prototype.getHomesParams = function (obj) {
        var _this = this;
        this.loading = true;
        this.searchObject = obj;
        this.listingService.getHomesParams(obj)
            .subscribe(
        // homes => console.log(this.homes = homes),
        function (homes) { return _this.useHomes(homes); }, function (error) { return _this.errorMessage = error; });
    };
    SearchComponent.prototype.newHomes = function (obj) {
        var temp = [];
        if (this.homes) {
            var a, b = 0;
            for (a = 0; a < obj.length; a++) {
                var same = false;
                for (b = 0; b < this.homes.length; b++) {
                    if (this.homes[b] == obj[a]) {
                        same = true;
                    }
                }
                if (!same) {
                    temp.push(obj[a]);
                }
            }
        }
        else {
            temp = obj;
        }
        return temp;
    };
    SearchComponent.prototype.useHomes = function (obj) {
        console.log("useHomes");
        for (var i = 0; i < obj.length; i++) {
            console.log(obj[i]);
            if ((+(obj[i]['price_cents']) / 100) > this.rangeValues[1]) {
                var sl_max = (+(obj[i]['price_cents']) / 100);
                this.rangeValues = [0, sl_max];
                this.slider_max = sl_max;
            }
        }
        this.newHomes(obj);
        this.homes = obj;
        this.buildMap(40.2291259, -111.6611819);
        this.updateMarkers(true);
        this.loading = false;
        this.oldHomesSize = this.homes.length;
    };
    SearchComponent.prototype.useMoreHomes = function (obj) {
        console.log("useMoreHomes");
        for (var i = 0; i < obj.length; i++) {
            console.log(obj[i]);
            if ((+(obj[i]['price_cents']) / 100) > this.rangeValues[1]) {
                var sl_max = (+(obj[i]['price_cents']) / 100);
                this.rangeValues = [0, sl_max];
                this.slider_max = sl_max;
            }
        }
        this.homes = this.homes.concat(this.newHomes(obj));
        this.buildMarkers();
        this.updateMarkers(true);
        this.loading = false;
        if (this.homes.length == this.oldHomesSize) {
            this.moreHomes = false;
        }
        else {
            this.oldHomesSize = this.homes.length;
        }
    };
    SearchComponent.prototype.getHomes = function () {
        var _this = this;
        this.listingService.getHomes()
            .subscribe(function (homes) { return _this.homes = homes; }, function (error) { return _this.errorMessage = error; });
    };
    SearchComponent.prototype.loadMoreHomes = function () {
        var _this = this;
        this.loading = true;
        this.listingService.getHomesOffset(this.offset, this.searchObject)
            .subscribe(function (homes) { return _this.useMoreHomes(homes); }, function (error) { return _this.errorMessage = error; });
        this.offset = this.offset + 50;
    };
    SearchComponent.prototype.gotoProperty = function (home) {
        var link = ['/property', home.home_id];
        this.router.navigate(link);
    };
    SearchComponent.prototype.updateMarkers = function (updateRange) {
        var a = 0;
        if (updateRange) {
            for (a = 0; a < this.homes.length; a++) {
                this.mapMarkers[a].setMap(null);
                if ((+(this.homes[a]['price_cents']) / 100) > this.rangeValues[1]) {
                    var sl_max = (+(this.homes[a]['price_cents']) / 100);
                    this.rangeValues = [0, sl_max];
                    this.slider_max = sl_max;
                }
            }
        }
        var should = 0;
        var i = 0;
        var shouldnt = 0;
        for (i = 0; i < this.homes.length; i++) {
            if (Number(this.homes[i].price_cents) / 100 >= this.rangeValues[0] && Number(this.homes[i].price_cents) / 100 <= this.rangeValues[1] && Number(this.homes[i].bedrooms) / 100 >= this.bedsParam && Number(this.homes[i].bathrooms) / 100 >= this.bathsParam && Number(this.homes[i].square_feet) >= this.sqftParam && Number(this.homes[i].year_built) >= this.yearBuiltParam) {
                should++;
                // there is a problem with this. It says the right number of markers should be
                // showing but then it shows a couple more. Why would that be the case?
                // console.log(this.mapMarkers[i]);
                this.mapMarkers[i].setMap(this.map);
            }
            else {
                shouldnt++;
            }
        }
        console.log("should show: " + should);
        console.log("shouldnt show: " + shouldnt);
    };
    SearchComponent.prototype.buildMap = function (lat, lng) {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            zoomControl: true,
            streetViewControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP
            },
            streetViewControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP
            },
            scrollwheel: false,
            center: new google.maps.LatLng(lat, lng)
        });
        this.map = map;
        this.buildMarkers();
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < this.mapMarkers.length; i++) {
            bounds.extend(this.mapMarkers[i].getPosition());
        }
        map.fitBounds(bounds);
    };
    SearchComponent.prototype.buildMarkers = function () {
        var i = 0;
        var newMarkers = [];
        for (i = 0; i < this.homes.length; i++) {
            var marker = new google.maps.Marker({
                title: this.homes[i].title,
                position: new google.maps.LatLng(Number(this.homes[i].latitude) / 1000000, Number(this.homes[i].longitude) / 1000000),
                icon: "app/images/base-pin.png",
                map: this.map,
                labelContent: '<div class="marker-loaded"><div class="map-marker"><img src="app/images/marker-s.png" alt="" /></div></div>',
                labelAnchor: new google.maps.Point(50, 0),
                labelClass: "marker-style"
            });
            newMarkers.push(marker);
            var boxText = document.createElement("div");
            boxText.innerHTML =
                '<div class="infobox-inner" (click)="gotoProperty(home)">' +
                    '<div class="infobox-image" style="position: relative">' +
                    '<img src="' + this.homes[i].primary_image + '">' + '<div><span class="infobox-price">' + this.formatMoney(Number(this.homes[i].price_cents) / 100) + '<br>FOR SALE</span></div>' +
                    '</div>' +
                    '<div class="infobox-description">' +
                    '<div class="infobox-title" (click)="gotoProperty(home)">' + this.homes[i].title + '</div>' +
                    '<div class="infobox-location">' + this.homes[i].address + '</div>' +
                    '</div>' +
                    '</div>';
            var infoboxOptions = {
                content: boxText,
                disableAutoPan: false,
                pixelOffset: new google.maps.Size(-100, 0),
                zIndex: null,
                alignBottom: true,
                boxClass: "infobox-wrapper",
                enableEventPropagation: true,
                closeBoxMargin: "0px 0px -8px 0px",
                closeBoxURL: "app/images/close-btn.png",
                infoBoxClearance: new google.maps.Size(1, 1)
            };
            newMarkers[i].infobox = new InfoBox(infoboxOptions);
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    var h = 0;
                    for (h = 0; h < newMarkers.length; h++) {
                        newMarkers[h].infobox.close();
                    }
                    newMarkers[i].infobox.open(this.map, this);
                };
            })(marker, i));
            this.mapMarkers = newMarkers;
        }
    };
    SearchComponent.prototype.onKey = function (event) {
        var options = {
            types: ['(regions)'],
            componentRestrictions: { country: "us" }
        };
        var input = document.getElementById('search_field');
        var autocomplete = new google.maps.places.Autocomplete(input, options);
    };
    SearchComponent.prototype.formatMoney = function (price) {
        var str = price.toString();
        var i = 0;
        var temp = "";
        var count = 0;
        for (i = str.length - 1; i >= 0; i--) {
            if (count == 3) {
                count = 0;
                temp = "," + temp;
            }
            temp = str.charAt(i) + temp;
            count++;
        }
        temp = "$" + temp;
        return temp;
    };
    __decorate([
        core_1.HostListener('window:scroll', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], SearchComponent.prototype, "doSomething", null);
    SearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'search-page',
            templateUrl: 'search.component.html',
            styleUrls: ['search.component.css'],
            providers: [listing_service_1.ListingService, token_service_1.TokenService]
        }), 
        __metadata('design:paramtypes', [listing_service_1.ListingService, router_2.Router, router_1.ActivatedRoute, core_1.NgZone])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
// var address = "4884 E 2800 N Eden Ut";
//
// geocoder.geocode( { 'address': address }, function(results, status) {
//   if ( status == google.maps.GeocoderStatus.OK ){
//     console.log(results[0].geometry.location.lat());
//     console.log(results[0].geometry.location.lng());
//   }else{
//     alert("Geocode was not successful for the following reason: " + status);
//   }
// });
//# sourceMappingURL=search.component.js.map