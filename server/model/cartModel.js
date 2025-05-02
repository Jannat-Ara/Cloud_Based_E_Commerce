const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'carts';

// Add item to cart
exports.addToCart = async (userId, productId, quantity = 1) => {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            userId,
            productId,
            quantity,
            addedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    };

    return dynamoDB.put(params).promise();
};

// Get user's entire cart
exports.getUserCart = async (userId) => {
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        }
    };

    const result = await dynamoDB.query(params).promise();
    return result.Items || [];
};

// Update cart item quantity
exports.updateCartItem = async (userId, productId, quantity) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            userId,
            productId
        },
        UpdateExpression: 'SET quantity = :quantity, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
            ':quantity': quantity,
            ':updatedAt': new Date().toISOString()
        },
        ReturnValues: 'ALL_NEW'
    };

    return dynamoDB.update(params).promise();
};

// Remove item from cart
exports.removeFromCart = async (userId, productId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            userId,
            productId
        }
    };

    return dynamoDB.delete(params).promise();
};