const express =require('express')
const serverless = require('serverless-http')
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const userModel = require('./model/userModel');
const productModel = require('./model/productModel');
const responseUtil = require('./utils/common');
const cors = require("cors");
const app = express();

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};
app.use(cors({origin:"*"}));
app.use(express.json());


// Define root route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API!' });
});

app.get('/products', async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        console.log('All Products:', products.Items);
        const formattedProducts = products.Items.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock
        }));

        res.status(200).json(responseUtil.success(formattedProducts));
    } catch (error) {
        console.error('Error fetching all products:', error.stack || error);
        res.status(500).json(responseUtil.error('Error fetching products'));
    }
});
app.post('/products',async(event,res)=>{
    const { name, price, stock } =JSON.parse(event.body);
    const product = { name, price, stock };

    try {
        await productModel.createProduct(product);
        res.status(201).json(responseUtil.success({ message: 'Product created successfully',data:product }));
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json(responseUtil.error(error.message));
    }
  
})
app.delete('/products', async (req, res) => {
    try {
        await productModel.deleteAllProducts();
        res.status(200).json(responseUtil.success({ message: 'All products deleted successfully' }));
    } catch (error) {
        console.error('Error deleting all products:', error);
        res.status(500).json(responseUtil.error('Error deleting all products'));
    }
});
app.get('/products/:id', async (req, res) => {
    try {
        const productId =req.params.id;
        const product = await productModel.getProductById(productId);

        if (!product) {
            return res.status(404).json(responseUtil.error('Product not found'));
        }

        const formattedProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock
        };
        res.status(200).json(responseUtil.success(formattedProduct));
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json(responseUtil.error('Error fetching product', error.message));
    }
});
app.patch('/products/:id', async (event, res) => {
    try {
        console.log("Event:", JSON.stringify(event));
        const productId = event.pathParameters?.id;
        if (!productId) {
            console.log("Product ID missing");
            return responseUtil.error('Product ID is missing');
        }

        const body = JSON.parse(event.body || '{}');
        console.log("Request Body:", body);

        const { name, price, stock } = body;
        if (!name || !price || !stock) {
            console.log("Missing fields in the body");
            return responseUtil.error("Missing required fields: name, price, or stock.");
        }

        const updatedProduct = { name, price, stock };
        console.log("Updated Product Data:", updatedProduct);

        await productModel.updateProduct(productId, updatedProduct);
        return responseUtil.success({ message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        return responseUtil.error('Error updating product', error.message || error);
    }
});
app.delete('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        await productModel.deleteProduct(productId);

        res.status(200).json(responseUtil.success({ message: 'Product deleted successfully' }));
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json(responseUtil.error('Error deleting product'));
    }
});
app.post('/register', async (event, res) => {
     const { name, email, password } = JSON.parse(event.body);
    try {
        if (!email || !password) {
            return res.status(400).json(responseUtil.error('Email and password are required'));
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json(responseUtil.error('Invalid email format'));
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json(responseUtil.error('Please enter a strong password'));
        }
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json(responseUtil.error('User already exists'));
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModel.createUser({
            name,
            email,
            password: hashedPassword,
            cartData: []
        });
        
        const token = createToken(user.id);

        res.status(201).json(responseUtil.success({ token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                cartData: user.cartData
            }}));
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json(responseUtil.error('Error registering user'));
    }
});

module.exports.handler = serverless(app)

// const express =require('express')
// const serverless = require('serverless-http')
// const bcrypt = require('bcryptjs');
// const validator = require('validator');
// const jwt = require('jsonwebtoken');
// const userModel = require('./model/cartModel');
// const responseUtil = require('./utils/common');
// const { getUserIdFromEvent } = require('./utils/jwtUtils');
// const cors = require("cors");
// const app = express();

// const createToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET);
// };
// app.use(cors({origin:"*"}));
// app.use(express.json());


// // Define root route
// app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Welcome to the API!' });
// });
// app.post('/carts', async (event, res) => {
//     try {
//         // 1. Extract and validate user ID
//         const userId = getUserIdFromEvent(event);
//         if (!userId) {
//             return res.status(401).json(responseUtil.error('Unauthorized - Invalid or missing token'));
//         }

//         // 2. Parse and validate request body
//         const requestBody = JSON.parse(event.body || '{}');
//         const { productId, quantity = 1 } = requestBody;

//         if (!productId) {
//             return res.status(400).json(responseUtil.error('Product ID is required'));
//         }

//         if (isNaN(quantity) || quantity < 1) {
//             return res.status(400).json(responseUtil.error('Quantity must be a number greater than 0'));
//         }

//         // 3. Verify product exists
//         const product = await productModel.getProductById(productId);
//         if (!product?.id) {
//             return res.status(404).json(responseUtil.error('Product not found'));
//         }

//         // 4. Add to cart
//         await cartModel.addToCart(userId, product.id, Number(quantity));

//         // 5. Return success response
//         return res.status(201).json(responseUtil.success({
//             message: 'Item added to cart',
//             product: {
//                 id: product.id,
//                 name: product.name,
//                 price: product.price,
//                 image: product.images?.[0] 
//             },
//             quantity: Number(quantity)
//         }));

//     } catch (error) {
//         console.error('Cart addition error:', {
//             error: error.message,
//             stack: error.stack,
//             event: JSON.stringify(event, null, 2)
//         });
        
//         if (error instanceof SyntaxError) {
//             return res.status(400).json(responseUtil.error('Invalid JSON format'));
//         }
        
//         res.status(500).json(responseUtil.error(error.message));
//     }
// });


// module.exports.handler = serverless(app)