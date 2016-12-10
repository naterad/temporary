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

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
declare var google: any;


//Create the service
@Injectable()
export class TokenService {
	private verifyTokenUrl = localStorage.getItem('API_URL') + '/token/verify';

	//these should be the ONLY hardcoded urls in the entire site
	private environmentUrl = 'error';		
   	
	constructor(private http: Http) {
		
		var hostname = window.location.hostname;
		if (hostname == 'localhost') {
			this.environmentUrl = 'http://localhost:8080/api/environment/';
		} else if (window.location.hostname == 'mikaso-dev.herokuapp.com') {
			this.environmentUrl = 'https://mikaso-api-dev.herokuapp.com/api/environment/';
		} else if (window.location.hostname == 'mikaso-stage.herokuapp.com') {
			this.environmentUrl = 'https://mikaso-api-stage.herokuapp.com/api/environment/';
		} else if (window.location.hostname == 'mikasoapp.com') {
			this.environmentUrl = 'https://mikaso-api.herokuapp.com/api/environment/';
		}
		
	}
	
	getEnvironment(): Observable<Object> { 

		let timeout = localStorage.getItem('CONFIG_EXPIRE');

		if (!timeout) {						
			return this.http.get(this.environmentUrl).map(data => this.extractConfigData(data)).catch(err => this.handleError(err));
		}

		var date = new Date();
		var epochSeconds = Math.round(date.getTime() / 1000);

		if (+(this.getConfigExpire()) < epochSeconds) {			
			return this.http.get(this.environmentUrl).map(data => this.extractConfigData(data)).catch(err => this.handleError(err));
		}
		
		var data = this.getConfig();
		
		var token_observable = Observable.create(observer => {				
			observer.next(data);
			observer.complete();			
			return;
		});			
		return token_observable;
			
	}
	
	private extractConfigData(res: Response) {
		let JSONresponse = res.json();		
		this.setConfigTimeout();
		this.putConfig({'key': 'ANALYTICS_CODE', 'value': JSONresponse.data.ANALYTICS_CODE});
		this.putConfig({'key': 'FACEBOOK_REDIRECT_URL', 'value': JSONresponse.data.FACEBOOK_REDIRECT_URL});
		this.putConfig({'key': 'GOOGLE_REDIRECT_URL', 'value': JSONresponse.data.GOOGLE_REDIRECT_URL});
		this.putConfig({'key': 'API_URL', 'value': JSONresponse.data.API_URL});
		this.putConfig({'key': 'FRONTEND_URL', 'value': JSONresponse.data.FRONTEND_URL});		
		return JSONresponse.data || {};
	}
	
	putConfig(config: Object): void {
		return localStorage.setItem(config['key'], config['value']);
	}
	
	setConfigTimeout(): void {
		var date = new Date();
		var epochSeconds30Min = (Math.round(date.getTime() / 1000) + (60 * 10));
		return localStorage.setItem('CONFIG_EXPIRE', epochSeconds30Min.toString());
	}
	
	getConfig(): Object {
		var data = {
			'ANALYTICS_CODE': localStorage.getItem('ANALYTICS_CODE'),
			'FACEBOOK_REDIRECT_URL': localStorage.getItem('FACEBOOK_REDIRECT_URL'),
			'GOOGLE_REDIRECT_URL': localStorage.getItem('GOOGLE_REDIRECT_URL'),
			'API_URL': localStorage.getItem('API_URL'),
			'FRONTEND_URL': localStorage.getItem('FRONTEND_URL')
		};
		return data;
	}
	
	getConfigExpire(): string {
		return localStorage.getItem('CONFIG_EXPIRE');
	}

	verifyToken(token: string): Observable<Object> {		
		var token_object = {
			"token": token
		};
		let body = JSON.stringify(token_object);		
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this.verifyTokenUrl, body, options).map(data => this.extractData(data)).catch(err => this.handleError(err));
	}

	getExpire(): string {
		return localStorage.getItem('expire');
	}

	setExpire(): void {
		var date = new Date();
		var epochSeconds30Min = (Math.round(date.getTime() / 1000) + (60 * 30));
		return localStorage.setItem('expire', epochSeconds30Min.toString());
	}	

	getToken(): Observable<Object> {
		let token = localStorage.getItem('token');

		if (!token) {			
			this.removeToken();
			var token_observable = Observable.create(observer => {				
				observer.next(token);
				observer.complete();
				//return () => console.log('disposed yo');
				return;
			});			
			return token_observable;
		}

		var date = new Date();
		var epochSeconds = Math.round(date.getTime() / 1000);

		if (+(this.getExpire()) < epochSeconds) {			
			return this.verifyToken(token);
		}
		else {			
			var token_observable = Observable.create(observer => {				
				observer.next(token);
				observer.complete();				
				return;
			});			
			return token_observable;
		}
		
	}

	setToken(token: string): void {
		this.setExpire();
		return localStorage.setItem('token', token);
	}

	removeToken(): void {
		localStorage.removeItem('expire');
		return localStorage.removeItem('token');
	}

	setAndVerifyToken(token: string): Observable<Object> {
		this.setToken(token);
		return this.getToken();
	}

	private extractData(res: Response) {		
		let JSONresponse = res.json();		
		if (JSONresponse['status'] == 'success') {
			//setToken(JSONresponse['token']);			
			this.setToken(JSONresponse['token']);			
			return JSONresponse['token'];
		} else {			
			this.removeToken();			
			return null;
		}		
	}
	
	logOut(): void {
		this.removeToken();
	}

	private handleError(res: Response) {
		let JSONresponse = res.json();
		return Observable.throw(JSONresponse);
	}
}
