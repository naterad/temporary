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
import { TokenService } from '../login/token.service';
import { Router } from '@angular/router';
import { OffersService } from './offers.service';
import { OfferParent } from './offer_parent';
import { OfferChain } from './offer_chain';

@Component({
  moduleId: module.id,
  selector: 'myoffers-page',
  templateUrl: 'my_offers.component.html',
  providers: [TokenService, OffersService],
  styleUrls: []
})

export class MyOffersComponent implements OnInit {
  token: any;
  errorMessage: any;
  message = "";
  offers: OfferParent[];
  offerChains: OfferChain[];

  constructor(
    private tokenService: TokenService,
    private offersService: OffersService,
    private router: Router
  ) {
		this.tokenService.getToken()
			.subscribe(
				obj => {
					if (!obj || !obj['length'] || !(obj['length'] > 0)) {
						location.href = '/login';
					}
				},
				error => {
					location.href = '/login';
				});
  }

  //  /offer_chain/{offer_chain_id}:
  //  /offers/{user_id}:

  ngOnInit(){
    this.tokenService.getToken()
      .subscribe(
      obj => {
          this.token = obj;
          console.log(this.token);
          if(!this.token){
            this.message = "Pleae log in first";
            let link = ['/login/my-offers'];
            this.router.navigate(link);
          }else{
            // this.message = "Logged in!";
            this.message = "";
            this.offersService.getOffers(this.token)
            .subscribe(
              // obj => console.log(obj),
              // error => this.errorMessage = <any>error
        			// .subscribe(
        			obj => {
        				// this.offerChains = obj;
                console.log(obj);
                
                this.offerChains = obj.offer_chains;
                // console.log(this.offers);
        			},
        			error => {
                console.log(error)
              }
            );

          }
      },
      error => {
        console.log(error);
        this.message = "An error occured. Please log in again.";
        let link = ['/login/my-offers'];
        this.router.navigate(link);
      });
    }
    acceptOffer(offerChain){
      console.log(offerChain);
      this.offersService.acceptOffer(offerChain)
        .subscribe(
        obj => console.log(obj),
        error => this.errorMessage = <any>error
      );
      let link = ['/next-steps'];
      this.router.navigate(link);
    }
    counterOffer(offerChain){
      console.log(offerChain);
      this.offersService.counterOffer(offerChain)
        .subscribe(
        obj => console.log(obj),
        error => this.errorMessage = <any>error
      );
    }
    rejectOffer(offerChain){
      console.log(offerChain);
      this.offersService.rejectOffer(offerChain)
        .subscribe(
        obj => console.log(obj),
        error => this.errorMessage = <any>error
      );
    }
}
