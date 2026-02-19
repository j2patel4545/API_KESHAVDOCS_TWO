import Product from "../modules/ProductSchema.js";

export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description = "",
      category = "",
      price,
      discount = 0,
      currency = "USD",
      stock = 0,
      sku = "",
    } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const priceNum = Number(price);
    const discountNum = Number(discount);
    const stockNum = Number(stock);

    const images = req.files ? req.files.map(file => file.path) : [];

    const product = new Product({
      name,
      description,
      category,
      price: priceNum,
      discount: discountNum,
      currency,
      stock: stockNum,
      sku,
      images,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.isDeleted)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.isDeleted)
      return res.status(404).json({ message: "Product not found" });

    const {
      name,
      description,
      category,
      price,
      discount,
      currency,
      stock,
      sku,
    } = req.body;

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (category !== undefined) product.category = category;
    if (price !== undefined) product.price = Number(price);
    if (discount !== undefined) product.discount = Number(discount);
    if (currency !== undefined) product.currency = currency;
    if (stock !== undefined) product.stock = Number(stock);
    if (sku !== undefined) product.sku = sku;

    if (req.files && req.files.length > 0) {
      const images = req.files.map(file => file.path);
      product.images.push(...images);
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.isDeleted)
      return res.status(404).json({ message: "Product not found" });

    product.isDeleted = true;
    await product.save();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
