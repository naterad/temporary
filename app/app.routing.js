"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require("./angular/home/home.component");
var appRoutes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: false });
exports.routedComponents = [home_component_1.HomeComponent];
//# sourceMappingURL=app.routing.js.map