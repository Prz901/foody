"use strict";

const User = use('App/Models/User');
//const Token = use('App/Models/Token');

class AuthController {

    async authenticate({ request, response, auth }) {
        const { email, password } = await request.all();
        const token = await auth.attempt(email, password);
        if(auth.user && auth.user.type == "admin"){
          return response.redirect('admin');
        }
        if(auth.user && auth.user.type == "client"){
           return response.redirect('client');
        }
        return view.render('/login',{message:"login incorreto"});
    }
}

module.exports = AuthController;
