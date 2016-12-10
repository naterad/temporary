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
var login_service_1 = require('../login/login.service');
var token_service_1 = require('../login/token.service');
var FacebookLoginComponent = (function () {
    function FacebookLoginComponent(activatedRoute, loginService, tokenService) {
        this.activatedRoute = activatedRoute;
        this.loginService = loginService;
        this.tokenService = tokenService;
        this.loggedIn = false;
        this.cancelledOrFailed = false;
    }
    FacebookLoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        var that = this;
        this.subscription = this.activatedRoute.queryParams.subscribe(function (param) {
            console.log(param);
            var error = param['error'];
            console.log(error);
            if (error && error.length > 0) {
                that.loggedIn = false;
                that.cancelledOrFailed = true;
            }
            var code = param['code'];
            console.log(code);
            if (code && code.length > 0) {
                that.loggedIn = true;
                that.cancelledOrFailed = false;
            }
            //call my endpoint with code to login and get the token
            var codeObject = {
                "code": code
            };
            _this.loginService.loginFacebook(codeObject)
                .subscribe(function (obj) {
                console.log(obj);
                _this.tokenService.setAndVerifyToken(obj['token']);
            }, //obj.token is the token (same as a normal login, use it on posts and stuff) ORRRRR its an error message
            function (//obj.token is the token (same as a normal login, use it on posts and stuff) ORRRRR its an error message
                error) { return _this.errorMessage = error; });
        });
    };
    FacebookLoginComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    FacebookLoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'faceboooklogin-page',
            templateUrl: 'facebooklogin.component.html',
            providers: [login_service_1.LoginService, token_service_1.TokenService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, login_service_1.LoginService, token_service_1.TokenService])
    ], FacebookLoginComponent);
    return FacebookLoginComponent;
}());
exports.FacebookLoginComponent = FacebookLoginComponent;
//# sourceMappingURL=facebooklogin.component.js.map