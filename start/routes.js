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
Route.on("/categoria").render("category");

//Auth
Route.post("/auth", "AuthController.authenticate");
Route.post("/token", "AuthController.getToken");

//User
Route.post("/register", "UserController.store");
Route.get("/users", "UserController.index");
Route.post("/login", "AuthController.authenticate");
Route.put("/user/:id", "UserController.update");
Route.get("/user/:id", "UserController.destroy");
Route.get("/logout", "UserController.logout");

//Admin Home
Route.get("/admin", "AdminController.home").middleware("auth");

//Client Home
Route.get("/client", "ClientController.home").middleware("auth");

//Category routes
Route.post("/category/:id/update", "CategoryController.update");
Route.get("/category/:id/delete", "CategoryController.destroy");
Route.get("/editcategory/:id", "CategoryController.show");
Route.get("/category", "CategoryController.index");
Route.post("/category", "CategoryController.store");
Route.on("/createcategory").render("createcategory");

Route.post("/product", "ProductController.store");

//Category Product
Route.get("/category/:id/product", "CategoryProductController.index");

//Product routes
Route.group(() => {
    Route.resource("product", "ProductController");
}).middleware("auth");
Route.get("/product", "ProductController.index");
Route.post("/product/:id/update", "ProductController.update");
Route.get("/editproduct/:id", "ProductController.edit");
Route.get("/product/:id/delete", "ProductController.destroy");
Route.get("/createproduct", "ProductController.create");
//Route.on('/createproduct').render('createproduct');

//Cart
Route.get("/product/:id/cart", "CartController.index").middleware("auth");
Route.post("/product/:id/cart", "CartController.create").middleware("auth");
Route.post("/product/:data/cart", "CartController.store").middleware("auth");
Route.get("/cart", "CartController.index");
Route.post("/cart", "CartController.store").middleware("auth");

Route.get("/cart", "CartController.index");
Route.get("/cart/clear", "CartController.destroy").middleware("auth");
Route.get("/cart/:id/update", "CartController.update").middleware("auth");

//Order
Route.get("/orderIndex", "OrderController.index");
Route.post("/order", "CartController.store");
Route.get('/order/:id', "OrderController.show");

Route.get("/order/clear", "OrderController.destroy").middleware("auth");

Route.get("/cart/:id/update", "CartController.update").middleware("auth");