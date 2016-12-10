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
var offers_service_1 = require('../offers/offers.service');
var listing_service_1 = require('../listing/listing.service');
var token_service_1 = require('../login/token.service');
var MakeOfferComponent = (function () {
    function MakeOfferComponent(offersService, listingService, tokenService, route) {
        var _this = this;
        this.offersService = offersService;
        this.listingService = listingService;
        this.tokenService = tokenService;
        this.route = route;
        this.showPDF = false;
        this.buyer_seller = [];
        this.buyer_seller.push({ label: 'Select Party', value: null });
        this.buyer_seller.push({ label: 'Buyer', value: { id: 1, name: 'Buyer', code: 'B' } });
        this.buyer_seller.push({ label: 'Seller', value: { id: 2, name: 'Seller', code: 'S' } });
        this.home = {
            'address': '',
            'city': '',
            'state': '',
            'zip_code': ''
        };
        this.route.params.forEach(function (params) {
            if (params['id'] !== undefined) {
                var id = +params['id'];
                _this.home_id = id;
                _this.tokenService.getToken()
                    .subscribe(function (obj) {
                    if (!obj || !obj['length'] || !(obj['length'] > 0)) {
                        console.log(obj);
                        location.href = '/login/make-offer/' + _this.home_id;
                    }
                    else {
                        _this.token = obj;
                    }
                }, function (error) {
                    location.href = '/login/make-offer/' + _this.home_id;
                });
                _this.listingService.getHomeById(id)
                    .subscribe(function (home) { return _this.home = home; }, function (error) { return console.log(error); });
            }
            else {
                console.log("ERROR: no id. getHome()");
                location.href = '/';
            }
        });
    }
    MakeOfferComponent.prototype.ngOnInit = function () {
        //Use these vars to control the 3 pane form process
        this.show_form_choice = true;
        this.show_legal = false;
        this.show_offer = false;
        this.show_confirmation = false;
        this.legal_agree = false;
        this.initS3FileUpload($('#pdfUploader'));
    };
    //Show agreement check, move to the next pane
    MakeOfferComponent.prototype.agreeToTerms = function () {
        var _this = this;
        setTimeout(function () {
            _this.show_legal = !_this.show_legal;
            _this.show_offer = !_this.show_offer;
        }, 1000);
    };
    //Use mikaso form, so next div
    MakeOfferComponent.prototype.useMikaso = function () {
        var _this = this;
        setTimeout(function () {
            _this.show_form_choice = !_this.show_form_choice;
            _this.show_legal = !_this.show_legal;
        }, 1000);
    };
    //Use mikaso form, so next div
    MakeOfferComponent.prototype.uploadPDF = function () {
        var _this = this;
        console.log('uploadPDF');
        this.showPDF = true;
        setTimeout(function () {
            _this.initS3FileUpload($('#pdfUploader'));
        }, 200);
    };
    MakeOfferComponent.prototype.initS3FileUpload = function ($fileInput) {
        var that = this;
        $fileInput.fileupload({
            paramName: 'file',
            add: function (e, data) { that.s3add(e, data, that.token); },
            dataType: 'xml',
            done: this.onS3Done
        });
    };
    ;
    MakeOfferComponent.prototype.s3add = function (e, data, token) {
        if (data.files[0].size > 100000000) {
            //file is over 1 MB
            console.log('file over 100 MB');
            data.abort();
        }
        else if (data.files[0].type != 'application/pdf') {
            console.log('file not a pdf');
            data.abort();
        }
        else {
            var filename = data.files[0].name; //this should really be a username + timestampe + random characters dealio to stop people from uploading the same stuff and overriding stuff.
            var credentialsUrl = localStorage.getItem('API_URL') + '/aws/' + filename + '?token=' + token;
            $.ajax({
                url: credentialsUrl,
                type: 'GET',
                dataType: 'json',
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
    MakeOfferComponent.prototype.onS3Done = function (e, data) {
        var s3Url = $(data.jqXHR.responseXML).find('Location').text();
        var s3Key = $(data.jqXHR.responseXML).find('Key').text();
        console.log('uploaded yooooo');
        console.log(s3Url);
        // this.images.push(new Image(1, 1, s3Url));
        // console.log($('<a/>').attr('href', s3Url).text('File uploaded at '+s3Url).appendTo($('body')));
    };
    /*continue() {
      setTimeout(() => {
        this.show_confirmation = !this.show_confirmation;
      }, 500)
      setTimeout(() => {
        location.href = '/';
      }, 2000)
    }*/
    MakeOfferComponent.prototype.logForm = function (value) {
        console.log(value);
        value['home_id'] = this.home_id;
        this.offersService.makeOffer(value)
            .subscribe(function (obj) {
            console.log(obj);
        }, function (error) {
            console.log(error);
        });
    };
    MakeOfferComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'make-offer-page',
            templateUrl: 'make_offer.component.html',
            styleUrls: [],
            providers: [offers_service_1.OffersService, listing_service_1.ListingService, token_service_1.TokenService]
        }), 
        __metadata('design:paramtypes', [offers_service_1.OffersService, listing_service_1.ListingService, token_service_1.TokenService, router_1.ActivatedRoute])
    ], MakeOfferComponent);
    return MakeOfferComponent;
}());
exports.MakeOfferComponent = MakeOfferComponent;
//# sourceMappingURL=make_offer.component.js.map