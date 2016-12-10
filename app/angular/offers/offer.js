"use strict";
var Offer = (function () {
    function Offer(offer_id, offer_chain_id, repc_parent_id, offer_number, state_id, offer_date, comment, state, addendums, counter_offers, repc_parent, repc_state) {
        this.offer_id = offer_id;
        this.offer_chain_id = offer_chain_id;
        this.repc_parent_id = repc_parent_id;
        this.offer_number = offer_number;
        this.state_id = state_id;
        this.offer_date = offer_date;
        this.comment = comment;
        this.state = state;
        this.addendums = addendums;
        this.counter_offers = counter_offers;
        this.repc_parent = repc_parent;
        this.repc_state = repc_state;
    }
    return Offer;
}());
exports.Offer = Offer;
//# sourceMappingURL=offer.js.map