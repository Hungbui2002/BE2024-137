const ProductModel = require('../models/productModel');
const BrandModel = require('../models/brandModel');
const VersionModel = require('../models/versionModel');

exports.getProductByCatalog = async (req, res) => {
  try {
    const { catalog } = req.params;
    const { page = 1, brand, min_price, max_price, version } = req.query;
    console.log(req.query);

    const filters = {
      min_price,
      max_price,
      brand,
      version,
    };

    const limit = 9;

    const allProducts = await ProductModel.getAllProductsByCatalog(catalog);
    const total = allProducts.length;

    const products = await ProductModel.getProductByCatalog(
      catalog,
      page,
      filters,
      limit
    );
    const brands = await BrandModel.getBrandsByProductCatalog(catalog);
    const versions = await VersionModel.getVersionsByProductCatalog(catalog);

    res.status(200).json({
      status: 'success',
      products: products,
      brands: brands,
      versions: versions,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
