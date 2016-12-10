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
var router_2 = require('@angular/router');
var LoginComponent = (function () {
    function LoginComponent(loginService, tokenService, route, router) {
        this.loginService = loginService;
        this.tokenService = tokenService;
        this.route = route;
        this.router = router;
        this.sending = false;
        this.success = false;
        this.success_message = '';
        this.error = false;
        this.error_message = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.FACEBOOK_REDIRECT_URL = localStorage.getItem('FACEBOOK_REDIRECT_URL');
        this.GOOGLE_REDIRECT_URL = localStorage.getItem('GOOGLE_REDIRECT_URL');
        this.route.params.forEach(function (params) {
            if (params['redirect'] !== undefined) {
                _this.param_redirect = params['redirect'];
                if (params['id'] !== undefined) {
                    _this.param_redirect += "/" + params['id'];
                }
            }
        });
    };
    LoginComponent.prototype.login = function (value) {
        var _this = this;
        this.sending = true;
        var user = {
            'username': value.username,
            'password': value.password
        };
        this.loginService.login(user)
            .subscribe(function (obj) {
            _this.tokenService.setAndVerifyToken(obj['token']);
            if (_this.param_redirect) {
                var link = [_this.param_redirect];
                _this.router.navigate(link);
            }
            else {
                location.href = '/';
            }
        }, function (error) {
            _this.errorMessage = error;
            _this.error = true;
            _this.sending = false;
            _this.error_message = 'Login failed: ' + _this.errorMessage['message'];
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login-page',
            templateUrl: 'login.component.html',
            providers: [login_service_1.LoginService, token_service_1.TokenService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, token_service_1.TokenService, router_1.ActivatedRoute, router_2.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map