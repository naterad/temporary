import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { TokenService } from '../login/token.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'googlelogin-page',
    templateUrl: 'googlelogin.component.html',
	providers: [LoginService, TokenService]
})
export class GoogleLoginComponent implements OnInit, OnDestroy {
    loggedIn = false;
	cancelledOrFailed = false;
	private subscription: Subscription;
	errorMessage: any;
    constructor(
		private activatedRoute: ActivatedRoute,
		private loginService: LoginService,
		private tokenService: TokenService
	) {}

    ngOnInit() {
		var that = this;
		this.subscription = this.activatedRoute.queryParams.subscribe(
			(param: any) => {
				console.log(param);
				let error = param['error'];				
				console.log(error);
				if (error && error.length > 0)
				{
					that.loggedIn = false;
					that.cancelledOrFailed = true;
				}
				let code = param['code'];
				console.log(code);
				if (code && code.length > 0)
				{
					that.loggedIn = true;
					that.cancelledOrFailed = false;
				}
				//call my endpoint with code to login and get the token
				var codeObject = {
					"code": code
				}
				this.loginService.loginGoogle(codeObject)
					.subscribe(
					obj => {
						console.log(obj);
						this.tokenService.setAndVerifyToken(obj['token']);
					}, //obj.token is the token (same as a normal login, use it on posts and stuff) ORRRRR its an error message
					error => this.errorMessage = <any>error);
			});
	}
	
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}