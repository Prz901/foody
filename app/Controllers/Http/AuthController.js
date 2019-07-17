"use strict";

const User = use('App/Models/User');
//const Token = use('App/Models/Token');

class AuthController {

    async authenticate({ request, response, auth }) {
        const { email, password } = await request.all();
        const token = await auth.attempt(email, password);
        response.send(token);
    }
}

module.exports = AuthController;
