import Order from "../models/Order.js";
import mapOrderInputToDb from "../utils/mapper.js";

// Criar pedido (POST /order)
export const createOrder = async (req, res) => {
    try {
        const rawData = req.body;

        // Validação de entrada
        if (!rawData.numeroPedido || !rawData.items) {
            return res.status(400).json({
                message: "Erro: Dados obrigatórios em falta (numeroPedido ou items).",
            });
        }

        // Transformação (Mapping)
        const mappedData = mapOrderInputToDb(rawData);

        // Cria e guarda no MongoDB
        const newOrder = new Order(mappedData);
        await newOrder.save();

        return res.status(201).json({
            message: "Pedido criado e transformado com sucesso!",
            order: newOrder,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro interno ao processar pedido.",
            error: error.message,
        });
    }
};

// Obter pedido por ID (GET /order/:orderId)
export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOne({ orderId });

        if (!order) {
            return res.status(404).json({ message: "Pedido não encontrado." });
        }

        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao procurar pedido.",
            error: error.message,
        });
    }
};

// Listar todos (GET /order/list/all)
export const listOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ creationDate: -1 });
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Atualizar pedido (PUT /order/:orderId)
export const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const updatedOrder = await Order.findOneAndUpdate(
            { orderId },
            req.body,
            { new: true }, // Retorna o doc atualizado
        );

        if (!updatedOrder) {
            return res
                .status(404)
                .json({ message: "Pedido não encontrado para atualização." });
        }

        return res.status(200).json(updatedOrder);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Eliminar (DELETE /order/:orderId)
export const deleteOrder = async (req, res) => {
    try {
        const result = await Order.findOneAndDelete({
            orderId: req.params.orderId,
        });

        if (!result) {
            return res.status(404).json({ message: "Pedido não encontrado." });
        }

        return res.status(200).json({ message: "Pedido eliminado com sucesso." });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
