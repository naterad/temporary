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

import { Component, EventEmitter, Input, OnInit, Output, HostListener, NgZone } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { ListingService } from '../listing/listing.service';
import { TokenService } from '../login/token.service';
import { Home } from '../listing/home';
declare var google: any;
declare var InfoBox: any;

@Component({
  moduleId: module.id,
  selector: 'search-page',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  providers: [ListingService, TokenService]
})
export class SearchComponent implements OnInit {
  homes: Home[];
  errorMessage: any;
  mode = 'Observable';
  homeTypes = ['', 'Home', 'Apartment', 'Condo', 'Townhome', 'Manufactured', 'Lot'];
  public offset = 50;
  public searchLocation = "Loading...";
  public loading = false;
  public moreHomes = true;
  public oldHomesSize = 0;
  public bedsParam = 0;
  public bathsParam = 0;
  public sqftParam = 0;
  public yearBuiltParam = 0;
  public priceMinParam = 0;
  public priceMaxParam = 2000000;
  public mapMarkers = [];
  map: any;
  searchObject: Object;
  rangeValues: number[] = [0, 2000000];
  slider_max: number = 2000000;


  constructor(
    private listingService: ListingService,
    private router: Router,
    private route: ActivatedRoute,
    private _ngZone: NgZone) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.forEach((params: Params) => {

      if (params['input'] !== undefined) {
        let input = params['input'];
        console.log("Param was: " + input);
        var res = input.split(", ");
        console.log(res);

        if (res.length == 2) {
          this.setLocation(res[0]);
          var state = { "state": res[0] };
          this.getHomesParams(state);
        } else if (res.length == 3) {
          this.setLocation(res[0] + ", " + res[1]);
          var cityState = { "state": res[1], "city": res[0] };
          this.getHomesParams(cityState);
        } else {
          this.loadDefault();
        }
      } else {
        //If no params are entered, this gets current city of user
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
                /// remove this stuff
                obj = { "state": "UT", "city": "Provo" };
                input = "Provo, UT";
                this._ngZone.run(() => {

                  this.setLocation(input);
                  this.getHomesParams(obj);
                });
              }
            });
          });
        },
          (error) => {
            // navigator geolocation didn't work. Load default values
            console.log("couldn't get users current location. loading default location");
            this.loadDefault();
          });
      }
    });

  }
  loadDefault() {
    this.setLocation("Provo, UT");
    var obj = { "state": "UT", "city": "Provo" };
    this.getHomesParams(obj);
  }
  setLocation(input: string) {
    this.searchLocation = input;
  }
  changeBedsParam(value) {
    this.bedsParam = value;
    this.updateMarkers(true);
    this.createObject();
    this.getHomesParams(this.searchObject);
  }
  changeBathsParam(value) {
    this.bathsParam = value;
    this.updateMarkers(true);
    this.createObject();
    this.getHomesParams(this.searchObject);
  }
  changeSqFtParam(value) {
    this.sqftParam = value;
    this.updateMarkers(true);
    this.createObject();
    this.getHomesParams(this.searchObject);
  }
  changeYearBuiltParam(value) {
    this.yearBuiltParam = value;
    this.updateMarkers(true);
    this.createObject();
    this.getHomesParams(this.searchObject);
  }
  changeSlider(value){
    console.log(value);
    this.updateMarkers(false);
  }
  searchSubmit() {
    var input = (<HTMLInputElement>document.getElementById("search_field")).value;
    var res = input.split(", ");
    this.createObject();

    if (res.length == 2) {
      this.setLocation(res[0]);
      this.searchObject["state"] = res[0];
      delete this.searchObject["city"];
    } else if (res.length == 3) {
      this.setLocation(res[0] + ", " + res[1]);
      this.searchObject["city"] = res[0];
      this.searchObject["state"] = res[1];
    }
    this.getHomesParams(this.searchObject);
  }
  createObject() {
    if (this.bedsParam == 0) {
      delete this.searchObject["bedrooms"];
    } else {
      this.searchObject["bedrooms"] = this.bedsParam;
    }
    if (this.bathsParam == 0) {
      delete this.searchObject["bathrooms"];
    } else {
      this.searchObject["bathrooms"] = this.bathsParam;
    }

    if (this.sqftParam == 0) {
      delete this.searchObject["square_feet"];
    } else {
      this.searchObject["square_feet"] = this.sqftParam;
    }
    if (this.yearBuiltParam == 0) {
      delete this.searchObject["year_built"];
    } else {
      this.searchObject["year_built"] = this.yearBuiltParam;
    }
  }

  @HostListener('window:scroll', ['$event'])

  doSomething(event) {
    // console.debug("Scroll Event", document.body.scrollTop);
    // console.log(document.getElementById("scroll-container").scrollTop);
    if (document.getElementById("scroll-container").scrollTop != 0) {
      console.log("load more");
      this.loadMoreHomes();
    }
  }

  getHomesParams(obj: Object) {
    this.loading = true;
    this.searchObject = obj;
    this.listingService.getHomesParams(obj)
      .subscribe(
      // homes => console.log(this.homes = homes),
      homes => this.useHomes(homes),
      error => this.errorMessage = <any>error,
    );
  }
  newHomes(obj: Home[]) {
    var temp = [];
    if (this.homes) {
      var a, b = 0;
      for (a = 0; a < obj.length; a++) {
        var same = false;
        for (b = 0; b < this.homes.length; b++) {
          if (this.homes[b] == obj[a]) {
            same = true;
          }
        }
        if (!same) {
          temp.push(obj[a]);
        }
      }
    } else {
      temp = obj;
    }
    return temp;
  }

  useHomes(obj: Home[]) {
    console.log("useHomes");
	for (var i = 0; i < obj.length; i++) {
		console.log(obj[i]);
		if ((+(obj[i]['price_cents'])/100) > this.rangeValues[1]) {
			var sl_max = (+(obj[i]['price_cents'])/100);
			this.rangeValues = [0, sl_max];
			this.slider_max = sl_max;
		}
	}
    this.newHomes(obj);
    this.homes = obj;
    this.buildMap(40.2291259, -111.6611819);
    this.updateMarkers(true);
    this.loading = false;
    this.oldHomesSize = this.homes.length;
  }

  useMoreHomes(obj: Home[]) {
    console.log("useMoreHomes");
	for (var i = 0; i < obj.length; i++) {
		console.log(obj[i]);
		if ((+(obj[i]['price_cents'])/100) > this.rangeValues[1]) {
			var sl_max = (+(obj[i]['price_cents'])/100);
			this.rangeValues = [0, sl_max];
			this.slider_max = sl_max;
		}
	}
    this.homes = this.homes.concat(this.newHomes(obj));
    this.buildMarkers();
    this.updateMarkers(true);
    this.loading = false;
    if (this.homes.length == this.oldHomesSize) {
      this.moreHomes = false;
    } else {
      this.oldHomesSize = this.homes.length;
    }
  }
  getHomes() {
    this.listingService.getHomes()
      .subscribe(
      homes => this.homes = homes,
      error => this.errorMessage = <any>error);
  }

  loadMoreHomes() {
    this.loading = true;
    this.listingService.getHomesOffset(this.offset, this.searchObject)
      .subscribe(
      homes => this.useMoreHomes(homes),
      error => this.errorMessage = <any>error);
    this.offset = this.offset + 50;
  }
  gotoProperty(home: Home): void {
    let link = ['/property', home.home_id];
    this.router.navigate(link);
  }
  updateMarkers(updateRange) {
    var a = 0;
	if (updateRange) {
		for (a = 0; a < this.homes.length; a++) {
		  this.mapMarkers[a].setMap(null);
		  if ((+(this.homes[a]['price_cents'])/100) > this.rangeValues[1]) {
				var sl_max = (+(this.homes[a]['price_cents'])/100);
				this.rangeValues = [0, sl_max];
				this.slider_max = sl_max;
			}
		}
	}
    

    var should = 0;
    var i = 0;
    var shouldnt = 0;    
    for (i = 0; i < this.homes.length; i++) {
      if (Number(this.homes[i].price_cents)/100>=this.rangeValues[0] && Number(this.homes[i].price_cents)/100<=this.rangeValues[1] &&  Number(this.homes[i].bedrooms) / 100 >= this.bedsParam && Number(this.homes[i].bathrooms) / 100 >= this.bathsParam && Number(this.homes[i].square_feet) >= this.sqftParam && Number(this.homes[i].year_built) >= this.yearBuiltParam) {
        should++;
        // there is a problem with this. It says the right number of markers should be
        // showing but then it shows a couple more. Why would that be the case?
        // console.log(this.mapMarkers[i]);
        this.mapMarkers[i].setMap(this.map);
      } else {
        shouldnt++;
        // this.mapMarkers[i].setMap(null);
      }
    }
    console.log("should show: " + should);
    console.log("shouldnt show: " + shouldnt);
  }
  buildMap(lat: number, lng: number) {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      zoomControl: true,
      streetViewControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      scrollwheel: false,
      center: new google.maps.LatLng(lat, lng)
    });
    this.map = map;

    this.buildMarkers();

    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < this.mapMarkers.length; i++) {
      bounds.extend(this.mapMarkers[i].getPosition());
    }

    map.fitBounds(bounds);
  }
  buildMarkers() {
    var i = 0;
    var newMarkers = [];
    for (i = 0; i < this.homes.length; i++) {
      var marker = new google.maps.Marker({
        title: this.homes[i].title,
        position: new google.maps.LatLng(Number(this.homes[i].latitude) / 1000000, Number(this.homes[i].longitude) / 1000000),
        icon: "app/images/base-pin.png",
        map: this.map,
        labelContent: '<div class="marker-loaded"><div class="map-marker"><img src="app/images/marker-s.png" alt="" /></div></div>',
        labelAnchor: new google.maps.Point(50, 0),
        labelClass: "marker-style"
      });
      newMarkers.push(marker);
      var boxText = document.createElement("div");
      boxText.innerHTML =
        '<div class="infobox-inner" (click)="gotoProperty(home)">' +
        '<div class="infobox-image" style="position: relative">' +
        '<img src="' + this.homes[i].primary_image + '">' + '<div><span class="infobox-price">' + this.formatMoney(Number(this.homes[i].price_cents) / 100) + '<br>FOR SALE</span></div>' +
        '</div>' +
        '<div class="infobox-description">' +
        '<div class="infobox-title" (click)="gotoProperty(home)">' + this.homes[i].title + '</div>' +
        '<div class="infobox-location">' + this.homes[i].address + '</div>' +
        '</div>' +
        '</div>';
      var infoboxOptions = {
        content: boxText,
        disableAutoPan: false,
        pixelOffset: new google.maps.Size(-100, 0),
        zIndex: null,
        alignBottom: true,
        boxClass: "infobox-wrapper",
        enableEventPropagation: true,
        closeBoxMargin: "0px 0px -8px 0px",
        closeBoxURL: "app/images/close-btn.png",
        infoBoxClearance: new google.maps.Size(1, 1)
      };
      newMarkers[i].infobox = new InfoBox(infoboxOptions);
      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
          var h = 0;
          for (h = 0; h < newMarkers.length; h++) {
            newMarkers[h].infobox.close();
          }
          newMarkers[i].infobox.open(this.map, this);
        }
      })(marker, i));
      this.mapMarkers = newMarkers;
    }
  }
  onKey(event) {
    var options = {
      types: ['(regions)'],
      componentRestrictions: { country: "us" }
    };
    var input = document.getElementById('search_field');
    var autocomplete = new google.maps.places.Autocomplete(input, options);
  }
  formatMoney(price: number) {
    var str = price.toString();
    var i = 0;
    var temp = "";
    var count = 0;
    for (i = str.length - 1; i >= 0; i--) {
      if (count == 3) {
        count = 0;
        temp = "," + temp;
      }
      temp = str.charAt(i) + temp;
      count++;
    }
    temp = "$" + temp;
    return temp;
  }
}
// var address = "4884 E 2800 N Eden Ut";
//
// geocoder.geocode( { 'address': address }, function(results, status) {
//   if ( status == google.maps.GeocoderStatus.OK ){
//     console.log(results[0].geometry.location.lat());
//     console.log(results[0].geometry.location.lng());
//   }else{
//     alert("Geocode was not successful for the following reason: " + status);
//   }
// });
