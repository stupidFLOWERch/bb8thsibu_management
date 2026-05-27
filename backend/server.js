const express = require("express");
const cors = require("cors");
const { sql, connectDB } = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.get("/members", async (req, res) => {
    try {
        const result = await sql.query("SELECT * FROM Members");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Health check — frontend can call this to verify the link works
app.get("/api/health", (req, res) => {
    res.json({ ok: true, message: "Backend is running" });
});

app.post("/api/signup", (req, res) => {
    const { firstName, lastName, telephone, email, password } = req.body;

    if (!firstName || !lastName || !telephone || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // TODO: save user to database (mssql)
    res.status(201).json({ message: "Account created successfully." });
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    // TODO: verify user against database
    res.json({ message: "Login successful." });
});

async function start() {
    try {
        await connectDB();
        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    } catch {
        process.exit(1);
    }
}

start();
