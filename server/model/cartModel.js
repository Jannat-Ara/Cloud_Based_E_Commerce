const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Carts';

exports.createCart = async (cart) => {
    const params = { TableName: TABLE_NAME, Item: cart };
    return dynamoDB.put(params).promise();
};

exports.getCartById = async (id) => {
    const params = { TableName: TABLE_NAME, Key: { id } };
    return dynamoDB.get(params).promise();
};

exports.deleteCart = async (id) => {
    const params = { TableName: TABLE_NAME, Key: { id } };
    return dynamoDB.delete(params).promise();
};
