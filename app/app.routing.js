"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require("./angular/home/home.component");
var login_component_1 = require("./angular/login/login.component");
var data_component_1 = require("./angular/data/data.component");
var appRoutes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'data',
        component: data_component_1.DataComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: false });
exports.routedComponents = [home_component_1.HomeComponent, login_component_1.LoginComponent, data_component_1.DataComponent];
//# sourceMappingURL=app.routing.js.map