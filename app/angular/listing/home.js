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
var Home = (function () {
    function Home(address, archived, bathrooms, bedrooms, city, description, garage, home_id, home_type_id, latitude, listed_by, listed_date, longitude, price_cents, primary_image, square_feet, state, status, title, year_built, zip_code) {
        this.address = address;
        this.archived = archived;
        this.bathrooms = bathrooms;
        this.bedrooms = bedrooms;
        this.city = city;
        this.description = description;
        this.garage = garage;
        this.home_id = home_id;
        this.home_type_id = home_type_id;
        this.latitude = latitude;
        this.listed_by = listed_by;
        this.listed_date = listed_date;
        this.longitude = longitude;
        this.price_cents = price_cents;
        this.primary_image = primary_image;
        this.square_feet = square_feet;
        this.state = state;
        this.status = status;
        this.title = title;
        this.year_built = year_built;
        this.zip_code = zip_code;
    }
    return Home;
}());
exports.Home = Home;
//# sourceMappingURL=home.js.map