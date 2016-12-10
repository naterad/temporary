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


import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { TokenService } from '../login/token.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'faceboooklogin-page',
    templateUrl: 'facebooklogin.component.html',
	providers: [LoginService, TokenService]
})
export class FacebookLoginComponent implements OnInit, OnDestroy {
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
				this.loginService.loginFacebook(codeObject)
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