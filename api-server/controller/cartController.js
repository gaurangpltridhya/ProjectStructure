const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken");
let total = 0;
module.exports.cartListAdmin = async (req, res) => {
  try {
    const Carts = await Cart.find().sort({ createdAt: -1 });
    if (Carts) {
      res.status(200).send({ message: "Carts List", Cart_List: Carts });
    } else {
      res.status(404).send({ message: "No Cart Found" });
    }
  } catch (err) {
    res.status(401).send({ Error: err.message });
  }
};

module.exports.createCart = async (req, res) => {
  const productId = req.body.productId;
  //  console.log(req.body.productId)
  const addedProduct = await Product.findById(productId);
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      let productIndex = cart.products.findIndex(
        (p) => p.productId == productId
      );
      if (productIndex > -1) {
        let productItem = cart.products[productIndex];
        productItem.quantity += 1;
        productItem.subtotal = addedProduct.price * productItem.quantity;
        cart.products[productIndex] = productItem;
      } else {
        cart.products.push({
          productId,
          quantity: 1,
          subtotal: addedProduct.price,
        });
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      console.log(addedProduct);
      const newCart = await Cart.create({
        userId: req.user.id,
        products: [{ productId, quantity: 1, subtotal: addedProduct.price }],
      });
      return res
        .status(201)
        .send({
          status: "pass",
          message: "new cart created",
          newCart: newCart,
        });
    }
  } catch (err) {
    res.status(401).send({ Error: err.message });
  }
};

module.exports.decreaseQuantity = async (req, res) => {
  try {
    const productId = req.params.productId;
    const addedProduct = await Product.findById(productId);

    let cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      let productIndex = cart.products.findIndex(
        (p) => p.productId == productId
      );
      if (productIndex > -1) {
        let productItem = cart.products[productIndex];
        if (productItem.quantity <= 1) {
          cart.products.splice(productIndex, 1)[0];
        } else {
          productItem.quantity -= 1;
          productItem.subtotal = addedProduct.price * productItem.quantity;
          cart.products[productIndex] = productItem;
        }
      } else {
        res
          .status(404)
          .send({
            status: "Not Found",
            message: "ProductId you have entered not exist in Cart",
          });
      }
      cart.total = cart.products.reduce((sum, item) => {
        return sum + item.quantity;
      }, 0);
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      res
        .status(404)
        .send({
          status: "Cart Not Found",
          message: "Add  Product to cart to do further process",
        });
    }
  } catch (err) {
    res.status(401).send({ Error: err.message });
  }
};

module.exports.myCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id }).populate(
      "products.productId"
    );
    if (cart) {
      res.status(200).send({ message: "User Cart ", cart: cart });
    } else {
      res
        .status(404)
        .send({ status: "failed", message: "User Cart Not Found" });
    }
  } catch (err) {
    res.status(401).send({ Error: err.message });
  }
};

module.exports.deleteCart = async (req, res) => {
  try {
    await Cart.deleteOne({ userId: req.user.id });
    res.status(200).send({ message: "Cart Deleted" });
  } catch (err) {
    res.status(401).send({ Error: err.message });
  }
};

module.exports.searchCartById = async (req, res) => {
  try {
    const userCart = await Cart.find({ userId: req.params.userId });
    if (userCart) {
      res.status(200).send({ message: "Search Result", userCart: userCart });
    } else {
      res
        .status(404)
        .send({ Error: "Cart Not Found", message: "Cart maybe Empty" });
    }
  } catch (err) {
    res.status(401).send({ Error: err.message });
  }
};

module.exports.removeProductFromCart = async (req, res) => {
  try {
    console.log("in remove product");
    const productId = req.params.productId;
    const del = await Cart.updateMany({ $pull: { products: { productId } } });
    res.status(200).send({ status: "pass", message: "cart Product Deleted" });
  } catch (err) {
    res.status(401).send({ Error: err.message });
    console.log(err);
  }
};
