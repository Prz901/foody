'use strict'

const Product = use('App/Models/Product');

class CartController {
    
    async addOn({request, response, params, auth}){
        if(auth.user && auth.user.type == 'client') {
            var data = [];
            data = await Product.findOrFail(params.id);
            
           // let cart = data;
            console.log(data);
            return response.status(200).send(data);
        }
    }

    async list({request, response, view}){
        return view.render('cart', { data });
    }

    async remove({request, response}){

    }
}

module.exports = CartController
