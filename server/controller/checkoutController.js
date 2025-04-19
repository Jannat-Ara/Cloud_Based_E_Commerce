const cartModel = require('../models/cartModel');
const responseUtil = require('../utils/responseUtil');

exports.checkout = async (event) => {
    const { cartId } = JSON.parse(event.body);
    try {
        const cart = await cartModel.getCartById(cartId);
        if (!cart.Item) {
            return responseUtil.error('Cart not found');
        }

        const totalAmount = cart.Item.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        // Simulate checkout logic (e.g., payment processing)
        return responseUtil.success({ message: 'Checkout successful', totalAmount });
    } catch (error) {
        return responseUtil.error(error.message);
    }
};
