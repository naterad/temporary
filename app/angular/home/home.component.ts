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

import { Component, EventEmitter, Input, OnInit, Output, NgZone } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { ListingService } from '../listing/listing.service';
import { TokenService } from '../login/token.service';
import { Home } from '../listing/home';
declare var google: any;

@Component({
  moduleId: module.id,
  selector: 'home-page',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [ListingService, TokenService]
})
export class HomeComponent implements OnInit {
  public loading = true;
  homes: Home[];
  errorMessage: any;
  mode = 'Observable';

  constructor(
    private listingService: ListingService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _ngZone: NgZone) { }

  ngOnInit() {
    this.loadDefault();
    navigator.geolocation.getCurrentPosition((location) => {
      // navigator geolocation worked. Sweet.
      var geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
      this._ngZone.runOutsideAngular(() => {
        geocoder.geocode({ 'latLng': latlng }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            var state = results[2].address_components[2].short_name;
            var city = results[2].address_components[0].long_name;
            var input = results[2].address_components[0].long_name + ", " + results[2].address_components[2].short_name;
            var obj = { "state": state, "city": city };
            this._ngZone.run(() => {
              //this.getHomesParams(obj);
            });
          }
        });
      });
    },
      (error) => {
        // navigator geolocation didn't work. Load default values
        console.log("couldn't get users current location. loading default location");
        //this.loadDefault();
      });
  }
  loadDefault() {
    var obj = { "city":"Provo", "state": "UT" };
    this.getHomesParams(obj);
  }
  getHomesParams(obj: Object) {
    this.listingService.getHomesParams(obj)
      .subscribe(
      (homes) => {
        this.homes = homes;
        this.loading = false;
      },
      error => this.errorMessage = <any>error,
    );
  }
  getHomes() {
    this.listingService.getHomes()
      .subscribe(
      (homes) => {
        this.homes = homes;
        this.loading = false;
      },
      error => this.errorMessage = <any>error);
  }
  gotoProperty(home: Home): void {
    let link = ['/property', home.home_id];
    this.router.navigate(link);
  }
  onKey(event) {
    var options = {
      types: ['(regions)'],
      componentRestrictions: { country: "us" }
    };
    var input = document.getElementById('search_field');
    var autocomplete = new google.maps.places.Autocomplete(input, options);
  }
  logForm(value: any) {
    var input = (<HTMLInputElement>document.getElementById("search_field")).value;
    let link = ['/search', input];
    this.router.navigate(link);
  }
}
