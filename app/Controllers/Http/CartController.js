'use strict'

const Product = use('App/Models/Product');

class CartController {
    
    async addOn({request, response, params, auth, session}){
        if(auth.user && auth.user.type == 'client') {
            var data = [];
            data = request.only(["id", "product_name", "price", "id_categories"]);
            
            // let cart = data;
            console.log(data);
            return response.status(200).send(data);
        }
    }

    async list({request, response, view}){
        return view.render('cart', { data });
    }
}

module.exports = CartController
