/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/


import Home from "views/Home.jsx";
import View from "views/View.jsx";
import Flight from "views/Flight.jsx";

import UserPage from "views/User.jsx";


var routes = [

  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-bank",
    component: Home,
    layout: "/user"
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/user"
  }
];

var user_routes = [
  {
    path: "/view",
    name: "View",
    icon: "nc-icon nc-bank",
    component: View,
    layout: "/user"
  }
];

var admin_routes = [
  {
    path: "/flight",
    name: "Flight",
    icon: "nc-icon nc-bank",
    component: Flight,
    layout: "/admin"
  }
];

export default routes;
export {user_routes,admin_routes};

