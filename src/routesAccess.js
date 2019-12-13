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


import Login from "views/Login.jsx";
import Signup from "views/Signup.jsx";

var routesAccess = [

  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-bank",
    component: Login,
    layout: "/access"
  },
  {
    path: "/signup",
    name: "signup",
    icon: "nc-icon nc-bank",
    component: Signup,
    layout: "/access"
  }
];
export default routesAccess;
