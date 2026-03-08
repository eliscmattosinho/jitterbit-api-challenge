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

// Rota OBRIGATÓRIA: criar um novo pedido (protegida)
// POST http://localhost:3000/order
router.post("/", authenticateToken, createOrder);

// Rota OBRIGATÓRIA: obter um pedido específico pelo orderId
// GET http://localhost:3000/order/:orderId
router.get("/:orderId", getOrderById);

// Rota OPCIONAL: listar todos os pedidos
// GET http://localhost:3000/order/list
router.get("/list/all", listOrders);

// Rota OPCIONAL: atualizar um pedido
// PUT http://localhost:3000/order/:orderId
router.put("/:orderId", updateOrder);

// Rota OPCIONAL: eliminar um pedido
// DELETE http://localhost:3000/order/:orderId
router.delete("/:orderId", deleteOrder);

export default router;
