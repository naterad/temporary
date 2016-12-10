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
var GoogleLoginComponent = (function () {
    function GoogleLoginComponent(activatedRoute, loginService, tokenService) {
        this.activatedRoute = activatedRoute;
        this.loginService = loginService;
        this.tokenService = tokenService;
        this.loggedIn = false;
        this.cancelledOrFailed = false;
    }
    GoogleLoginComponent.prototype.ngOnInit = function () {
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
            _this.loginService.loginGoogle(codeObject)
                .subscribe(function (obj) {
                console.log(obj);
                _this.tokenService.setAndVerifyToken(obj['token']);
            }, //obj.token is the token (same as a normal login, use it on posts and stuff) ORRRRR its an error message
            function (//obj.token is the token (same as a normal login, use it on posts and stuff) ORRRRR its an error message
                error) { return _this.errorMessage = error; });
        });
    };
    GoogleLoginComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    GoogleLoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'googlelogin-page',
            templateUrl: 'googlelogin.component.html',
            providers: [login_service_1.LoginService, token_service_1.TokenService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, login_service_1.LoginService, token_service_1.TokenService])
    ], GoogleLoginComponent);
    return GoogleLoginComponent;
}());
exports.GoogleLoginComponent = GoogleLoginComponent;
//# sourceMappingURL=googlelogin.component.js.map