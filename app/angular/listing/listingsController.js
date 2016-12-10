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

MikasoApp.controller('listingsController', function($scope, $http) {

  //formData can be removed soon
  $scope.formData = {};
  $scope.listings = [
      {
        "id": 1,
        "title": "Seven Blocks from the Beach",
        "type": "Home",
        "price": 1975000,
        "address": "707 Strand Street",
        "city": "Santa Monica",
        "state": "California",
        "zip": 90405,
        "status": "For Sale",
        "description": "We are pleased to offer for sale 707 Strand Street, located in the prime Ocean Park area of Santa Monica. The property is located just seven blocks from the beach and only minutes away from the most desirable and trendy retail, shopping and dining streets in the country, being Main Street, Rose Avenue, Ocean Front Walk and Abbot Kinney.",
        "bedrooms": 6,
        "bathrooms": 5,
        "sqft": 3247,
        "garage": 2,
        "image":"app/images/strandstreet.jpg"
      },
      {
        "id": 2,
        "title": "Charming Santa Monica Spanish Home",
        "type": "Home",
        "price": 2595000,
        "address": "958 24th Street",
        "city": "Santa Monica",
        "state": "California",
        "zip": 90403,
        "status": "For Sale",
        "description": "Charming unique Spanish tranquil corner home. Surrounded by private lush mature landscape & courtyards for outdoor privacy. Skylights, updated gourmet kitchen. & bath with limestone & granite.",
        "bedrooms": 3,
        "bathrooms": 2,
        "sqft": 1749,
        "garage": 1,
        "image":"app/images/24thstreet.jpg"
      },
      {
        "id": 3,
        "type": "Home",
        "title": "Recently Remodeled, Prime Location",
        "price": 2750000,
        "address": "617 7th Street",
        "city": "Santa Monica",
        "state": "California",
        "zip": 90402,
        "status": "For Sale",
        "description": "Prime N of Montana Location! Very original and charming details, offering 3 rooms, 3 baths,formal dining room, kitchen, beautiful yard and the guest house. Recently remodeled bathrooms, new paint and hardwood floors, newer roof and wood burning fireplace.",
        "bedrooms": 3,
        "bathrooms": 3,
        "sqft": 1736,
        "garage": 1,
        "image":"app/images/7thstreet.jpg"
      },
      {
        "id": 4,
        "title": "East Coast Mansion",
        "type": "Home",
        "price": 6195000,
        "address": "421 23rd Street",
        "city": "Santa Monica",
        "state": "California",
        "zip": 90402,
        "status": "For Sale",
        "description": "Superior craftsmanship & materials. 3 level East Coast style home, 5bd+6ba, over 6,500 sf. Ideal layout & perf for entertainment. Main level w/ study/library, step down living rm w/brick frplce, spacious FDR, cozy outdoor patio, Chef's kitchen w/all Viking appliances. Enormous lower level w/media/game rm, gym & powder rm. The large master suite on upper level features high vaulted ceil, balcony overlooking sparkling pool, spa & green bckyrd w/lux master bath. Top notch fixtures all throughout.",
        "bedrooms": 5,
        "bathrooms": 6,
        "sqft": 6556,
        "garage": 3,
        "image":"app/images/23rdstreet.jpg"
      },
      {
        "id": 5,
        "title": "Miracle on 26th Street",
        "type": "Home",
        "price": 3075000,
        "address": "835 26th Street",
        "city": "Santa Monica",
        "state": "California",
        "zip": 90403,
        "status": "For Sale",
        "description": "Custom built, classical Spanish architecture, with exceptional high-end finishes and design elements. Nestled behind a private wall of foliage, this newer home was built to a different standard, with solid wood doors, double-paned wood framed windows and hand-hewn dark oak floors. A true cuisinier's kitchen is equipped with a large center island, handmade tile, Italian travertine sink, hand-crafted solid wood maple cabinets, top of the line appliances and beautiful limestone countertops. A spacious dining room is prefect for holiday dinners. Unwind in the master suite and spa-like bathroom. The family room has high ceilings and French doors that open to a large Ironwood deck, ideal for entertaining and al fresco dining. A rear yard and patio provide more space for family and guests. Amenities include: fireplaces in living & family rooms, filtration & security systems, solar panels. Permitted art studio. Don't miss this rare offering!",
        "bedrooms": 3,
        "bathrooms": 3,
        "sqft": 2527,
        "garage": 2,
        "image":"app/images/26thstreet.jpg"
      }
    ];


    // $http.get('/api/homes')
    //     .success(function(data) {
    //         $scope.listings = data;
    //     })
    //     .error(function(data) {
    //         console.log('Error: ' + data);
    //     });




    // $scope.loadHomesFromFile = function() {
    // $scope.loadHomesFromFile = function() {
    //
    //     $http({
    //         url: 'homes.txt',
    //         dataType: 'json',
    //         method: 'GET',
    //         data: '',
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //
    //     }).success(function(response){
    //         console.log(response.homes);
    //         var i;
    //         for (i = 0; i<response.homes.length; i++)
    //         {
    //             $http.post('/api/homes', response.homes[i])
    //                 .success(function(data) {
    //                     console.log("it worked");
    //                 })
    //                 .error(function(data) {
    //                     // console.log('Error: ' + data);
    //                     console.log("it didn't work");
    //                 });
    //         }
    //     }).error(function(error){
    //         console.log("ERROR");
    //     });
    // };


    // $scope.getAllHomes = function() {
    //     $http.get('/api/homes')
    //         .success(function(data) {
    //             $scope.homes = data;
    //             $scope.listings = data;
    //             console.log($scope.homes);
    //         })
    //         .error(function(data) {
    //             console.log('Error: ' + data);
    //         });
    // };

  });

// function mainController($scope, $http) {
//     $scope.formData = {};

//     // when landing on the page, get all todos and show them
//     $http.get('/api/todos')
//         .success(function(data) {
//             $scope.todos = data;
//         })
//         .error(function(data) {
//             console.log('Error: ' + data);
//         });

//     // when submitting the add form, send the text to the node API
//     $scope.createTodo = function() {
//         console.log("the create todo was fired");
//         $http.post('/api/todos', $scope.formData)
//             .success(function(data) {
//                 $scope.formData = {}; // clear the form so our user is ready to enter another
//                 $scope.todos = data;
//                 console.log(data);
//             })
//             .error(function(data) {
//                 console.log('Error: ' + data);
//             });
//     };

//     // delete a todo after checking it
//     $scope.deleteTodo = function(id) {
//         $http.delete('/api/todos/' + id)
//             .success(function(data) {
//                 $scope.todos = data;
//             })
//             .error(function(data) {
//                 console.log('Error: ' + data);
//             });
//     };

// }
