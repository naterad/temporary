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
var serviceoffers_service_1 = require('../services/serviceoffers.service');
var home_1 = require('../listing/home');
var ListComponent = (function () {
    function ListComponent(listingService, serviceOffersService, tokenService, route, formBuilder) {
        this.listingService = listingService;
        this.serviceOffersService = serviceOffersService;
        this.tokenService = tokenService;
        this.route = route;
        this.formBuilder = formBuilder;
        this.mode = 'Observable';
        this.images = [];
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.geocodeAddress();
        this.initS3FileUpload($('#imageUploader'));
        this.initRialtoConnections();
        this.tokenService.getToken()
            .subscribe(function (obj) {
            _this.token = String(obj);
        }, function (error) { return console.log(error); });
    };
    ListComponent.prototype.geocodeAddress = function () {
        // code is at the bottom of page
    };
    ListComponent.prototype.initRialtoConnections = function () {
        var _this = this;
        var serviceOffer = {
            'category': 1,
            'zip_code': 84604
        };
        var that = this;
        this.serviceOffersService.getServiceOffers(serviceOffer)
            .subscribe(function (obj) {
            console.log(obj);
            that.photographyOffers = obj;
        }, function (error) { return _this.errorMessage = error; });
    };
    ;
    ListComponent.prototype.initS3FileUpload = function ($fileInput) {
        var that = this;
        $fileInput.fileupload({
            paramName: 'file',
            add: function (e, data) { that.s3add(e, data, that.token); },
            dataType: 'xml',
            done: this.onS3Done
        });
    };
    ;
    ListComponent.prototype.s3add = function (e, data, token) {
        if (data.files[0].size > 1000000) {
            //file is over 1 MB
            console.log('file over 1 MB');
            data.abort();
        }
        else if (data.files[0].type != 'image/jpeg') {
            console.log('file not a jpeg');
            //maybe convert it to a jpeg here.
            data.abort();
        }
        else {
            var filename = data.files[0].name; //this should really be a username + timestampe + random characters dealio to stop people from uploading the same stuff and overriding stuff.
            var credentialsUrl = localStorage.getItem('API_URL') + '/aws/' + filename;
            $.ajax({
                url: credentialsUrl,
                type: 'GET',
                dataType: 'json',
                data: {
                    token: token
                },
                success: function (s3Data) {
                    data.url = s3Data.data.endpoint_url;
                    data.formData = s3Data.data.params;
                    data.submit();
                }
            });
            var params = [];
            return params;
        }
    };
    ;
    ListComponent.prototype.onS3Done = function (e, data) {
        var s3Url = $(data.jqXHR.responseXML).find('Location').text();
        var s3Key = $(data.jqXHR.responseXML).find('Key').text();
        console.log('uploaded yooooo');
        console.log(s3Url);
        // this.images.push(new Image(1, 1, s3Url));
        // console.log($('<a/>').attr('href', s3Url).text('File uploaded at '+s3Url).appendTo($('body')));
    };
    ListComponent.prototype.logForm = function (value) {
        var _this = this;
        console.log(value);
        this.home = new home_1.Home(value.address, false, value.bathrooms * 100, value.bedrooms * 100, value.city, value.description, value.garage * 100, "0", "1", "400000000", //this needs to come from google api
        "1", "today", "1110000000", // this needs to come from google api too
        value.price + "00", "nope.jpg", // this doesn't work yet
        value.sqft, value.state, "FOR SALE", value.title, value.year_built, value.zip);
        this.listingService.postHome(this.home)
            .subscribe(function (obj) { return console.log(obj); }, function (error) { return _this.errorMessage = error; });
        // FORM INPUT
        // buyers_agent_percent
        // deck
        // eat_in_kitchen
        // family_room
        // fireplace
        // formal_dining_room
        // home_office
        // media_room
        // patio
        // photo_gallery
        // place
        // sqft_check
        // video
        // walk_in_closet
        // HOME OBJECT
        // address = address
        // archived = false
        // bathrooms = bathrooms(*100)
        // bedrooms = bedrooms(*100)
        // city = city
        // description = description
        // garage = garage
        // home_id = AUTO
        // home_type_id
        // latitude
        // listed_by = 1
        // listed_date = TODAY
        // longitude
        // price_cents = price(*100)
        // primary_image = featured_photo
        // square_feet = sqft
        // state = state
        // status = FOR SALE
        // title = title
        // year_built
        // zip_cod = zip
        //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
        // AIzaSyBiOW_X4mdGvDJWGQ3OfjJor2Pj6vwxcNo
    };
    ListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'list-page',
            templateUrl: 'list.component.html',
            styleUrls: [],
            providers: [listing_service_1.ListingService, serviceoffers_service_1.ServiceOffersService, token_service_1.TokenService]
        }), 
        __metadata('design:paramtypes', [listing_service_1.ListingService, serviceoffers_service_1.ServiceOffersService, token_service_1.TokenService, router_1.ActivatedRoute, forms_1.FormBuilder])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
// geocodeAddress() {
//   // This still doesn't work. Ignore for now
//   // var geocoder = new google.maps.Geocoder();
//   // var address = "Provo Utah";
//   // geocoder.geocode({'address': address}, function(results, status) {
//   //   if (status === 'OK') {
//   //     console.log(results);
//   //     console.log(results[0].geometry.location);
//   //
//   //   } else {
//   //     alert('Geocode was not successful for the following reason: ' + status);
//   //   }
//   // });
// }
//# sourceMappingURL=list.component.js.map