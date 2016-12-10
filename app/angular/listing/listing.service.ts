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
import { Home } from './home';
import { Image } from './image';
import { Observable } from 'rxjs/Observable';
import { TokenService } from '../login/token.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare var google: any;


//Create the service
@Injectable()
export class ListingService {
  private homesUrl = localStorage.getItem('API_URL') + '/homes?bedrooms_operator=<&bedrooms=\'4\'';
  private homesUrlOffset = localStorage.getItem('API_URL') + '/homes?state_operator==&state=\'UT\'&offset=';
  private homesBaseUrl = localStorage.getItem('API_URL') + '/homes?';
  private homeByIdUrl = localStorage.getItem('API_URL') + '/home/';
  private imagesByIdUrl = localStorage.getItem('API_URL') + '/images/';
  private postHomeUrl = localStorage.getItem('API_URL') + '/home/';
  private token = "&token=" + this.tokenService.getToken();

  constructor(
	private http: Http,
	private tokenService: TokenService,
  ) { }

  //Get homes from the homes API
  getHomes(): Observable<Home[]> {
    return this.http.get(this.homesUrl).map(this.extractData).catch(this.handleError);
  }
  //Get homes from the homes API with params
  getHomesParams(obj: Object): Observable<Home[]> {
    var urlParams = this.buildParams(obj);
    // console.log(this.homesBaseUrl+urlParams);
    return this.http.get(this.homesBaseUrl+urlParams).map(this.extractData).catch(this.handleError);
  }
  //Get homes from the homes API with offset
  getHomesOffset(offset: number, obj: Object): Observable<Home[]> {
    var urlParams = this.buildParams(obj);
    // console.log(this.homesBaseUrl+urlParams+'&offset='+offset);
    return this.http.get(this.homesBaseUrl+urlParams+'&offset='+offset).map(this.extractData).catch(this.handleError);
    // return this.http.get(this.homesUrlOffset+offset).map(this.extractData).catch(this.handleError);
  }
  //Get home by Id from the homes API
  getHomeById(id: number): Observable<Home> {
    return this.http.get(this.homeByIdUrl+id).map(this.extractData).catch(this.handleError);
  }
  //Get images by Id from the homes API
  getImagesById(id: number): Observable<Image[]> {
    return this.http.get(this.imagesByIdUrl+id).map(this.extractData).catch(this.handleError);
  }
  postHome(home: Home): Observable<Object> {
    let body = JSON.stringify(home);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.postHomeUrl, body, options).map(this.extractData).catch(this.handleError);
  }
  //Extract the home data from the JSON Response
  private extractData(res: Response) {
    let JSONresponse = res.json();
    return JSONresponse.data || {};
  }
  //To be improved for long term error handling...
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg); // log to console instead
    return errMsg;
  }
  checkState(state: string){
    var states = new Map();
    state = state.toLowerCase();

    states.set("AL", ["alabama","al"]);
    states.set("AK", ["alaska","ak"]);
    states.set("AZ", ["arizona","az"]);
    states.set("AR", ["arkansas","ar"]);
    states.set("CA", ["california","ca"]);
    states.set("CO", ["colorado","co"]);
    states.set("CT", ["connecticut","ct"]);
    states.set("DE", ["delaware","de"]);
    states.set("DC", ["district of columbia","dc"]);
    states.set("FL", ["florida","fl"]);
    states.set("GA", ["georgia","ga"]);
    states.set("HI", ["hawaii","hi"]);
    states.set("ID", ["idaho","id"]);
    states.set("IL", ["illinois","il"]);
    states.set("IN", ["indiana","in"]);
    states.set("IA", ["iowa","ia"]);
    states.set("KS", ["kansas","ks"]);
    states.set("KY", ["kentucky","ky"]);
    states.set("LA", ["louisiana","la"]);
    states.set("ME", ["maine","me"]);
    states.set("MD", ["maryland","md"]);
    states.set("MA", ["massachusetts","ma"]);
    states.set("MI", ["michigan","mi"]);
    states.set("MN", ["minnesota","mn"]);
    states.set("MS", ["mississippi","ms"]);
    states.set("MO", ["missouri","mo"]);
    states.set("MT", ["montana","mt"]);
    states.set("NE", ["nebraska","ne"]);
    states.set("NV", ["nevada","nv"]);
    states.set("NH", ["new hampshire","nh"]);
    states.set("NJ", ["new jersey","nj"]);
    states.set("NM", ["new mexico","nm"]);
    states.set("NY", ["new york","ny"]);
    states.set("NC", ["north carolina","nc"]);
    states.set("ND", ["north dakota","nd"]);
    states.set("OH", ["ohio","oh"]);
    states.set("OK", ["oklahoma","ok"]);
    states.set("OR", ["oregon","or"]);
    states.set("PA", ["pennsylvania","pa"]);
    states.set("RI", ["rhode island","ri"]);
    states.set("SC", ["south carolina","sc"]);
    states.set("SD", ["south dakota","sd"]);
    states.set("TN", ["tennessee","tn"]);
    states.set("TX", ["texas","tx"]);
    states.set("UT", ["utah","ut"]);
    states.set("VT", ["vermot","vt"]);
    states.set("VA", ["virginia","va"]);
    states.set("WA", ["washington","wa"]);
    states.set("WV", ["west virginia","wv"]);
    states.set("WI", ["wisconsin","wi"]);
    states.set("WY", ["wyoming","wy"]);

    var correctState = "";
    states.forEach(function(value, key) {
      for (var v in value) {
        if(value[v]==state){
          correctState=key.toString();
        }
      }
    });
    return correctState;
  }
  buildParams(obj: Object){
    var params = "";
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if(key=="state"){
            params += "&"+key+"_operator==&"+key+"='"+this.checkState(obj[key])+"'";
        }else if(key=="city"){
            params += "&"+key+"_operator==&"+key+"='"+obj[key]+"'";
        }else if(key=="bathrooms" || key=="bedrooms"){
            params += "&"+key+"_operator=>=&"+key+"='"+obj[key]+"00'";
        }else if(key=="square_feet" || key=="year_built"){
            params += "&"+key+"_operator=>=&"+key+"='"+obj[key]+"'";
        }
      }
    }
    return params;
  }
}
