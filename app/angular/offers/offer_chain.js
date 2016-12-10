"use strict";
var OfferChain = (function () {
    function OfferChain(offer_chain_id, buyer_id, seller_id, home_id, offer_date, decision_date, status, offers) {
        this.offer_chain_id = offer_chain_id;
        this.buyer_id = buyer_id;
        this.seller_id = seller_id;
        this.home_id = home_id;
        this.offer_date = offer_date;
        this.decision_date = decision_date;
        this.status = status;
        this.offers = offers;
    }
    return OfferChain;
}());
exports.OfferChain = OfferChain;
//# sourceMappingURL=offer_chain.js.map