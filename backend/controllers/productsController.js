const Product = require("../models/ProductModel");

const getProducts = async(req,res)=>{
    await Product.find({},(err,products)=>{
        if(err){
            console.log(err);
        } else {
            res.json(products);
        }
    })
};
const getProduct = async(req,res)=>{
    await Product.findOne({_id: req.params.id}, (err,product)=>{
        if(err){
            res.status(404).json({message: "Product Not Found"});
        } else {
            res.json(product);
        }
    });
}

module.exports = {getProduct, getProducts};