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
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
var token_service_1 = require('../login/token.service');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
//Create the service
var OffersService = (function () {
    function OffersService(http, tokenService) {
        var _this = this;
        this.http = http;
        this.tokenService = tokenService;
        this.offersUrl = localStorage.getItem('API_URL') + '/offers';
        this.postOfferChainUrl = localStorage.getItem('API_URL') + '/offer_chain';
        this.acceptOfferUrl = localStorage.getItem('API_URL') + '/offer_chain/accept';
        this.rejectOfferUrl = localStorage.getItem('API_URL') + '/offer_chain/reject';
        this.counterOfferUrl = localStorage.getItem('API_URL') + '/counter_offer';
        this.getDocumentUrl = localStorage.getItem('API_URL') + '/document/offer';
        this.tokenService.getToken()
            .subscribe(function (obj) {
            _this.token = obj;
        }, function (error) { return console.log(error); });
    }
    OffersService.prototype.getOffers = function (token) {
        return this.http.get(this.offersUrl + "?token=" + token).map(this.extractData).catch(this.handleError);
    };
    OffersService.prototype.makeOffer = function (offer) {
        var offer_chain = {
            "home_id": offer['home_id'],
            "status": 1
        };
        //this hardcoded state needs dynamic replacing
        var state = {
            "state": "UT"
        };
        //counter needs to be false if its an offer and true if its a counter offer
        var offer_obj = {
            "comment": "",
            "counter": false
        };
        var d_o_p = new Date(offer['date_of_possesion']);
        var d_o_s = new Date(offer['seller_disclosure_deadline']);
        var d_o_d = new Date(offer['due_diligence_deadline']);
        var d_o_f = new Date(offer['financing_appraisal_deadline']);
        var repc_parent = {
            "price_cents": offer['price_cents'] * 100,
            "earnest_money_cents": offer['earnest_money_cents'] * 100,
            "pre_approved_mortgage_value_cents": offer['pre_approved_mortgage_value_cents'] * 100,
            "down_payment_cents": offer['down_payment_cents'] * 100,
            "new_loan_amount_cents": offer['new_loan_amount_cents'] * 100,
            "home_warranty_max_cents": offer['home_warranty_max_cents'] * 100,
            "legal_name": offer['legal_name'],
            "additional_inclusions": offer['additional_inclusions'],
            "exclusions": offer['exclusions'],
            "due_diligence_condition": offer['due_diligence_condition'],
            "appraisal_condition": offer['appraisal_condition'],
            "financing_condition": offer['financing_condition'],
            "fha_va_loan": offer['fha_va_loan'],
            "home_warranty_plan": offer['home_warranty_plan'],
            "home_warranty_order_party": offer['home_warranty_order_party']['name'] == 'Buyer' ? true : false,
            "home_warranty_selection_party": offer['home_warranty_selection_party']['name'] == 'Buyer' ? true : false,
            "home_warranty_payment_party": offer['home_warranty_payment_party']['name'] == 'Buyer' ? true : false,
            "responsible_party": offer['responsible_party']['name'] == 'Buyer' ? true : false,
            "date_of_possesion": d_o_p.getUTCFullYear() + '-' + (+(d_o_p.getUTCMonth()) + 1) + '-' + d_o_p.getUTCDate() + ' 00:00:00.000000',
            "seller_disclosure_deadline": d_o_s.getUTCFullYear() + '-' + (+(d_o_s.getUTCMonth()) + 1) + '-' + d_o_s.getUTCDate() + ' 00:00:00.000000',
            "due_diligence_deadline": d_o_d.getUTCFullYear() + '-' + (+(d_o_d.getUTCMonth()) + 1) + '-' + d_o_d.getUTCDate() + ' 00:00:00.000000',
            "financing_appraisal_deadline": d_o_f.getUTCFullYear() + '-' + (+(d_o_f.getUTCMonth()) + 1) + '-' + d_o_f.getUTCDate() + ' 00:00:00.000000',
            "pdf_url": "pdf.org",
        };
        var repc_state = {
            "state_specific_fields": {
                "food_storage": "yeah some"
            }
        };
        var addendums = [
            {
                "pdf_url": "whatsup.org",
                "comment": "heydjskf",
                "state_specific_fields": {}
            }
        ];
        var data = {
            "state": state['state'],
            "offer_chain": offer_chain,
            "offer": offer_obj,
            "repc_parent": repc_parent,
            "repc_state": repc_state,
            "addendums": addendums,
            "token": this.token
        };
        var body = JSON.stringify(data);
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.postOfferChainUrl, body, options).map(this.extractData).catch(this.handleError);
    };
    OffersService.prototype.getDocument = function (form, home_id) {
        //might need a different object to stringify
        var offer_chain = {
            "home_id": home_id,
            "status": 1
        };
        //this hardcoded state needs dynamic replacing
        var state = {
            "state": "UT"
        };
        //counter needs to be false if its an offer and true if its a counter offer
        var offer_obj = {
            "comment": "",
            "counter": false
        };
        var form_values = {};
        for (var i = 0; i < form['length']; i++) {
            for (var j = 0; j < form[i]['Questions']['length']; j++) {
                if (form[i]['Questions'][j]['Value']['name']) {
                    form_values[form[i]['Questions'][j]['ID']] = form[i]['Questions'][j]['Value']['name'];
                }
                else {
                    form_values[form[i]['Questions'][j]['ID']] = form[i]['Questions'][j]['Value'];
                }
            }
        }
        var d_o_p = new Date(form_values['DateOfPossession']);
        var d_o_s = new Date(form_values['SellerDisclosureDeadline']);
        var d_o_d = new Date(form_values['DueDiligenceDeadline']);
        var d_o_f = new Date(form_values['FinancingAppraisalDeadline']);
        var repc_parent = {
            "price_cents": form_values['PurchasePrice'] * 100,
            "earnest_money_cents": form_values['EarnestMoneyDeposityAmount'] * 100,
            "pre_approved_mortgage_value_cents": form_values['PreApprovedMortgageValue'] * 100,
            "down_payment_cents": form_values['DownPayment'] * 100,
            "new_loan_amount_cents": form_values['NewLoanAmount'] * 100,
            "home_warranty_max_cents": form_values['HomeWarrantyMaximumCost'] * 100,
            "legal_name": form_values['FullName'],
            "additional_inclusions": form_values['AdditionalInclusions'],
            "exclusions": form_values['Exclusions'],
            "due_diligence_condition": form_values['DueDiligenceCondition'],
            "appraisal_condition": form_values['AppraisalCondition'],
            "financing_condition": form_values['FinancingCondition'],
            "fha_va_loan": form_values['FHAVALoan'],
            "home_warranty_plan": form_values['HomeWarranty'],
            "home_warranty_order_party": form_values['HomeWarrantyOrderParty'] == 'Buyer' ? true : false,
            "home_warranty_selection_party": form_values['HomeWarrantySelectionParty'] == 'Buyer' ? true : false,
            "home_warranty_payment_party": form_values['HomeWarrantyPaymentParty'] == 'Buyer' ? true : false,
            "responsible_party": form_values['PartyResponsibleForAssesments'] == 'Buyer' ? true : false,
            "date_of_possesion": d_o_p.getUTCFullYear() + '-' + (+(d_o_p.getUTCMonth()) + 1) + '-' + d_o_p.getUTCDate() + ' 00:00:00.000000',
            "seller_disclosure_deadline": d_o_s.getUTCFullYear() + '-' + (+(d_o_s.getUTCMonth()) + 1) + '-' + d_o_s.getUTCDate() + ' 00:00:00.000000',
            "due_diligence_deadline": d_o_d.getUTCFullYear() + '-' + (+(d_o_d.getUTCMonth()) + 1) + '-' + d_o_d.getUTCDate() + ' 00:00:00.000000',
            "financing_appraisal_deadline": d_o_f.getUTCFullYear() + '-' + (+(d_o_f.getUTCMonth()) + 1) + '-' + d_o_f.getUTCDate() + ' 00:00:00.000000',
            "pdf_url": "pdf.org",
        };
        var repc_state = {
            "state_specific_fields": {
                "food_storage": "yeah some"
            }
        };
        var addendums = [
            {
                "pdf_url": "whatsup.org",
                "comment": "heydjskf",
                "state_specific_fields": {}
            }
        ];
        var data = {
            "state": state['state'],
            "offer_chain": offer_chain,
            "offer": offer_obj,
            "repc_parent": repc_parent,
            "repc_state": repc_state,
            "addendums": addendums,
            "token": this.token,
            "form": form
        };
        var body = JSON.stringify(data);
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.postOfferChainUrl, body, options).catch(this.handleError);
        //return this.http.post(this.getDocumentUrl, body, options).catch(this.handleError);
    };
    OffersService.prototype.acceptOffer = function (offerChain) {
        //might need a different object to stringify
        var body = JSON.stringify(offerChain);
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.acceptOfferUrl, body, options).map(this.extractData).catch(this.handleError);
    };
    OffersService.prototype.rejectOffer = function (offerChain) {
        //might need a different object to stringify
        var body = JSON.stringify(offerChain);
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.rejectOfferUrl, body, options).map(this.extractData).catch(this.handleError);
    };
    OffersService.prototype.counterOffer = function (offerChain) {
        //might need a different object to stringify
        var body = JSON.stringify(offerChain);
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.counterOfferUrl, body, options).map(this.extractData).catch(this.handleError);
    };
    OffersService.prototype.extractData = function (res) {
        var JSONresponse = res.json();
        return JSONresponse.data || {};
    };
    OffersService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg); // log to console instead
        return errMsg;
    };
    OffersService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, token_service_1.TokenService])
    ], OffersService);
    return OffersService;
}());
exports.OffersService = OffersService;
//# sourceMappingURL=offers.service.js.map