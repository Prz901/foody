"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const User = use("App/Models/User");

class UserSeeder {
    async run() {
        await User.create({
            username: "Isabela",
            email: "isabela@test.com",
            password: "MudiIsabela#!",
            type: "admin"
        });
        await User.create({
            username: "Bruno",
            email: "bruno@test.com",
            password: "MudiBruno#!",
            type: "admin"
        });
    }
}

module.exports = UserSeeder;