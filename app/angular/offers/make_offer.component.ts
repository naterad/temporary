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
import { ActivatedRoute, Params } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import { OffersService } from '../offers/offers.service';
import { ListingService } from '../listing/listing.service';
import { TokenService } from '../login/token.service';
declare var $:any;

@Component({
  moduleId: module.id,
  selector: 'make-offer-page',
  templateUrl: 'make_offer.component.html',
  styleUrls: [],
  providers: [OffersService, ListingService, TokenService]
})

export class MakeOfferComponent implements OnInit {
  private show_form_choice: boolean;
  private show_legal: boolean;
  private show_offer: boolean;
  private show_confirmation: boolean;
  private legal_agree: boolean;
  purchase_price: number;
  buyer_seller: SelectItem[];
  home_id: number;
  home: Object;
  token: any;
  showPDF: any;

  constructor(
    private offersService: OffersService,
    private listingService: ListingService,
    private tokenService: TokenService,
    private route: ActivatedRoute
  ) {
	this.showPDF = false;
    this.buyer_seller = [];
    this.buyer_seller.push({ label: 'Select Party', value: null });
    this.buyer_seller.push({ label: 'Buyer', value: { id: 1, name: 'Buyer', code: 'B' } });
    this.buyer_seller.push({ label: 'Seller', value: { id: 2, name: 'Seller', code: 'S' } });
    this.home = {
      'address': '',
      'city': '',
      'state': '',
      'zip_code': ''
    };
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.home_id = id;
        this.tokenService.getToken()
          .subscribe(
          obj => {
            if (!obj || !obj['length'] || !(obj['length'] > 0)) {
              console.log(obj);
              location.href = '/login/make-offer/'+this.home_id;
            } else {
			  this.token = obj;
			}
          },
          error => {
            location.href = '/login/make-offer/'+this.home_id;
          });

        this.listingService.getHomeById(id)
          .subscribe(
          home => this.home = home,
          error => console.log(error));
      } else {
        console.log("ERROR: no id. getHome()");
        location.href = '/';
      }
    });
  }


  ngOnInit() {
    //Use these vars to control the 3 pane form process
    this.show_form_choice = true;
    this.show_legal = false;
    this.show_offer = false;
    this.show_confirmation = false;
    this.legal_agree = false;
	this.initS3FileUpload($('#pdfUploader'));

  }

  //Show agreement check, move to the next pane
  agreeToTerms() {
    setTimeout(() => {
      this.show_legal = !this.show_legal;
      this.show_offer = !this.show_offer;
    }, 1000)
  }

  //Use mikaso form, so next div
  useMikaso() {
    setTimeout(() => {
      this.show_form_choice = !this.show_form_choice;
      this.show_legal = !this.show_legal;
    }, 1000)
  }

  //Use mikaso form, so next div
  uploadPDF() {
    console.log('uploadPDF');
	this.showPDF = true;
	setTimeout(() => {
		this.initS3FileUpload($('#pdfUploader'));
	}, 200)

  }

  initS3FileUpload($fileInput) {
	var that = this;
    $fileInput.fileupload({
      paramName: 'file',
	  add: function(e, data){that.s3add(e, data, that.token);},
      dataType: 'xml',
      done: this.onS3Done
    });
  };

  s3add(e, data, token) {

	if (data.files[0].size > 100000000) {
		//file is over 1 MB
		console.log('file over 100 MB');
		data.abort();
	} else if (data.files[0].type != 'application/pdf') {
		console.log('file not a pdf');
		data.abort();
	} else {
		var filename = data.files[0].name;//this should really be a username + timestampe + random characters dealio to stop people from uploading the same stuff and overriding stuff.
		var credentialsUrl = localStorage.getItem('API_URL') + '/aws/' + filename + '?token=' + token;
		$.ajax({
		  url: credentialsUrl,
		  type: 'GET',
		  dataType: 'json',
		  success: function (s3Data) {
			data.url = s3Data.data.endpoint_url;
			data.formData = s3Data.data.params;
			data.submit();
		  }
		});

		var params = [];
		return params;
	}

  };

  onS3Done(e, data) {
    var s3Url = $(data.jqXHR.responseXML).find('Location').text();
    var s3Key = $(data.jqXHR.responseXML).find('Key').text();
    console.log('uploaded yooooo');
    console.log(s3Url);

    // this.images.push(new Image(1, 1, s3Url));
    // console.log($('<a/>').attr('href', s3Url).text('File uploaded at '+s3Url).appendTo($('body')));
  }

  /*continue() {
    setTimeout(() => {
      this.show_confirmation = !this.show_confirmation;
    }, 500)
    setTimeout(() => {
      location.href = '/';
    }, 2000)
  }*/

  logForm(value: any) {
    console.log(value);
    value['home_id'] = this.home_id;
    this.offersService.makeOffer(value)
      .subscribe(
      obj => {
        console.log(obj);
      },
      error => {
        console.log(error);
      });
  }
}
