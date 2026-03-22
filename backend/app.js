require("dotenv").config({ quiet: true });
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const sql = require("./db/sql");

const app = express();

app.use(morgan("tiny"));
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hash = (password) => bcrypt.hashSync(password, 12);
const compare = (password, hash) => bcrypt.compareSync(password, hash);
const token = (size = 32) => crypto.randomBytes(size).toString("hex");
const sha = (data) => crypto.createHash("sha256").update(data).digest("hex");
const parseCookies = (cookieHeader = "") =>
    cookieHeader
        .split(";")
        .map((x) => x.trim())
        .filter(Boolean)
        .reduce((acc, x) => {
            const idx = x.indexOf("=");
            if (idx === -1) {
                return acc;
            }
            const key = x.slice(0, idx);
            const value = decodeURIComponent(x.slice(idx + 1));
            acc[key] = value;
            return acc;
        }, {});

const requireAuth = async (req, res, next) => {
    const cookies = parseCookies(req.headers.cookie);
    const t = cookies.token;

    if (!t) {
        return res.status(401).json({ error: "Unauthorized." });
    }

    try {
        const found = await sql`
            SELECT id
            FROM tokens
            WHERE token = ${sha(t)}
        `.then(([x]) => x);

        if (!found) {
            return res.status(401).json({ error: "Unauthorized." });
        }

        req.userTokenId = found.id;
        return next();
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ error: "An error occurred during authentication." });
    }
};

app.get("/", (req, res) => {
    return res.json({
        data: "Sus!",
    });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email.trim()) {
        return res.status(400).json({ error: "Email is required." });
    }
    if (!password) {
        return res.status(400).json({ error: "Password is required." });
    }

    try {
        const user = await sql`
            SELECT
                id,
                "firstName",
                "lastName",
                email,
                "password",
                "isActive"
            FROM 
                users
            WHERE 
                email = ${email}
        `.then(([x]) => x);

        if (!user) {
            return res
                .status(400)
                .json({ error: "Invalid email or password." });
        }
        if (!user.isActive) {
            return res.status(403).json({ error: "Account is inactive." });
        }
        if (!compare(password, user.password)) {
            return res
                .status(400)
                .json({ error: "Invalid email or password." });
        }

        const t = token();

        await sql`
            INSERT INTO tokens (
                "userId",
                token
            ) VALUES (
                ${user.id},
                ${sha(t)}
            )
        `;

        res.cookie("token", t, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.json({
            data: "Login successful!",
            // token: t,
        });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ error: "An error occurred during login." });
    }
});

app.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Validation
    if (!firstName.trim()) {
        return res.status(400).json({ error: "First name is required." });
    }
    if (!lastName.trim()) {
        return res.status(400).json({ error: "Last name is required." });
    }
    if (!email.trim()) {
        return res.status(400).json({ error: "Email is required." });
    }
    if (!password) {
        return res.status(400).json({ error: "Password is required." });
    }
    if (password.length < 8) {
        return res
            .status(400)
            .json({ error: "Password must be at least 8 characters long." });
    }

    const passwordHash = hash(password);

    try {
        await sql`
            INSERT INTO users (
                "firstName", 
                "lastName", 
                email,
                "password",
                "isActive"
            ) VALUES (
                ${firstName}, 
                ${lastName}, 
                ${email}, 
                ${passwordHash},
                't'
            )`;

        return res.json({
            data: "Registration successful!",
        });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ error: "An error occurred during registration." });
    }
});

app.get("/logout", async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    const t = cookies.token;

    if (t) {
        try {
            await sql`
                DELETE FROM 
                    tokens 
                WHERE 
                    token = ${sha(t)}`;
        } catch (error) {
            console.error(error);
        }
    }

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return res.json({ data: "Logged out." });
});

app.get("/dashboard", requireAuth, (req, res) => {
    return res.json({ data: "Dashboard" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
