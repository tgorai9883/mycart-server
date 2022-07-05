const Order = require("../models/OrderModel");

const addOrderItem = async(req,res) => {
    const {orderItems, shippingAdress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;
    if(orderItems && orderItems.length===0){
        res.status(400);
        throw new Error("No Order Found");
        return;
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAdress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });
        const createOrder = await order.save();
        res.json(createOrder);
    }
}

const getOrderById = async(req,res) => {
    const order = await Order.findById(req.params.id).populate("user","name email");
    if(order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order Not Found");
    }
}

const updateOrderToPaid = async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_adress: req.body.payer.email_address
        }
        const updateOrder = await order.save();
        res.json(updateOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
}

const getOrders = async(req,res) => {
    const orders = await Order.find({user: req.user._id});
    res.json(orders);
}

module.exports = {addOrderItem, getOrderById, updateOrderToPaid, getOrders};