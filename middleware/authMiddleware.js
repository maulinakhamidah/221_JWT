const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getAllKomik,
  getKomikById,
  createKomik,
  updateKomik,
  deleteKomik,
} = require('../controllers/komikController');

// Proteksi semua route komik:
router.use(authMiddleware);

router.get('/', getAllKomik);
router.get('/:id', getKomikById);
router.post('/', createKomik);
router.put('/:id', updateKomik);
router.delete('/:id', deleteKomik);

module.exports = router;