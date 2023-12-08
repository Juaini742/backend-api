const {Products, Users} = require("../db/models");

exports.getAllProducts = async (req, res, next) => {
  try {
    const product = await Products.findAll();
    res.json(product);
  } catch (error) {
    res.status(500).json({error: "Internal Server Error"});
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Products.findByPk(req.params.id);
    if (!product) return res.status(400).json({error: "Product not found"});
    res.json(product);
  } catch (error) {
    res.status(500).json({error: "Internal Server Error"});
  }
};

exports.addNewProduct = async (req, res) => {
  try {
    const {productName, price, description} = req.body;
    const id = crypto.randomUUID();
    const product = await Products.create({
      id,
      productName,
      price,
      description,
    });
    res.status(201).json({product});
  } catch (error) {
    res.status(500).json({error: "Internal server error"});
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const product = await Products.findByPk(req.params.id);
    if (!product) return res.status(404).json({message: "Product not found"});

    await product.destroy();
    res.json({success: true, message: "Product deleted successfully", product});
  } catch (error) {
    res.status(404).json({error: "Product not error"});
  }
};

exports.deleteAllProduct = async (req, res) => {
  try {
    const allProducts = await Products.findAll();
    if (allProducts.length === 0) {
      return res.status(404).json({message: "No products found"});
    }
    await Products.destroy({
      where: {},
    });
    res.json({success: true, message: "All products deleted successfully"});
  } catch (error) {
    res.status(500).json({error: "Internal server error"});
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Products.findByPk(req.params.id);
    if (!process) return res.status(404).json({error: "Product not found"});
    const {productName, price, description} = req.body;
    const updateProduct = await product.update({
      productName,
      price,
      description,
    });
    res.json({
      success: true,
      message: "Updated product successfully",
      updateProduct,
    });
  } catch (error) {
    res.status(404).json({error: "Product not found"});
  }
};
