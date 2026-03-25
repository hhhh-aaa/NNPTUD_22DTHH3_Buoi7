const Product = require('../models/product.model');
const Inventory = require('../models/inventory.model');

// create product + inventory
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  await Inventory.create({ product: product._id });
  res.json(product);
};

// get all
exports.getAll = async (req, res) => {
  const data = await Inventory.find().populate('product');
  res.json(data);
};

// get by id
exports.getById = async (req, res) => {
  const data = await Inventory.findById(req.params.id).populate('product');
  res.json(data);
};

// add stock
exports.addStock = async (req, res) => {
  const { product, quantity } = req.body;
  const inv = await Inventory.findOneAndUpdate(
    { product },
    { $inc: { stock: quantity } },
    { new: true }
  );
  res.json(inv);
};

// remove stock
exports.removeStock = async (req, res) => {
  const { product, quantity } = req.body;
  const inv = await Inventory.findOne({ product });

  if (inv.stock < quantity) {
    return res.status(400).json({ message: 'Not enough stock' });
  }

  inv.stock -= quantity;
  await inv.save();
  res.json(inv);
};

// reservation
exports.reservation = async (req, res) => {
  const { product, quantity } = req.body;
  const inv = await Inventory.findOne({ product });

  if (inv.stock < quantity) {
    return res.status(400).json({ message: 'Not enough stock' });
  }

  inv.stock -= quantity;
  inv.reserved += quantity;

  await inv.save();
  res.json(inv);
};

// sold
exports.sold = async (req, res) => {
  const { product, quantity } = req.body;
  const inv = await Inventory.findOne({ product });

  if (inv.reserved < quantity) {
    return res.status(400).json({ message: 'Not enough reserved' });
  }

  inv.reserved -= quantity;
  inv.soldCount += quantity;

  await inv.save();
  res.json(inv);
};