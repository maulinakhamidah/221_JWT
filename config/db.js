const db = require('../models');

async function connectDatabase() {
  try {
    await db.sequelize.authenticate();
    console.log('[Database] Terhubung ke PostgreSQL berhasil.');

    await db.sequelize.sync({ alter: true });
    console.log('[Database] Sinkronisasi tabel (komiks & users) berhasil.');
  } catch (err) {
    console.error('[Database Error] Koneksi database gagal:', err.message);
    process.exit(1);
  }
}

module.exports = connectDatabase;
