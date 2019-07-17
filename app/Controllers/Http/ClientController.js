'use strict'

class ClientController {
    async home({view}){
        return view.render('feedclient');
    }
}

module.exports = ClientController
