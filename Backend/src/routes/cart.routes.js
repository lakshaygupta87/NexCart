import {Router} from "express"
import {authenticateUser} from "../middleware/auth.middleware.js"
import {validateAddToCart,validateIncrementCartItemQuantity} from "../validator/cart.validator.js"
import {addToCart,getCart,incrementCartItemQuantity,createOrderController,verifyOrderController,getOrderDetailsController} from "../controllers/cart.controller.js"

const router = Router()

router.post("/add/:productId/:variantId",authenticateUser,validateAddToCart,addToCart)

router.get("/",authenticateUser,getCart)

router.patch("/quantity/increment/:productId/:variantId",authenticateUser,validateIncrementCartItemQuantity,incrementCartItemQuantity)

router.post("/payment/create/order",authenticateUser,createOrderController)

router.post("/payment/verify/order", authenticateUser, verifyOrderController)

router.get("/payment/order/:orderId",authenticateUser,getOrderDetailsController)

export default router