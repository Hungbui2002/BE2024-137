const db = require('../config/database');

exports.getAllProductsByCatalog = async (catalog) => {
  const sql = `SELECT * FROM product WHERE product_catalog = ?`;
  const [results] = await db.promise().query(sql, [catalog]);
  return results;
};

exports.getProductByCatalog = async (catalog, page = 1, filters, limit = 9) => {
  try {
    const offset = (page - 1) * limit;
    let sql = `SELECT product_version.name AS version, product.name AS name, product.location AS location, state.name AS state, product.handover_time AS handover_time, product.price AS price, product.image AS image
      FROM product 
      INNER JOIN product_version on product_version.id = product.product_version
      INNER JOIN state on state.id = product.state
      INNER JOIN brand on brand.id = product.brand
      WHERE product_catalog = ? `;
    const queryParams = [catalog];

    if (filters.min_price) {
      sql += ` AND price >= ?`;
      queryParams.push(filters.min_price);
    }

    if (filters.max_price) {
      sql += ` AND price <= ?`;
      queryParams.push(filters.max_price);
    }

    if (filters.brand) {
      sql += ` AND brand.name = ?`;
      queryParams.push(filters.brand);
    }

    if (filters.version) {
      sql += ` AND product_version.name = ?`;
      queryParams.push(filters.version);
    }

    sql += ` ORDER BY product.id ASC LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);

    const [results] = await db.promise().query(sql, queryParams);
    return results;
  } catch (error) {
    throw error;
  }
};
