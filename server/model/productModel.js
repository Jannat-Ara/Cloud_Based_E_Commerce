const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'product';

exports.createProduct = async (product) => {
    console.log(product)
    const productData = {
        id: uuidv4(),
        name: product.name,
        price: product.price,
        stock: product.stock,
    };

    const params = { TableName: TABLE_NAME, Item: productData };
    return dynamoDB.put(params).promise();
};

exports.getProductById = async (id) => {
    const params = { TableName: TABLE_NAME, Key: { id } };
    return dynamoDB.scan(params).promise();
};
exports.getAllProducts = async () => {
    const params = { TableName: TABLE_NAME };
    return dynamoDB.scan(params).promise();
};


exports.updateProduct = async (id, updates) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: 'set #name = :name, #price = :price ,#stock =:stock',
        ExpressionAttributeNames: { '#name': 'name', '#price': 'price', '#stock': 'stock' },
        ExpressionAttributeValues: {
            ':name': updates.name,
            ':price': updates.price,
            ':stock': updates.stock
        },
        ReturnValues: 'UPDATED_NEW',
    };
    return dynamoDB.update(params).promise();
};

exports.deleteProduct = async (id) => {
    const params = { TableName: TABLE_NAME, Key: { id } };
    return dynamoDB.delete(params).promise();
};
exports.deleteAllProducts = async () => {
    try {
        const scanParams = {
            TableName: TABLE_NAME,
        };
        const result = await dynamoDB.scan(scanParams).promise();

        if (result.Items.length === 0) {
            console.log('No products found to delete.');
            return;
        }

        const deletePromises = result.Items.map(async (product) => {
            const deleteParams = {
                TableName: TABLE_NAME,
                Key: { id: product.id },
            };
            await dynamoDB.delete(deleteParams).promise();
        });
        await Promise.all(deletePromises);
        console.log('All products have been deleted successfully.');
    } catch (error) {
        console.error('Error deleting all products:', error);
        throw new Error('Error deleting all products');
    }
};
