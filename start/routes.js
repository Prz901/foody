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
const Route = use('Route');

Route.on('/').render('welcome');
Route.on('/register').render('register');
Route.on('/feedadmin').render('feedadmin');

//Auth
Route.post('/auth', 'AuthController.authenticate');

//User
Route.post("/register", "UserController.store");
Route.get("/user", "UserController.index");
