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
import { OffersService } from '../offers/offers.service';
import { ListingService } from '../listing/listing.service';
import { TokenService } from '../login/token.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  moduleId: module.id,
  selector: 'offer-wiz-page',
  templateUrl: 'offer_wiz.component.html',
  styleUrls: ['offer_wiz.component.css'],
  providers: [OffersService, ListingService, TokenService]

})

export class OfferWizComponent implements OnInit {
  home_id: number;
  home: Object;
  token: any;
  showPDF: any;
  currentQuestion = 0;
  currentSection = 0;
  currentDate = new Date();
  inForm = true;
  displayFeedback: boolean = false;
  feedbackQuestion: boolean = true;
  feedbackResponse: boolean = false;
  completedQuestions = 10;
  questionCount = 23;
  offerSubmitted: boolean = false;

  form = [
  	{
                "Order": 0,
                "Count": 5,
                "Name": "Offer Summary",
                "Is Completed": false,
                "Questions": [
                    {
                        "Order": 0,
                        "Title": "Full Name",
                        "ID": "FullName",
                        "Description": "We're going to start on creating your offer. Please enter your full name.",
                        "ErrorMessage": "Pleae enter your full name.",
                        "ErrorBool": false,
                        "Type": "Text",
                        "Placeholder": "",
                        "Value": null,
                        "Is Completed": false
                    },
                    {
                        "Order": 1,
                        "Title": "Purchase Price",
                        "ID": "PurchasePrice",
                        "Description": "What is the total dollar amount you're offering on the home? We'll figure out where it's all coming from in a bit.",
                        "Type": "Number",
                        "Placeholder": 0,
                        "Value": 0,
                        "Is Completed": true
                    },
                    {
                        "Order": 2,
                        "Title": "Earnest Money Deposit Amount",
                        "ID": "EarnestMoneyDeposityAmount",
                        "Description": "The seller wants to know that you're serious about buying their home. Earnest Money is a payment that you make to the escrow company. It's typically 1-2% of the total purchase price.",
                        "Type": "Number",
                        "Placeholder": 0,
                        "Value": 0,
                        "Is Completed": true
                    },
                    {
                        "Order": 3,
                        "Title": "Pre-Approved Mortgage Amount",
                        "ID": "PreApprovedMortgageValue",
                        "Description": "How much of the purchase price will be coming from a new mortgage?",
                        "Type": "Number",
                        "Placeholder": 0,
                        "Value": 0,
                        "Is Completed": true
                    },
                    {
                        "Order": 4,
                        "Title": "Down Payment",
                        "ID": "DownPayment",
                        "Description": "How much will you pay at closing?",
                        "Type": "Number",
                        "Placeholder": 0,
                        "Value": 0,
                        "Is Completed": true
                    }
                ]
            },
            {
                "Order": 1,
                "Count": 5,
                "Name": "Additional Offer Details",
                "Is Completed": false,
                "Questions": [
                    {
                        "Order": 0,
                        "Title": "Additional Inclusions",
                        "ID": "AdditionalInclusions",
                        "Description": "Home sales in Utah typically come with these items included. Is there anything else you want included in the home sale?",
                        "Type": "TextBox",
                        "Placeholder": "ex. Hot Tub",
                        "Value": null,
                        "Is Completed": false
                    },
                    {
                        "Order": 1,
                        "Title": "Exclusions",
                        "ID": "Exclusions",
                        "Description": "Do you want any of these items specifically excluded from the sale?",
                        "Type": "TextBox",
                        "Placeholder": "",
                        "Value": null,
                        "Is Completed": false
                    },
                    {
                        "Order": 2,
                        "Title": "Special Assessments",
                        "ID": "PartyResponsibleForAssesments",
                        "Description": "Is the seller or the buyer going to pay for any special assessments that happen between now and the Settlement Deadline?",
                        "Type": "Dropdown",
                        "Placeholder": "Select Party",
                        "Options": [
                            { "label": "Select Party", "value": null },
                            { "label": "Buyer", "value": { "id": 1, "name": "Buyer", "code": "B" } },
                            { "label": "Seller", "value": { "id": 2, "name": "Seller", "code": "S" } }
                        ],
                        "Value": null,
                        "Is Completed": false
                    },
                    {
                        "Order": 3,
                        "Title": "Date Of Possession",
                        "ID": "DateOfPossession",
                        "Description": "What date will the buyer be allowed to possess the home?",
                        "Type": "Date",
                        "Placeholder": "Now",
                        "Value": new Date(),
                        "Is Completed": true
                    },
                    {
                        "Order": 4,
                        "Title": "Additional Seller Disclosures",
                        "ID": "AdditionalSellerDisclosures",
                        "Description": "Are there any additional disclosures that the seller needs to make?",
                        "Type": "TextBox",
                        "Placeholder": "",
                        "Value": null,
                        "Is Completed": false
                    }
                ]
            },
            {
                "Order": 2,
                "Count": 5,
                "Name": "Extra Options",
                "Is Completed": false,
                "Questions": [
                    {
                        "Order": 0,
                        "Title": "Due Diligence Condition",
                        "ID": "DueDiligenceCondition",
                        "Description": "Do you wish to include a contingency on your offer that allows you to conduct additional due diligence on the property?",
                        "Type": "Boolean",
                        "Options": [
                            { "label": "Yes", "value": "Yes" },
                            { "label": "No", "value": "No" }
                        ],
                        "Placeholder": false,
                        "Value": null,
                        "Is Completed": false
                    },
                    {
                        "Order": 1,
                        "Title": "Appraisal Condition",
                        "ID": "AppraisalCondition",
                        "Description": "Do you wish to include a contingency on your offer that allows you to rescind the offer if the home appraises for a value less than the Purchase Price?",
                        "Type": "Boolean",
                        "Options": [
                            { "label": "Yes", "value": "Yes" },
                            { "label": "No", "value": "No" }
                        ],
                        "Placeholder": false,
                        "Value": null,
                        "Is Completed": false
                    },
                    {
                        "Order": 2,
                        "Title": "Financing Condition",
                        "ID": "FinancingCondition",
                        "Description": "Is your offer contingent on obtaining a loan?",
                        "Type": "Boolean",
                        "Options": [
                            { "label": "Yes", "value": "Yes" },
                            { "label": "No", "value": "No" }
                        ],
                        "Placeholder": false,
                        "Value": null,
                        "Is Completed": false
                    },
                    {
                        "Order": 3,
                        "Title": "FHA/VA Loan",
                        "ID": "FHAVALoan",
                        "Description": "Will you be applying for a FHA or VA loan?",
                        "Type": "Boolean",
                        "Options": [
                            { "label": "Yes", "value": "Yes" },
                            { "label": "No", "value": "No" }
                        ],
                        "Placeholder": false,
                        "Value": null,
                        "Is Completed": false
                    },
                    {
                        "Order": 4,
                        "Title": "Additional Addenda",
                        "ID": "AdditionalAddenda",
                        "Description": "Is there another addendum you need to add?",
                        "Type": "Boolean",
                        "Options": [
                            { "label": "Yes", "value": "Yes" },
                            { "label": "No", "value": "No" }
                        ],
                        "Placeholder": false,
                        "Value": null,
                        "Is Completed": false
                    }
                ]
            },
            {
                "Order": 3,
                "Count": 5,
                "Name": "Home Warranty",
                "Is Completed": false,
                "Questions": [
                    {
                        "Order": 0,
                        "Title": "Home Warranty",
                        "ID": "HomeWarranty",
                        "Description": "Should the purchase include a home warranty plan?",
                        "Type": "Boolean",
                        "Options": [
                            { "label": "Yes", "value": "Yes" },
                            { "label": "No", "value": "No" }
                        ],
                        "Placeholder": false,
                        "Value": null,
                        "Is Completed": false
                    },
                    {
                        "Order": 1,
                        "Title": "Home Warranty Order Party",
                        "ID": "HomeWarrantyOrderParty",
                        "Description": "Will the buyer or the seller be ordering the home warranty?",
                        "Type": "Dropdown",
                        "Placeholder": "Select Party",
                        "Options": [
                            { "label": "Select Party", "value": null },
                            { "label": "Buyer", "value": { "id": 1, "name": "Buyer", "code": "B" } },
                            { "label": "Seller", "value": { "id": 2, "name": "Seller", "code": "S" } }
                        ],
                        "Value": null,
                        "Is Completed": false
                    },
                    {
                        "Order": 2,
                        "Title": "Home Warranty Selection Party",
                        "ID": "HomeWarrantySelectionParty",
                        "Description": "Who will be selecting the company that is providing the home warranty?",
                        "Type": "Dropdown",
                        "Placeholder": "Select Party",
                        "Options": [
                            { "label": "Select Party", "value": null },
                            { "label": "Buyer", "value": { "id": 1, "name": "Buyer", "code": "B" } },
                            { "label": "Seller", "value": { "id": 2, "name": "Seller", "code": "S" } }
                        ],
                        "Value": null,
                        "Is Completed": false
                    },
                    {
                        "Order": 3,
                        "Title": "Home Warranty Maximum Cost",
                        "ID": "HomeWarrantyMaximumCost",
                        "Description": "What is the maximum amount that the Home Warranty may cost?",
                        "Type": "Number",
                        "Placeholder": 0,
                        "Value": 0,
                        "Is Completed": true
                    },
                    {
                        "Order": 4,
                        "Title": "Home Warranty Payment Party",
                        "ID": "HomeWarrantyPaymentParty",
                        "Description": "Will the buyer or the seller be paying for the Home Warranty?",
                        "Type": "Dropdown",
                        "Placeholder": "Select Party",
                        "Options": [
                            { "label": "Select Party", "value": null },
                            { "label": "Buyer", "value": { id: 1, name: 'Buyer', code: 'B' } },
                            { "label": "Seller", "value": { id: 2, name: 'Seller', code: 'S' } }
                        ],
                        "Value": null,
                        "Is Completed": false
                    }
                ]
            },
            {
                "Order": 4,
                "Count": 3,
                "Name": "Deadlines",
                "Is Completed": false,
                "Questions": [
                    {
                        "Order": 0,
                        "Title": "Seller Disclosure Deadline",
                        "ID": "SellerDisclosureDeadline",
                        "Description": "When will the seller be required to provide all additional disclosures?",
                        "Type": "Date",
                        "Placeholder": "Now",
                        "Value": new Date(),
                        "Is Completed": true
                    },
                    {
                        "Order": 1,
                        "Title": "Due Diligence Deadline",
                        "ID": "DueDiligenceDeadline",
                        "Description": "When will the buyer be required to have completed their due diligence?",
                        "Type": "Date",
                        "Placeholder": "Now",
                        "Value": new Date(),
                        "Is Completed": true
                    },
                    {
                        "Order": 2,
                        "Title": "Financing & Appraisal Deadline",
                        "ID": "FinancingAppraisalDeadline",
                        "Description": "When will the buyer be required to have secured financing and had the home appraised?",
                        "Type": "Date",
                        "Placeholder": "Now",
                        "Value": new Date(),
                        "Is Completed": true
                    }
                ]
            }
        ];


