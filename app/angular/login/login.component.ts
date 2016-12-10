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


import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../login/login.service';
import { TokenService } from '../login/token.service';
import { Router } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'login-page',
	templateUrl: 'login.component.html',
	providers: [LoginService, TokenService]
})
export class LoginComponent implements OnInit {
	errorMessage: any;
	FACEBOOK_REDIRECT_URL: string;
	GOOGLE_REDIRECT_URL: string;
	param_redirect: string;
	sending = false;
    success = false;
    success_message = '';
    error = false;
    error_message = '';

	constructor(
		private loginService: LoginService,
		private tokenService: TokenService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.FACEBOOK_REDIRECT_URL = localStorage.getItem('FACEBOOK_REDIRECT_URL');
		this.GOOGLE_REDIRECT_URL = localStorage.getItem('GOOGLE_REDIRECT_URL');
		this.route.params.forEach((params: Params) => {
      if (params['redirect'] !== undefined) {
        this.param_redirect = params['redirect'];
				if(params['id'] !== undefined) {
					this.param_redirect += "/" + params['id'];
				}
      }
    });
	}

	login(value: any) {
		this.sending = true;
		var user = {
			'username': value.username,
			'password': value.password
		};

		this.loginService.login(user)
			.subscribe(
			obj => {
				this.tokenService.setAndVerifyToken(obj['token']);
				if(this.param_redirect){
					let link = [this.param_redirect];
					this.router.navigate(link);
				} else {
					location.href = '/';
				}
			},
			error => {
				this.errorMessage = <any>error;
				this.error = true;
				this.sending = false;
				this.error_message = 'Login failed: ' + this.errorMessage['message'];
			});


	}
}
