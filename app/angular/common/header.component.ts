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
declare var $: any;

@Component({
	moduleId: module.id,
	selector: 'header-comp',
	templateUrl: 'header.component.html',
	providers: [TokenService],
	styleUrls: []
})

export class HeaderComponent implements OnInit {
	token: any;

	constructor(
		private tokenService: TokenService		
	) { }

	ngOnInit() {
		//jquery selectize init
		$('.selection').selectize({ sortField: 'text' });
		$(".selectize-input input").attr('readonly', 'readonly');				
		
		this.tokenService.getToken()
			.subscribe(
			obj => {				
				this.token = obj;				
			},
			error => console.log(error));
	}
}
