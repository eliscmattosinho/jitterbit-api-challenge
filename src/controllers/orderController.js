import Order from "../models/Order.js";
import mapOrderInputToDb from "../utils/mapper.js";

// POST /order
export const createOrder = async (req, res) => {
    try {
        const rawData = req.body;

        // Input validation
        if (!rawData.numeroPedido || !rawData.items) {
            return res.status(400).json({
                message: "Error: Required data is missing (Order number or items).",
            });
        }

        // Transformation (Mapping)
        const mappedData = mapOrderInputToDb(rawData);

        // Creates and saves in MongoDB
        const newOrder = new Order(mappedData);
        await newOrder.save();

        return res.status(201).json({
            message: "Order created and successfully processed!",
            order: newOrder,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal error processing order.",
            error: error.message,
        });
    }
};

// GET /order/:orderId
export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOne({ orderId });

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({
            message: "Error searching for order.",
            error: error.message,
        });
    }
};

// GET /order/list/all
export const listOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ creationDate: -1 });
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// PUT /order/:orderId
export const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const updatedOrder = await Order.findOneAndUpdate({ orderId }, req.body, {
            new: true,
        });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Request not found for update." });
        }

        return res.status(200).json(updatedOrder);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// DELETE /order/:orderId
export const deleteOrder = async (req, res) => {
    try {
        const result = await Order.findOneAndDelete({
            orderId: req.params.orderId,
        });

        if (!result) {
            return res.status(404).json({ message: "Order not found." });
        }

        return res.status(200).json({ message: "Order successfully deleted." });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
