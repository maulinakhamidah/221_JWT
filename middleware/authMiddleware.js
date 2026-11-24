const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Akses ditolak. Token otorisasi tidak ditemukan.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: "Token tidak valid atau kedaluwarsa.",
      });
    }

    req.user = decoded;
    next();
  });
}

module.exports = authMiddleware;
