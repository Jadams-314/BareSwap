const express = require("express");
const argon2 = require("argon2");
const cors = require("cors");
const session = require("express-session");
const crypto = require("crypto");

const app = express();
const users = new Map();

const allowedOrigins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500"
];

// Allow requests from your frontend.
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Check the source of requests that change data.
app.use(function(req, res, next) {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
        if (!allowedOrigins.includes(req.get("Origin"))) {
            return res.status(403).json({
                message: "Request origin is not allowed."
            });
        }
    }

    next();
});

// Read JSON sent by your frontend.
app.use(express.json({ limit: "10kb" }));

// Configure login sessions.
app.use(session({
    name: "bareswap.sid",
    secret: crypto.randomBytes(32).toString("hex"),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000
    }
}));

// Test the backend.
app.get("/api/test", function(req, res) {
    res.send("Backend is working");
});

// Create an account.
app.post("/api/register", async function(req, res, next) {
    const { username, password } = req.body || {};

    if (typeof username !== "string" ||
        typeof password !== "string") {
        return res.status(400).json({
            message: "Please enter a username and password."
        });
    }

    const user = username.trim();

    if (user.length < 3 || user.length > 30) {
        return res.status(400).json({
            message: "Username must be between 3 and 30 characters."
        });
    }

    if (password.length < 15 || password.length > 128) {
        return res.status(400).json({
            message: "Password must be between 15 and 128 characters."
        });
    }

    if (users.has(user)) {
        return res.status(409).json({
            message: "That username is already taken."
        });
    }

    try {
        const passwordHash = await argon2.hash(password, {
            type: argon2.argon2id
        });

        // Another registration could finish while hashing.
        if (users.has(user)) {
            return res.status(409).json({
                message: "That username is already taken."
            });
        }

        users.set(user, {
            username: user,
            passwordHash: passwordHash
        });

        return res.status(201).json({
            message: "Account created successfully."
        });
    }
    catch (error) {
        next(error);
    }
});

// Log in to an existing account.
app.post("/api/login", async function(req, res, next) {
    const { username, password } = req.body || {};

    if (typeof username !== "string" ||
        typeof password !== "string") {
        return res.status(400).json({
            message: "Please enter a username and password."
        });
    }

    const user = username.trim();

    if (user.length < 3 || user.length > 30 ||
        password.length === 0 || password.length > 128) {
        return res.status(401).json({
            message: "Incorrect username or password."
        });
    }

    const account = users.get(user);

    if (!account) {
        return res.status(401).json({
            message: "Incorrect username or password."
        });
    }

    try {
        const correctPassword = await argon2.verify(
            account.passwordHash,
            password
        );

        if (!correctPassword) {
            return res.status(401).json({
                message: "Incorrect username or password."
            });
        }

        // Replace any previous session with a fresh one.
        req.session.regenerate(function(error) {
            if (error) {
                return next(error);
            }

            req.session.username = account.username;

            req.session.save(function(error) {
                if (error) {
                    return next(error);
                }

                return res.json({
                    message: "Login successful.",
                    username: account.username
                });
            });
        });
    }
    catch (error) {
        next(error);
    }
});

// Require a logged-in user.
function requireLogin(req, res, next) {
    if (!req.session.username) {
        return res.status(401).json({
            message: "Please log in first."
        });
    }

    next();
}

// Check who is logged in.
app.get("/api/me", requireLogin, function(req, res) {
    res.set("Cache-Control", "no-store");

    res.json({
        username: req.session.username
    });
});

// Log out.
app.post("/api/logout", function(req, res, next) {
    req.session.destroy(function(error) {
        if (error) {
            return next(error);
        }

        res.clearCookie("bareswap.sid", {
            path: "/",
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.json({
            message: "You have logged out."
        });
    });
});

// Handle errors without returning private server details.
app.use(function(error, req, res, next) {
    if (error.type === "entity.parse.failed") {
        return res.status(400).json({
            message: "Invalid JSON request."
        });
    }

    if (error.type === "entity.too.large") {
        return res.status(413).json({
            message: "Request is too large."
        });
    }

    res.status(500).json({
        message: "Something went wrong. Please try again."
    });
});

// Start the server on this computer only.
app.listen(3000, "localhost", function() {
    console.log("Server is running at http://localhost:3000");
});