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
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var offers_service_1 = require('../offers/offers.service');
var listing_service_1 = require('../listing/listing.service');
var token_service_1 = require('../login/token.service');
var router_2 = require('@angular/router');
var OfferWizComponent = (function () {
    function OfferWizComponent(offersService, tokenService, listingService, router, route) {
        var _this = this;
        this.offersService = offersService;
        this.tokenService = tokenService;
        this.listingService = listingService;
        this.router = router;
        this.route = route;
        this.currentQuestion = 0;
        this.currentSection = 0;
        this.currentDate = new Date();
        this.inForm = true;
        this.displayFeedback = false;
        this.feedbackQuestion = true;
        this.feedbackResponse = false;
        this.completedQuestions = 10;
        this.questionCount = 23;
        this.offerSubmitted = false;
        this.form = [
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
        this.route.params.forEach(function (params) {
            if (params['id'] !== undefined) {
                var id = +params['id'];
                _this.home_id = id;
                _this.tokenService.getToken()
                    .subscribe(function (obj) {
                    if (!obj || !obj['length'] || !(obj['length'] > 0)) {
                        console.log(obj);
                        location.href = '/login/make-offer/' + _this.home_id;
                    }
                    else {
                        _this.token = obj;
                    }
                }, function (error) {
                    location.href = '/login/make-offer/' + _this.home_id;
                });
                _this.listingService.getHomeById(id)
                    .subscribe(function (home) { return _this.home = home; }, function (error) { return console.log(error); });
            }
            else {
                console.log("ERROR: no id. getHome()");
                location.href = '/';
            }
        });
    }
    OfferWizComponent.prototype.ngOnInit = function () { };
    OfferWizComponent.prototype.showDialog = function () {
        this.displayFeedback = true;
    };
    OfferWizComponent.prototype.next = function () {
        this.currentQuestion++;
        if (this.form[this.currentSection].Count == this.currentQuestion) {
            this.currentSection++;
            this.currentQuestion = 0;
        }
        if (this.currentSection == this.form.length) {
            this.inForm = false;
        }
    };
    OfferWizComponent.prototype.back = function () {
        this.currentQuestion--;
        if (this.currentQuestion == -1) {
            this.currentSection--;
            this.currentQuestion = this.form[this.currentSection].Count - 1;
        }
        if (this.currentSection < this.form.length) {
            this.inForm = true;
        }
    };
    OfferWizComponent.prototype.submitForm = function () {
        this.offerSubmitted = true;
        this.offersService.getDocument(this.form, this.home_id)
            .subscribe(function (obj) {
            var result = obj;
        }, function (error) {
            console.log(error);
        });
    };
    OfferWizComponent.prototype.goToMyOffers = function () {
        this.offerSubmitted = false;
        console.log("redirect to my offers");
        var link = ['/my-offers'];
        this.router.navigate(link);
    };
    OfferWizComponent.prototype.jumpTo = function (section) {
        this.currentSection = section;
        this.currentQuestion = 0;
    };
    OfferWizComponent.prototype.jumpToSummary = function () {
        this.inForm = false;
        this.currentSection = this.form.length - 1;
        this.currentQuestion = this.form[this.currentSection].Count;
    };
    OfferWizComponent.prototype.jumpToQuestion = function (question, section) {
        this.inForm = true;
        this.currentQuestion = question;
        this.currentSection = section;
    };
    OfferWizComponent.prototype.validateNumber = function (number) {
        if (number) {
            var number2 = number.toString();
            if (number2.indexOf(".") != -1) {
                number2 = number2.slice(0, (number2.indexOf(".")) + 3);
                Number(number2);
                this.form[this.currentSection].Questions[this.currentQuestion]["Value"] = number2;
                $('#' + this.form[this.currentSection].Questions[this.currentQuestion]["ID"]).val(number2);
            }
        }
        else {
            number = 0;
        }
    };
    OfferWizComponent.prototype.validateText = function (text) {
        if (text && text.length > 0) {
            this.completedQuestions++;
            this.form[this.currentSection].Questions[this.currentQuestion]["Is Completed"] = true;
            this.form[this.currentSection].Questions[this.currentQuestion]["ErrorBool"] = false;
        }
        else {
            this.completedQuestions--;
            this.form[this.currentSection].Questions[this.currentQuestion]["Is Completed"] = false;
            this.form[this.currentSection].Questions[this.currentQuestion]["ErrorBool"] = true;
        }
    };
    OfferWizComponent.prototype.validateDropDown = function (value) {
        if (value) {
            this.completedQuestions++;
            this.form[this.currentSection].Questions[this.currentQuestion]["Is Completed"] = true;
        }
        else {
            this.completedQuestions--;
            this.form[this.currentSection].Questions[this.currentQuestion]["Is Completed"] = false;
        }
    };
    OfferWizComponent.prototype.validateSelectButton = function (value) {
        this.completedQuestions++;
        this.form[this.currentSection].Questions[this.currentQuestion]["Is Completed"] = true;
    };
    OfferWizComponent.prototype.closeFeedback = function () {
        this.displayFeedback = false;
        this.feedbackQuestion = true;
        this.feedbackResponse = false;
    };
    OfferWizComponent.prototype.submitFeedback = function () {
        var _this = this;
        this.feedbackQuestion = false;
        this.feedbackResponse = true;
        setTimeout(function () {
            _this.closeFeedback();
        }, 3000);
    };
    OfferWizComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'offer-wiz-page',
            templateUrl: 'offer_wiz.component.html',
            styleUrls: ['offer_wiz.component.css'],
            providers: [offers_service_1.OffersService, listing_service_1.ListingService, token_service_1.TokenService]
        }), 
        __metadata('design:paramtypes', [offers_service_1.OffersService, token_service_1.TokenService, listing_service_1.ListingService, router_2.Router, router_1.ActivatedRoute])
    ], OfferWizComponent);
    return OfferWizComponent;
}());
exports.OfferWizComponent = OfferWizComponent;
//# sourceMappingURL=offer_wiz.component.js.map