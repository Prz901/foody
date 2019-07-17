'use strict'

class AdminController {
    async home({view}){
        return view.render('feedadmin');
    }
}

module.exports = AdminController
