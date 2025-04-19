const cartModel = require('../models/cartModel');
const responseUtil = require('../utils/responseUtil');

exports.createCart = async (event) => {
    const cart = JSON.parse(event.body);
    try {
        await cartModel.createCart(cart);
        return responseUtil.success({ message: 'Cart created successfully' });
    } catch (error) {
        return responseUtil.error(error.message);
    }
};

exports.getCartById = async (event) => {
    const { id } = event.pathParameters;
    try {
        const cart = await cartModel.getCartById(id);
        return responseUtil.success(cart.Item);
    } catch (error) {
        return responseUtil.error(error.message);
    }
};

exports.deleteCart = async (event) => {
    const { id } = event.pathParameters;
    try {
        await cartModel.deleteCart(id);
        return responseUtil.success({ message: 'Cart deleted successfully' });
    } catch (error) {
        return responseUtil.error(error.message);
    }
};
