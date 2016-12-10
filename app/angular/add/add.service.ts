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
import { TokenService } from '../login/token.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare var google: any;

@Injectable()
export class AddService {
  private scrapeUrl = localStorage.getItem('API_URL') + '/scrape/';
  token: any;

  constructor(
	private http: Http,
	private tokenService: TokenService,
  ) {
	this.tokenService.getToken()
		.subscribe(
		obj => {				
			this.token = obj;				
		},
		error => console.log(error));
  }
  
  scrapeZillow(zillow: Object): Observable<Object> {
	let data = {
		"url": zillow['url'],
		"email": zillow['email'],
		"token": this.token
	}
    let body = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.scrapeUrl + 'zillow', body, options).map(this.extractData).catch(this.handleError);
  }
  
  scrapeKSL(ksl: Object): Observable<Object> {
	let data = {
		"url": ksl['url'],
		"email": ksl['email'],
		"token": this.token
	}
    let body = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.scrapeUrl + 'ksl', body, options).map(this.extractData).catch(this.handleError);
  }

  // Extract the home data from the JSON Response
  private extractData(res: Response) {
    let JSONresponse = res.json();
    return JSONresponse.data || {};
  }
  // To be improved for long term error handling...
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg); // log to console instead
    return errMsg;
  }
}
