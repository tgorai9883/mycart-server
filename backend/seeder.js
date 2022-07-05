const mongoose =require("mongoose");
const dotenv = require("dotenv");
const users = require("./data/users");
const products = require("./data/products");
const Order = require("./models/OrderModel");
const Product = require("./models/ProductModel");
const User = require("./models/UserModel");

dotenv.config();
mongoose.connect(process.env.MONGO_URI,{useUnifiedTopology:true,useNewUrlParser:true,useFindAndModify:true});

const importData = async()=>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        const createUser = await User.insertMany(users);
        const adminUser = createUser[0]._id;
        const sampleData = products.map(product => {
            return {...product, user: adminUser}
        });
        await Product.insertMany(sampleData);
        console.log("Data Imported !");
        process.exit();
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}
const dataDestroy = async()=>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log("Data Destroyed !");
        process.exit();
    } catch (error) {
        console.log(err);
        process.exit(1);
    }
}

if(process.argv[2]==="-d"){
    dataDestroy();
} else {
    importData();
}