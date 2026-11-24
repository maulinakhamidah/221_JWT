const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const komikController = require("../controller/komikController");
const authMiddleware = require("../middleware/authMiddleware");

// Rute Autentikasi User
router.post("/register", userController.register);
router.post("/login", userController.login);

// Rute Data Komik (Publik - Dapat diakses tanpa token)
router.get("/komik", komikController.getAllKomik);
router.get("/komik/:id", komikController.getKomikById);

// Rute Data Komik (Terproteksi - Memerlukan Header Authorization Bearer Token)
router.post("/komik", authMiddleware, komikController.createKomik);
router.put("/komik/:id", authMiddleware, komikController.updateKomik);
router.delete("/komik/:id", authMiddleware, komikController.deleteKomik);

module.exports = router;
