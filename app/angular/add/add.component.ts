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
import { AddService } from './add.service';
import { TokenService } from '../login/token.service';
import { Home } from '../listing/home';
declare var google: any;

@Component({
  moduleId: module.id,
  selector: 'add-page',
  templateUrl: 'add.component.html',
  styleUrls: [],
  providers: [AddService]
})
export class AddComponent {
  errorMessage: any;
  mode = 'Observable';
  sending = false;
  success = false;
  success_message = '';
  error = false;
  error_message = '';

  constructor(
    private addService: AddService) {

		setTimeout(function() {

			var order = ['M','I','K','K2','K3','A','KNOB','S','O'];

			/*for (var i = 0; i < order.length; i++) {

				var elem = document.querySelector('#' + order[i]);
				var elem_length = elem.getTotalLength();
				var elem_orig_length = elem_length + 0;

				elem.style.strokeDasharray = elem_length;
				elem.style.strokeDashoffset = elem_length;

				animateRoute(elem, elem_length, elem_orig_length);
			}*/

			function redraw(time) {
				setTimeout(function() {
					for (var i = 0; i < order.length; i++) {

						var elem = document.querySelector('#' + order[i]);
						var elem_length = elem['getTotalLength']();

						elem['style']['strokeDasharray'] = elem_length;
						elem['style']['strokeDashoffset'] = elem_length;

					}
					draw(0);
				}, time);

			}

			function draw(i) {
				if (i >= order.length) {
					redraw(150);
				} else {
					var elem = document.querySelector('#' + order[i]);
					var elem_length = elem['getTotalLength']();
					var elem_orig_length = elem_length + 0;

					elem['style']['strokeDasharray'] = elem_length;
					elem['style']['strokeDashoffset'] = elem_length;

					animateRoute(elem, elem_length, elem_orig_length, i);
				}
			}


			function animateRoute(e, len, orig, i) {
				len -= 2;
				if (len <= 0) {
					len = 0;
					draw(i + 1);
				}

				e.style.strokeDashoffset = len;

				if (len > 0) {
					setTimeout(function() { animateRoute(e, len, orig, i); }, 5);
				}
			}

			redraw(0);


		}, 1000 );
	}

  logForm(value: any) {
	this.sending = true;
    if(value.ksl_url){
      console.log(value.ksl_url);
      console.log(value.ksl_email);
	  var ksl = {
		  'url': value.ksl_url,
		  'email': value.ksl_email
	  }
	  this.addService.scrapeKSL(ksl)
		.subscribe(
        obj => {
		  this.sending = false;
		  if (obj['home_id']) {
			this.success = true;
			this.success_message = 'Successfully added home with home_id: ' + obj['home_id'];
			var that = this;
			setTimeout(function() {that.success = false;}, 3000);
		  } else {
			this.error = true;
			this.error_message = 'Failed with error: ' + this.errorMessage + '. Are you logged in?';
			var that = this;
			setTimeout(function() {that.error = false;}, 3000);
		  }

          console.log(obj);
        },
        error => {
			this.errorMessage = <any>error;
			this.sending = false;
			this.error = true;
			this.error_message = 'Failed with error: ' + this.errorMessage;
			var that = this;
			setTimeout(function() {that.error = false;}, 3000);
		});
      // this.addService.getKSLHome(value.ksl)
      //   .subscribe(
      //   (home) => {
      //     this.home = home;
      //   },
      //   error => this.errorMessage = <any>error);
    }
    if(value.zillow_url){
      console.log(value.zillow_url);
      console.log(value.zillow_email);
	  var zillow = {
		  'url': value.zillow_url,
		  'email': value.zillow_email
	  }
	  this.addService.scrapeZillow(zillow)
		.subscribe(
        obj => {
		  this.sending = false;
		  if (obj['home_id']) {
			this.success = true;
			this.success_message = 'Successfully added home with home_id: ' + obj['home_id'];
			var that = this;
			setTimeout(function() {that.success = false;}, 3000);
		  } else {
			this.error = true;
			this.error_message = 'Failed with error: ' + this.errorMessage + '. Are you logged in?';
			var that = this;
			setTimeout(function() {that.error = false;}, 3000);
		  }
          console.log(obj);
        },
        error => {
			this.errorMessage = <any>error;
			this.sending = false;
			this.error = true;
			this.error_message = 'Failed with error: ' + this.errorMessage;
			var that = this;
			setTimeout(function() {that.error = false;}, 3000);
		});
      // this.addService.getZillowHome(value.zillow)
      //   .subscribe(
      //   (home) => {
      //     this.home = home;
      //   },
      //   error => this.errorMessage = <any>error);
    }
  }
}
