function signup(req, res) {
    const { firstName, lastName, telephone, email, password } = req.body;

    if (!firstName || !lastName || !telephone || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // TODO: save user to database (mssql)
    return res.status(201).json({ message: "Account created successfully." });
}

function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    // TODO: verify user against database
    return res.json({ message: "Login successful." });
}

module.exports = { signup, login };
