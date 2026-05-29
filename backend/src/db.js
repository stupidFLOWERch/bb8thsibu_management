const sql = require("mssql/msnodesqlv8");

const config = {
    connectionString: "Driver={ODBC Driver 18 for SQL Server};Server=localhost\\SQLEXPRESS;Database=8th_sibu;Trusted_Connection=Yes;Encrypt=Yes;TrustServerCertificate=Yes;",
};

function formatConnectionError(err) {
    const code = err.code || err.originalError?.code;

    if (code === "ETIMEOUT") {
        return [
            "Could not reach SQL Server (connection timed out).",
            "Check SQL Server (SQLEXPRESS), SQL Server Browser, and TCP/IP are enabled.",
        ].join("\n");
    }

    if (code === "ELOGIN") {
        return [
            "SQL Server rejected the Windows login.",
            "Ensure your current Windows user has access to database 8th_sibu.",
        ].join("\n");
    }

    return err.message || String(err);
}

async function connectDB() {
    try {
        const pool = await sql.connect(config);
        console.log("Connected to SQL Server (localhost\\SQLEXPRESS, database: 8th_sibu, Windows Authentication)");
        return pool;
    } catch (err) {
        console.error("Database connection failed:\n" + formatConnectionError(err));
        throw err;
    }
}

module.exports = { sql, connectDB };
