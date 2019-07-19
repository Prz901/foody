'use strict'

const Product = use('App/Models/Product');

class CartController {
    
    async addOn({request, response, params, auth}){
        var {data} = await Product.findOrFail(params.id);
        data.id_users = auth.user.id;
        console.log({data});
    }

    async list({request, response, view}){
        return view.render('cart', { data });
    }
}

module.exports = CartController
