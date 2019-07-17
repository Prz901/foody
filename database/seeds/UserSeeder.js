'use strict'

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
const Factory = use('Factory');
const User = use('App/Models/User');

class UserSeeder {
  async run () {
    await User.create({username:'admin1', email:'admin1@test.com', password:'123', type:'admin'});
    await User.create({username:'admin2', email:'admin2@test.com', password:'123', type:'admin'});
  }
}

module.exports = UserSeeder
