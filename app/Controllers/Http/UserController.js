"use strict";

const User = use("App/Models/User");

class UserController {
  async index({ response, auth }) {
    if (auth.user && auth.user.type == "admin") {
      const users = await User.all();
      response.status(200).send(users);
    } else {
      response.send("Sem permissão para ver usuários");
    }
  }

  async store({ request, response }) {
    const data = await request.only(["username", "email", "password"]);
    data.type = "client";
    const user = await User.create(data);
    response.status(200).send(user);
  }

  async login({ response, params }) {
    const data = await User.find(params.email);
    if (data == null) {
      send("User not found");
    } else {
      if (email.params == data.password && data.type == "client") {
        response.render("feedclient");
      }
      if (email.params == data.password && data.type == "admin") {
        response.send("user is an admin");
      }
    }
  }

  async update({ request, response, params }) {
    const data = request.all();
    const { id } = params;
    const user = await User.findBy("id", id);
    user.merge(data);
    await user.save();
    return response.send(user);
  }

  async destroy({ response, params }) {
    const user = await User.findOrFail(params.id);
    await user.delete();
    return response.send("Usuário deletado com sucesso");
  }
  async logout({ auth, response }) {
    await auth.logout();
    return response.redirect("/");
  }
}

module.exports = UserController;
