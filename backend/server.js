const express = require("express");
const products = require("./data/products");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productRoute = require("./routes/productsRoute");
const usersRoute = require("./routes/usersRoute");
const orderRoute = require("./routes/orderRoute");
const {errorHandler} = require("./middlewares/errorMiddleware");
const app = express();
app.use(express.json());//body-parser
dotenv.config();

mongoose.connect(process.env.MONGO_URI,{useUnifiedTopology:true,useNewUrlParser:true,useFindAndModify:true});

app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

app.use("",productRoute);
app.use("/users",usersRoute);
app.use("/orders",orderRoute);

app.get("/config/paypal", (req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID);
})

app.use(errorHandler);
 

if ( process.env.NODE_ENV == "production"){
  app.use(express.static("frontend/build"));
  const path = require("path");
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running in ${process.env.NODE_ENV} Mode and started on port ${process.env.PORT}`);
});