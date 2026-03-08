import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    // Busca o token no Header 'Authorization' (padrão: Bearer <TOKEN>)
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res
            .status(401)
            .json({ message: "Acesso negado. Token não fornecido." });
    }

    try {
        // Verifica se o token é válido
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ message: "Token inválido ou expirado." });
    }
};
