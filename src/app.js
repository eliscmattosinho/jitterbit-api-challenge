import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

connectDB();

// Middlewares globais
// -> receber dados JSON no body das requisições
app.use(express.json());

// Definição das rotas
// -> rota de autenticação (registro e login)
app.use("/auth", authRoutes);

// rota de pedidos (CRUD e Mapping)
app.use("/order", orderRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Jitterbit Order API is running!",
        status: "OK",
        timestamp: new Date().toISOString(),
    });
});

// Tratamento de rotas não encontradas (404)
app.use((req, res) => {
    res.status(404).json({
        message: "Erro 404: Rota não encontrada. Verifique o URL e o método HTTP.",
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n Servidor iniciado com sucesso!`);
    console.log(`Porta: ${PORT}`);
    console.log(`Local: http://localhost:${PORT}`);
    console.log(`Pressione CTRL+C para parar o servidor\n`);
});

export default app;
