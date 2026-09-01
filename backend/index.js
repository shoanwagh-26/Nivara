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

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL;

const app = express();

app.use(
    cors({
        origin: function (origin, callback) {
            const allowedOrigins = [
                "http://localhost:3000",
                "http://localhost:3001",
                "https://master.d3k7u0ong29c6t.amplifyapp.com",
            ];

            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(bodyParser.json());
app.use(cookieParser());


// app.get('/addHoldings', async(req, res)=> {
//     let tempHoldings=[
//   {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//   },
//   {
//     name: "HDFCBANK",
//     qty: 2,
//     avg: 1383.4,
//     price: 1522.35,
//     net: "+10.04%",
//     day: "+0.11%",
//   },
//   {
//     name: "HINDUNILVR",
//     qty: 1,
//     avg: 2335.85,
//     price: 2417.4,
//     net: "+3.49%",
//     day: "+0.21%",
//   },
//   {
//     name: "INFY",
//     qty: 1,
//     avg: 1350.5,
//     price: 1555.45,
//     net: "+15.18%",
//     day: "-1.60%",
//     isLoss: true,
//   },
//   {
//     name: "ITC",
//     qty: 5,
//     avg: 202.0,
//     price: 207.9,
//     net: "+2.92%",
//     day: "+0.80%",
//   },
//   {
//     name: "KPITTECH",
//     qty: 5,
//     avg: 250.3,
//     price: 266.45,
//     net: "+6.45%",
//     day: "+3.54%",
//   },
//   {
//     name: "M&M",
//     qty: 2,
//     avg: 809.9,
//     price: 779.8,
//     net: "-3.72%",
//     day: "-0.01%",
//     isLoss: true,
//   },
//   {
//     name: "RELIANCE",
//     qty: 1,
//     avg: 2193.7,
//     price: 2112.4,
//     net: "-3.71%",
//     day: "+1.44%",
//   },
//   {
//     name: "SBIN",
//     qty: 4,
//     avg: 324.35,
//     price: 430.2,
//     net: "+32.63%",
//     day: "-0.34%",
//     isLoss: true,
//   },
//   {
//     name: "SGBMAY29",
//     qty: 2,
//     avg: 4727.0,
//     price: 4719.0,
//     net: "-0.17%",
//     day: "+0.15%",
//   },
//   {
//     name: "TATAPOWER",
//     qty: 5,
//     avg: 104.2,
//     price: 124.15,
//     net: "+19.15%",
//     day: "-0.24%",
//     isLoss: true,
//   },
//   {
//     name: "TCS",
//     qty: 1,
//     avg: 3041.7,
//     price: 3194.8,
//     net: "+5.03%",
//     day: "-0.25%",
//     isLoss: true,
//   },
//   {
//     name: "WIPRO",
//     qty: 4,
//     avg: 489.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",
//   },
// ];


//     tempHoldings.forEach((item) => {
//         let newHolding = new HoldingsModel({
//             name: item.name ,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day:item.day,
//         });

//         newHolding.save();
//     });
//     res.send("Done!");
// });


// app.get('/addPositions', async(req, res)=> {
//     let tempPositions=[
//   {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
// ];
  
//     tempPositions.forEach((item) => {
//         let newPosition = new PositionsModel({
//             product: item.product,
//             name:  item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//             isLoss: item.isLoss,
//         });

//         newPosition.save();
//     });
//     res.send("Done!");
// })

app.get("/allHoldings", async(req,res) => {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
})

app.get("/allPositions", async(req,res) => {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
})

app.post("/newOrder", async(req,res)=> {
    let newOrder = new OrdersModel({
         name:req.body.name,
        qty:req.body.qty,
        price:req.body.price,
        mode:req.body.mode,
    });

    await newOrder.save();

     //New holding for every BUY
    if (req.body.mode?.toUpperCase() === "BUY") {

        let newHolding = new HoldingsModel({
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
            secure: false,
            sameSite: "lax",
        });

        res.status(200).send("Login successful");

    } catch (err) {
        console.log(err);
        res.status(500).send("Login failed");
    }
});

app.get("/auth/check", async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            authenticated: false
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UsersModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                authenticated: false
            });
        }
        res.status(200).json({
            authenticated: true,
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        res.status(401).json({
            authenticated: false
        });
    }
});

app.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });

    res.status(200).json({ message: "Logged out successfully" });
});

app.listen(PORT, () => {
    console.log("App Started!");
    mongoose.connect(uri);
    console.log("DB Connected!");
});