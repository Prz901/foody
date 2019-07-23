"use strict";

const User = use("App/Models/User");

class AdminController {
  async home({ view, response, auth }) {
    const username = auth.user.username;
    return view.render("feedadmin", { username });
  }
}

module.exports = AdminController;
