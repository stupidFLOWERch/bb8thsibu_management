function root(_req, res) {
    res.send("Backend is running");
}

function health(_req, res) {
    res.json({ ok: true, message: "Backend is running" });
}

module.exports = { root, health };
