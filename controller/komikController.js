const db = require('../models');

async function getAllKomik(req, res) {
  try {
    const komik = await db.Komik.findAll({
      order: [['id', 'ASC']]
    });
    res.status(200).json(komik);
  } catch (err) {
    console.error('Error fetching komik:', err.message);
    res.status(500).json({ error: 'Gagal memuat data komik' });
  }
}

async function getKomikById(req, res) {
  const { id } = req.params;
  try {
    const komik = await db.Komik.findByPk(id);
    if (!komik) {
      return res.status(404).json({ error: 'Komik tidak ditemukan' });
    }
    res.status(200).json(komik);
  } catch (err) {
    console.error('Error fetching komik by ID:', err.message);
    res.status(500).json({ error: 'Gagal memuat detail komik' });
  }
}

async function createKomik(req, res) {
  const { title, description, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Judul (title) dan penulis (author) wajib diisi' });
  }

  try {
    const newKomik = await db.Komik.create({
      title: title.trim(),
      description: description ? description.trim() : null,
      author: author.trim()
    });
    res.status(201).json(newKomik);
  } catch (err) {
    console.error('Error creating komik:', err.message);
    res.status(500).json({ error: 'Gagal menambahkan komik baru' });
  }
}

async function updateKomik(req, res) {
  const { id } = req.params;
  const { title, description, author } = req.body;

  try {
    const komik = await db.Komik.findByPk(id);
    if (!komik) {
      return res.status(404).json({ error: 'Komik tidak ditemukan' });
    }

    if (title !== undefined) komik.title = title.trim();
    if (description !== undefined) komik.description = description ? description.trim() : null;
    if (author !== undefined) komik.author = author.trim();

    await komik.save();
    res.status(200).json(komik);
  } catch (err) {
    console.error('Error updating komik:', err.message);
    res.status(500).json({ error: 'Gagal memperbarui data komik' });
  }
}

async function deleteKomik(req, res) {
  const { id } = req.params;
  try {
    const komik = await db.Komik.findByPk(id);
    if (!komik) {
      return res.status(404).json({ error: 'Komik tidak ditemukan' });
    }
    await komik.destroy();
    res.status(200).json({ message: 'Komik berhasil dihapus' });
  } catch (err) {
    console.error('Error deleting komik:', err.message);
    res.status(500).json({ error: 'Gagal menghapus komik' });
  }
}

module.exports = {
  getAllKomik,
  getKomikById,
  createKomik,
  updateKomik,
  deleteKomik,
};
