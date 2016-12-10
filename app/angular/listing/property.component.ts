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

/// <reference path="../../../typings/fbsdk.d.ts" />
import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ListingService } from '../listing/listing.service';
import { TokenService } from '../login/token.service';
import { Home } from '../listing/home';
import { Image } from '../listing/image';
declare var $: any;


@Component({
  moduleId: module.id,
  selector: 'property-page',
  templateUrl: 'property.component.html',
  styleUrls: [],
  providers: [ListingService, TokenService]
})
export class PropertyComponent implements OnInit {
  home: Home;
  images: Image[];
  errorMessage: any;
  mode = 'Observable';
  gallery: any[];
  url: any;  


  constructor(
    private listingService: ListingService,
    private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.getHome();
    this.getImages();
	this.url = location.href;
  }

  //Get the home from the DB
  getHome() {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.listingService.getHomeById(id)
          .subscribe(
          home => {
			  this.home = home;					  			  		
		  },
          error => this.errorMessage = <any>error);
      } else {
        console.log("ERROR: no id. getHome()");
      }
    });
  }

  //Get images for the home
  getImages() {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.listingService.getImagesById(id)
          .subscribe(
          images => {
            this.images = images;

            //Add the images to the gallery on the page
            this.gallery = [];
            for (let image of this.images) {
              this.gallery.push({ source: image.image_url.toString(), alt: '', title: '' });
            }
            
          },
          error => this.errorMessage = <any>error);

      } else {
        console.log("ERROR: no id. getImages()");
      }
    });
  }
  
  shareFacebook() {	
	FB.ui({
		method: 'share',
		href: location.href,
		quote: 'Check out my new posting on Mikaso'
	}, function(response){console.log(response);});
  }

}
