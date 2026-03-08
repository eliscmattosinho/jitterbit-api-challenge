import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
    createOrder,
    deleteOrder,
    getOrderById,
    listOrders,
    updateOrder,
} from "../controllers/orderController.js";

const router = Router();

/**
 * REQUIRED ROUTES
 */
// POST (protected) http://localhost:3000/order
router.post("/", authenticateToken, createOrder);

// GET http://localhost:3000/order/:orderId
router.get("/:orderId", getOrderById);

/**
 * OPTIONAL ROUTES
 */
// GET http://localhost:3000/order/list
router.get("/list/all", listOrders);

// PUT http://localhost:3000/order/:orderId
router.put("/:orderId", updateOrder);

// DELETE http://localhost:3000/order/:orderId
router.delete("/:orderId", deleteOrder);

export default router;
