const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Users';

exports.createUser = async (user) => {
    const userData = {
        id: uuidv4(),
        name: user.name,
        email: user.email,
        password: user.password,
        cartData: user.cartData || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    const params = { 
        TableName: TABLE_NAME, 
        Item: userData,
        ConditionExpression: 'attribute_not_exists(email)' // Prevent duplicate emails
    };
    
    return dynamoDB.put(params).promise()
        .then(() => userData);
};

exports.getUserByEmail = async (email) => {
    const params = { 
        TableName: TABLE_NAME, 
        IndexName: 'EmailIndex', // You'll need to create this GSI in DynamoDB
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
            ':email': email
        }
    };
    
    const result = await dynamoDB.query(params).promise();
    return result.Items[0];
};

exports.getUserById = async (id) => {
    const params = { 
        TableName: TABLE_NAME, 
        Key: { id } 
    };
    
    const result = await dynamoDB.get(params).promise();
    return result.Item;
};