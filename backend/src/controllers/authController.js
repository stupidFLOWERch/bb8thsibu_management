const crypto = require("crypto");
const { findUserByEmail, getPasswordByEmail, createUser, saveResetToken, findUserByResetToken, updateUserPassword, deleteTokenByToken } = require("../models/userModel");
const { findMember } = require("../models/memberModel");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
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
        return res.status(401).json({
            error: "Invalid email or password"
        });
    }
    
    if (record.Passwords === password){
        return res.json({
            message: "Login successful.",
            user: {
                userId: record.Id,
                email: record.Email
            }
        });
    }

    return res.status(401).json({ error: "Email and password does not match" });
}

async function forgotPassword(req, res) {
    
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required." });
    }

    const existing = await findUserByEmail(email);
    if (!existing) {
        return res.status(200).json({
            message: "If the email exists, a reset link has been sent."
          });
    }

    const userId = existing.Id;

    // 1. generate token
    const token = crypto.randomBytes(32).toString("hex");

    // 2. expiry (15 mins)
    const expires = Date.now() + 15 * 60 * 1000;

    // 3. save token to DB
    await saveResetToken(userId, token, expires);

    // 4. create magic link
    const resetLink = `http://localhost:5173/reset-password/${token}`;

    // 5. send email
    console.log("📧 about to send email");

try {
  const result = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">
        Reset Password
      </a>
      <p>This link will expire in 15 minutes.</p>
    `
  });

  console.log("📧 email sent:", result);

} catch (err) {
  console.error("❌ email failed:", err);
}
    
    return res.status(200).json({
        message: "If the email exists, a reset link has been sent."
    });
}

async function resetPassword(req, res){
    const { token, password } = req.body;
    if (!token || !password) {
        return res.status(400).json({ error: "Token and password are required." });
    }

    const record = await findUserByResetToken(token)
    if (!record){
        return res.status(400).json({ error: "Invalid token" });
    }

    if (Date.now() > record.ExpiresAt) {
        return res.status(400).json({ error: "Token expired" });
    }

    await updateUserPassword(record.UserId, password);
    await deleteTokenByToken(token);

    return res.status(200).json({
        message: "Password reset successful"
    });
}

module.exports = { signup, login, forgotPassword, resetPassword };
