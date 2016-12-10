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

import { OfferChain } from './offer_chain';
import { Offer } from './offer';

export class OfferParent {
  constructor(
    public offer_chains: OfferChain[],
    public offer: Offer
  ){}
}

// {
//   "offer_chain": {
//     "buyer_id": 1,
//     "seller_id": 35,
//     "home_id": 1,
//     "status": 1
//   },
//   "offer": {
//     "state": "UT",
//     "offer_number": 1,
//     "comment": ""
//   },
//   "repc_parent": {
//     "price_cents": 30000000,
//     "pdf_url": "heyo.com"
//   },
//   "repc_state": {
//     "state_specific_fields": [{
//       "food_storage": "yes"
//     }]
//   },
//   "addendums": [
//     {
//       "pdf_url": "whatsup.org",
//       "comment": "hey hey",
//       "state_specific_fields": []
//     }
//   ],
//   "token": "2ce0743388e53c64a9b73ea22862d9d7f6ecf35f334b4ab5188765749b2cfce45d6aa8a43cbcb74a2e1e63c568c77adedd4e71c3e6fa77948ec755be81051c2e88735b4732c326b1fc168cb4863ae954a869ed342bafcabba959b8e4678c492dd4ad96dde8eab4ba61224954f00f419ec7f00734c0e8e1751494219c787f728e4e69981657ab7104d22175f1d17ebc43f982d434e40a6ecd71db27c62eebfd68bec7efe2b77b92d6a0ea6b0d88c075946a90da6e7f4e5dcb72a17eb1482f5dd418b9ed735b3d8b65fca323ad0c9e203f206e1efb78f1ab91a70953ca89b1d121c9e361217f65165a1223895302678ddec99f89b405629602ecca3e4f07cbd6a34317077603f2d23f4dfb9beceb6ec367"
// }
