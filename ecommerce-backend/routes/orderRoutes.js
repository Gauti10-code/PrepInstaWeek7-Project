const express=require('express');
const router=express.Router();
const{addToCart,viewCart,removeFromCart,placeOrder}=require('../controllers/orderController');

router.post('/cart',addToCart);
router.get('/cart',viewCart);
router.delete('/cart/:id',removeFromCart)
router.post('/order',placeOrder);

module.exports=router;
