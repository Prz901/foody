"use strict";

const User = use("App/Models/User");

class UserController {
  async index({ request, response }) {
    const users = await User.all();
    response.status(200).send(users);
  }

    async index({request, response, auth}) {
        if(auth == true){
            const users = await User.all();
            response.status(200).send(users);
        } else {
            response.send("Sem permissão para ver usuários");
        }
    }

    async store({request, response}) {
        const data = await request.only(['username', 'email', 'password']);
        data.type = "client";
        const user = await User.create(data);
        response.status(200).send(user);
    }

    async login({request, response, params}) {
        const data = await User.find(email.params);
        if(data == null){
            send("User not found");
        } else {
            if((email.params == data.password) && (data.type == "client")){
                response.render('feedclient');
            }
            if((email.params == data.password) && (data.type == "admin")){
                response.render('feedadmin');
            }
        }

    }

    async update({request, response, params}){
        
    }

    async destroy({request, response, params}){

    }
}

module.exports = UserController;