  constructor(
  	private offersService: OffersService,
    private tokenService: TokenService,
	  private listingService: ListingService,
    private router: Router,
    private route: ActivatedRoute
	) {
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

  ngOnInit() {}

  showDialog() {
    this.displayFeedback = true;
  }
  next(){
    this.currentQuestion++;
    if(this.form[this.currentSection].Count==this.currentQuestion){
      this.currentSection++;
      this.currentQuestion = 0;
    }
    if(this.currentSection == this.form.length){
      this.inForm = false;
    }
  }
  back(){
    this.currentQuestion--;
    if(this.currentQuestion == -1){
      this.currentSection--;
      this.currentQuestion = this.form[this.currentSection].Count-1;
    }
    if(this.currentSection < this.form.length){
      this.inForm = true;
    }
  }
  submitForm(){
    this.offerSubmitted = true;
  	this.offersService.getDocument(this.form, this.home_id)
        .subscribe(
        obj => {

			var result = obj;

        },
        error => {
          console.log(error);
        });
  }
  goToMyOffers(){
    this.offerSubmitted = false;
    console.log("redirect to my offers");
    let link = ['/my-offers'];
    this.router.navigate(link);
  }
  jumpTo(section){
    this.currentSection = section;
    this.currentQuestion = 0;
  }
  jumpToSummary(){
    this.inForm = false;
    this.currentSection = this.form.length-1;
    this.currentQuestion = this.form[this.currentSection].Count;
  }
  jumpToQuestion(question, section){
    this.inForm = true;
    this.currentQuestion = question;
    this.currentSection = section;
  }
  validateNumber(number){
    if(number){
      var number2 = number.toString();
      if (number2.indexOf(".") != -1) {
          number2 = number2.slice(0, (number2.indexOf("."))+3);
          Number(number2);
          this.form[this.currentSection].Questions[this.currentQuestion]["Value"] = number2;
          $('#' + this.form[this.currentSection].Questions[this.currentQuestion]["ID"]).val(number2);
      }
    }else{
      number = 0;
    }
  }
  validateText(text){
    if(text && text.length>0){
      this.completedQuestions++;
      this.form[this.currentSection].Questions[this.currentQuestion]["Is Completed"] = true;
      this.form[this.currentSection].Questions[this.currentQuestion]["ErrorBool"] = false;
    }else{
      this.completedQuestions--;
      this.form[this.currentSection].Questions[this.currentQuestion]["Is Completed"] = false;
      this.form[this.currentSection].Questions[this.currentQuestion]["ErrorBool"] = true;
    }
  }
  validateDropDown(value){
    if(value){
      this.completedQuestions++;
      this.form[this.currentSection].Questions[this.currentQuestion]["Is Completed"] = true;
    }else{
      this.completedQuestions--;
      this.form[this.currentSection].Questions[this.currentQuestion]["Is Completed"] = false;
    }
  }
  validateSelectButton(value){
    this.completedQuestions++;
    this.form[this.currentSection].Questions[this.currentQuestion]["Is Completed"] = true;
  }
  closeFeedback(){
    this.displayFeedback = false;
    this.feedbackQuestion = true;
    this.feedbackResponse = false;
  }
  submitFeedback(){
    this.feedbackQuestion = false;
    this.feedbackResponse = true;
    setTimeout(() => {
      this.closeFeedback();
    }, 3000);
  }
}
