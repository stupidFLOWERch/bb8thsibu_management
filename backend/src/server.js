require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");
const path = require("path");


const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");
const memberRoutes = require("./routes/memberRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
  );
app.use("/api/auth", authRoutes);
app.use("/api", healthRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/inventory", inventoryRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/attendance", attendanceRoutes)

async function start() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch {
        process.exit(1);
    }
}

start();
