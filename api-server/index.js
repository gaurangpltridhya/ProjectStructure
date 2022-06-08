const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose');
const crypto = require("crypto");
const Razorpay = require("razorpay");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const userRoute = require('./routers/user')
const authRoute = require('./routers/auth')
const productRoute = require('./routers/product')
const orderRoute = require('./routers/order')
const cartRoute = require('./routers/cart')
const categoryRoute = require('./routers/category') 
const {verifyToken} = require('./utils/verifyToken')
const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors())
const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });
mongoose.connect(process.env.dbURL,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
},()=>{
    console.log("Database connection established");
})

app.get('/api/healthcheck',(req,res)=>{
    console.log("Everything is Fine.! 🙂");
    res.send("Everything is Fine.! 🙂")
})
app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/product',productRoute)
app.use('/api/orders',orderRoute)
app.use('/api/cart',cartRoute)
app.use('/api/category',categoryRoute)

//Payment Routes

app.get("/api/payments", verifyToken, (req, res) => {
    res.send({ key: process.env.KEY_ID });
  });
  app.post("/api/payment/order", verifyToken, (req, res) => {
    params = req.body;
    instance.orders
      .create(params)
      .then((data) => {
        res.send({ sub: data, status: "success" });
      })  
      .catch((error) => {
        res.send({ sub: error, status: "failed" });
      });
  });
  
  app.post("/api/payment/verify", verifyToken, (req, res) => {
    body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  
    var expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(body.toString())
      .digest("hex");
    console.log("sig" + req.body.razorpay_signature);
    console.log("sig" + expectedSignature);
    var response = { status: "failure" };
    if (expectedSignature === req.body.razorpay_signature)
      response = { status: "success" };
    res.send(response);
  });

app.listen(process.env.PORT,()=>{
    console.log("Server is Live....");
})
