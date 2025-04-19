const express =require('express')
const serverless = require('serverless-http')
const responseUtil = require('./utils/common');
const productModel = require('./model/productModel');
const app = express();
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


module.exports.handler = serverless(app)