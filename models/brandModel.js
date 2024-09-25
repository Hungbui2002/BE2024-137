const db = require('../config/database');

exports.getBrandsByProductCatalog = async (catalog) => {
  try {
    const sql = `SELECT DISTINCT brand.name 
                 FROM product 
                 INNER JOIN brand ON brand.id = product.brand 
                 WHERE product.product_catalog = ?`;
    const [brands] = await db.promise().query(sql, [catalog]);
    return brands;
  } catch (error) {
    throw error;
  }
};
