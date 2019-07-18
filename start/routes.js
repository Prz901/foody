"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");
Route.on("/register").render("register");
Route.on("/feedadmin").render("feedadmin");
Route.on("/categoria").render("category");

//Auth
Route.post("/auth", "AuthController.authenticate");
Route.post("/token", "AuthController.getToken");

//User
Route.post("/register", "UserController.store");
Route.get("/user", "UserController.index");
Route.post("/login", "AuthController.authenticate");
Route.put("/user/:id", "UserController.update");
Route.delete("/user/:id", "UserController.destroy");
Route.get("/logout", "UserController.logout");

//Admin Home
Route.get("/admin", "AdminController.home").middleware("auth");

//Client Home
Route.get("/client", "ClientController.home").middleware("auth");

//Category
Route.get("/category", "CategoryController.index").middleware("auth");
Route.post("/category", "CategoryController.store").middleware("auth");
Route.put("/category/:id", "CategoryController.update");
Route.delete("/category/:id", "CategoryController.destroy");

//Product
