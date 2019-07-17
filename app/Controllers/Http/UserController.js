'use strict'

const User = use('App/Models/User');

class UserController {

    async index({request, response}) {
       
            const users = await User.all();
            response.status(200).send(users);
    
    }

    async store({request, response}) {
        const data = await request.only(['username', 'email', 'password']);
        data.type = "client";
        const user = User.create(data);
        response.status(200).send(user);
    }
}

module.exports = UserController
