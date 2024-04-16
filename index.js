const express = require('express');
const mongoose = require('mongoose');
const app = express()

const productSchema = new mongoose.Schema({
    name: {
        type:String
    }
});

app.use(express.json())

// app.get('/', (req, res) => {
//     res.send("hello from Node api");
// });

//CREATE API
app.post("/api/products", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//READ API 
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//UPDATE API
app.put("/api/product/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//API FOR DELETE 
app.delete("/api/product/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json({message: "product successfully deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});



mongoose.connect("mongodb+srv://vidhijain2704:vidhi@cluster0.ohim8ll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("connected with mongodb !")
}).catch(() => {
    console.log("Failed !")
})


const Product = mongoose.model("Product", productSchema);


app.listen(3000, () => {
    console.log('server is running on port 3000');
});
