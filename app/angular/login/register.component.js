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
var login_service_1 = require('../login/login.service');
var token_service_1 = require('../login/token.service');
var user_1 = require('./user');
var RegisterComponent = (function () {
    function RegisterComponent(loginService, tokenService) {
        this.loginService = loginService;
        this.tokenService = tokenService;
    }
    RegisterComponent.prototype.ngOnInit = function () { };
    //Create new user in database by registering
    RegisterComponent.prototype.register = function (value) {
        var _this = this;
        var user = new user_1.User(value.first_name, value.last_name, value.username, 0, value.email_address, value.password, "", "", "");
        this.loginService.register(user).subscribe(function (obj) {
            console.log(obj);
            _this.tokenService.setAndVerifyToken(obj['token']);
            location.href = '/';
        }, function (error) {
            console.log(error);
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'register-page',
            templateUrl: 'register.component.html',
            styles: ['../../styles/style.css'],
            providers: [login_service_1.LoginService, token_service_1.TokenService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, token_service_1.TokenService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map