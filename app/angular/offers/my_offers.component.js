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
var token_service_1 = require('../login/token.service');
var router_1 = require('@angular/router');
var offers_service_1 = require('./offers.service');
var MyOffersComponent = (function () {
    function MyOffersComponent(tokenService, offersService, router) {
        this.tokenService = tokenService;
        this.offersService = offersService;
        this.router = router;
        this.message = "";
        this.tokenService.getToken()
            .subscribe(function (obj) {
            if (!obj || !obj['length'] || !(obj['length'] > 0)) {
                location.href = '/login';
            }
        }, function (error) {
            location.href = '/login';
        });
    }
    //  /offer_chain/{offer_chain_id}:
    //  /offers/{user_id}:
    MyOffersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tokenService.getToken()
            .subscribe(function (obj) {
            _this.token = obj;
            console.log(_this.token);
            if (!_this.token) {
                _this.message = "Pleae log in first";
                var link = ['/login/my-offers'];
                _this.router.navigate(link);
            }
            else {
                // this.message = "Logged in!";
                _this.message = "";
                _this.offersService.getOffers(_this.token)
                    .subscribe(
                // obj => console.log(obj),
                // error => this.errorMessage = <any>error
                // .subscribe(
                function (obj) {
                    // this.offerChains = obj;
                    console.log(obj);
                    _this.offerChains = obj.offer_chains;
                    // console.log(this.offers);
                }, function (error) {
                    console.log(error);
                });
            }
        }, function (error) {
            console.log(error);
            _this.message = "An error occured. Please log in again.";
            var link = ['/login/my-offers'];
            _this.router.navigate(link);
        });
    };
    MyOffersComponent.prototype.acceptOffer = function (offerChain) {
        var _this = this;
        console.log(offerChain);
        this.offersService.acceptOffer(offerChain)
            .subscribe(function (obj) { return console.log(obj); }, function (error) { return _this.errorMessage = error; });
        var link = ['/next-steps'];
        this.router.navigate(link);
    };
    MyOffersComponent.prototype.counterOffer = function (offerChain) {
        var _this = this;
        console.log(offerChain);
        this.offersService.counterOffer(offerChain)
            .subscribe(function (obj) { return console.log(obj); }, function (error) { return _this.errorMessage = error; });
    };
    MyOffersComponent.prototype.rejectOffer = function (offerChain) {
        var _this = this;
        console.log(offerChain);
        this.offersService.rejectOffer(offerChain)
            .subscribe(function (obj) { return console.log(obj); }, function (error) { return _this.errorMessage = error; });
    };
    MyOffersComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'myoffers-page',
            templateUrl: 'my_offers.component.html',
            providers: [token_service_1.TokenService, offers_service_1.OffersService],
            styleUrls: []
        }), 
        __metadata('design:paramtypes', [token_service_1.TokenService, offers_service_1.OffersService, router_1.Router])
    ], MyOffersComponent);
    return MyOffersComponent;
}());
exports.MyOffersComponent = MyOffersComponent;
//# sourceMappingURL=my_offers.component.js.map