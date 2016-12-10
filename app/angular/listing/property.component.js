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
/// <reference path="../../../typings/fbsdk.d.ts" />
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var listing_service_1 = require('../listing/listing.service');
var token_service_1 = require('../login/token.service');
var PropertyComponent = (function () {
    function PropertyComponent(listingService, route) {
        this.listingService = listingService;
        this.route = route;
        this.mode = 'Observable';
    }
    PropertyComponent.prototype.ngOnInit = function () {
        this.getHome();
        this.getImages();
        this.url = location.href;
    };
    //Get the home from the DB
    PropertyComponent.prototype.getHome = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            if (params['id'] !== undefined) {
                var id = +params['id'];
                _this.listingService.getHomeById(id)
                    .subscribe(function (home) {
                    _this.home = home;
                }, function (error) { return _this.errorMessage = error; });
            }
            else {
                console.log("ERROR: no id. getHome()");
            }
        });
    };
    //Get images for the home
    PropertyComponent.prototype.getImages = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            if (params['id'] !== undefined) {
                var id = +params['id'];
                _this.listingService.getImagesById(id)
                    .subscribe(function (images) {
                    _this.images = images;
                    //Add the images to the gallery on the page
                    _this.gallery = [];
                    for (var _i = 0, _a = _this.images; _i < _a.length; _i++) {
                        var image = _a[_i];
                        _this.gallery.push({ source: image.image_url.toString(), alt: '', title: '' });
                    }
                }, function (error) { return _this.errorMessage = error; });
            }
            else {
                console.log("ERROR: no id. getImages()");
            }
        });
    };
    PropertyComponent.prototype.shareFacebook = function () {
        FB.ui({
            method: 'share',
            href: location.href,
            quote: 'Check out my new posting on Mikaso'
        }, function (response) { console.log(response); });
    };
    PropertyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'property-page',
            templateUrl: 'property.component.html',
            styleUrls: [],
            providers: [listing_service_1.ListingService, token_service_1.TokenService]
        }), 
        __metadata('design:paramtypes', [listing_service_1.ListingService, router_1.ActivatedRoute])
    ], PropertyComponent);
    return PropertyComponent;
}());
exports.PropertyComponent = PropertyComponent;
//# sourceMappingURL=property.component.js.map