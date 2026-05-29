const { findUserByEmail, getPasswordByEmail, createUser } = require("../models/userModel");
const { findMember } = require("../models/memberModel");

async function signup(req, res) {
    const { firstName, lastName, telephone, email, password } = req.body;

    if (!firstName || !lastName || !telephone || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const member = await findMember(firstName, lastName, telephone);
        if (!member) {
            return res.status(403).json({
                error: "You are not in member list",
            });
        }

        const existing = await findUserByEmail(email);
        if (existing) {
            return res.status(409).json({ 
                error: "User already exists"});
        }

        await createUser(firstName, lastName, email, password);

        return res.status(201).json({
            message: "Account created successfully.",
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    const record = await getPasswordByEmail(email);

    if(!record){
        return res.status(404).json({ 
            error: "User does not exists"});
    }
    
    if (record.Passwords === password){
        return res.json({ message: "Login successful." });
    }

    return res.status(401).json({ error: "Email and password does not match" });
}

module.exports = { signup, login };
