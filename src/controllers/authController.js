import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// New user registration
export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: "User already exists." });

        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login and Token Generation
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found" });

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid password" });

        // Generate the JWT Token (expires in 2 hours)
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "2h" },
        );

        res.status(200).json({
            message: "Login successful!",
            token: token,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
