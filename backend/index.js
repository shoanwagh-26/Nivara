require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { UsersModel } = require("./model/UsersModel");


const {HoldingsModel}= require("./model/HoldingsModel");
const {PositionsModel}= require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://nivara-frontend.onrender.com",
    "https://nivara-dashboard-00ou.onrender.com",
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.get("/allHoldings", async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const allHoldings = await HoldingsModel.find({
            userId: decoded.userId,
        });

        res.json(allHoldings);
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "Unauthorized" });
    }
});

app.get("/allPositions", async(req,res) => {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
})

app.post("/newOrder", async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send("Not authenticated");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

   let newOrder = new OrdersModel({
    userId: decoded.userId,
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
});

    await newOrder.save();

     //New holding for every BUY
    if (req.body.mode?.toUpperCase() === "BUY") {

        let newHolding = new HoldingsModel({
            userId: decoded.userId,
            name: req.body.name,
            qty: req.body.qty,
            avg: req.body.avg ?? req.body.price,
            price: req.body.price,
            net: req.body.net ?? "+0.00%",
            day: req.body.day ?? "+0.00%",
        });

        await newHolding.save();
    }

    res.send("Order Saved!");
    } catch (err) {
        console.log(err);
        res.status(500).send("Order failed");
    }
});

app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UsersModel.findOne({ email });

        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UsersModel({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.send("User registered successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Signup failed");
    }
});

    app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UsersModel.findOne({ email });

        if (!user) {
            return res.status(401).send("Invalid email or password");
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).send("Invalid email or password");
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).send("Login successful");

    } catch (err) {
        console.log(err);
        res.status(500).send("Login failed");
    }
});

app.get("/auth/check", async (req, res) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                authenticated: false
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UsersModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                authenticated: false
            });
        }

        return res.status(200).json({
            authenticated: true,
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error("AUTH CHECK ERROR:", err);

        return res.status(401).json({
            authenticated: false
        });
    }
});

app.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

    res.status(200).json({ message: "Logged out successfully" });
});

app.listen(PORT, () => {
    console.log("App Started!");
    mongoose.connect(uri);
    console.log("DB Connected!");
});