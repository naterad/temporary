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
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
var token_service_1 = require('../login/token.service');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var AddService = (function () {
    function AddService(http, tokenService) {
        var _this = this;
        this.http = http;
        this.tokenService = tokenService;
        this.scrapeUrl = localStorage.getItem('API_URL') + '/scrape/';
        this.tokenService.getToken()
            .subscribe(function (obj) {
            _this.token = obj;
        }, function (error) { return console.log(error); });
    }
    AddService.prototype.scrapeZillow = function (zillow) {
        var data = {
            "url": zillow['url'],
            "email": zillow['email'],
            "token": this.token
        };
        var body = JSON.stringify(data);
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.scrapeUrl + 'zillow', body, options).map(this.extractData).catch(this.handleError);
    };
    AddService.prototype.scrapeKSL = function (ksl) {
        var data = {
            "url": ksl['url'],
            "email": ksl['email'],
            "token": this.token
        };
        var body = JSON.stringify(data);
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.scrapeUrl + 'ksl', body, options).map(this.extractData).catch(this.handleError);
    };
    // Extract the home data from the JSON Response
    AddService.prototype.extractData = function (res) {
        var JSONresponse = res.json();
        return JSONresponse.data || {};
    };
    // To be improved for long term error handling...
    AddService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg); // log to console instead
        return errMsg;
    };
    AddService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, token_service_1.TokenService])
    ], AddService);
    return AddService;
}());
exports.AddService = AddService;
//# sourceMappingURL=add.service.js.map