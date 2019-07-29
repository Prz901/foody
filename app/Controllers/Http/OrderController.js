'use strict'

const Order = use('App/Models/Order');

class OrderController {
    async index({ auth, view }){
        if (auth.user && auth.user.type == "client") {
            const orders = await Order
                                .table('order')
                                .where('id_users', auth.user.id)
                                .first();
            return view.render("order", { orders });
        }
    }
}

module.exports = OrderController
