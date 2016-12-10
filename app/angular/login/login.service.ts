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
import { User } from './user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
declare var google: any;


//Create the service
@Injectable()
export class LoginService {
  private loginUrl = localStorage.getItem('API_URL') + '/login/';
  private loginFacebookUrl = localStorage.getItem('API_URL') + '/login/facebook';
  private loginGoogleUrl = localStorage.getItem('API_URL') + '/login/google';  
  private registerUserUrl = localStorage.getItem('API_URL') + '/user/';
  private userDetailsUrl = localStorage.getItem('API_URL') + '/user/';

  constructor(
	private http: Http	
  ) { }

  //Login the user (using Mikaso)
  login(user: Object): Observable<Object> {
    let body = JSON.stringify(user);
    console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.loginUrl, body, options).map(this.extractData).catch(this.handleError);
  }

  //Login the user with Facebook
  loginFacebook(code: Object): Observable<Object> {
    console.log(code);
    let body = JSON.stringify(code);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.loginFacebookUrl, body, options).map(this.extractData).catch(this.handleError);
  }

  //Login the user with Google
  loginGoogle(code: Object): Observable<Object> {
    console.log(code);
    let body = JSON.stringify(code);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.loginGoogleUrl, body, options).map(this.extractData).catch(this.handleError);
  }

  //Register the user
  register(user: User): Observable<Object> {
    console.log("posting user" + user);
    let body = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.registerUserUrl, body, options).map(this.extractData).catch(this.handleError);
  }
  
  getUserDetails(token: string): Observable<Object[]> {
    var urlParams = '?token=' + token;
    console.log(this.userDetailsUrl+urlParams);
    return this.http.get(this.userDetailsUrl+urlParams).map(this.extractData).catch(this.handleError);
  }

  //Extract the home data from the JSON Response
  private extractData(res: Response) {
    let JSONresponse = res.json();
    return JSONresponse || {};
  }

  //Handle the error and return the error object
  private handleError(res: Response) {
    let JSONresponse = res.json();
    return Observable.throw(JSONresponse);
  }
}
