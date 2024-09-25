const db = require('../config/database');

exports.getVersionsByProductCatalog = async (catalog) => {
  try {
    const sql = `SELECT DISTINCT product_version.name 
                 FROM product 
                 INNER JOIN product_version ON product_version.id = product.brand 
                 WHERE product.product_catalog = ?`;
    const [versions] = await db.promise().query(sql, [catalog]);
    return versions;
  } catch (error) {
    throw error;
  }
};
