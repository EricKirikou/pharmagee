const express = require('express');
const app = express();
const db = require('./db'); // Import the database connection

app.use(express.json());

// Route to get all products
app.get('/api/products', (req, res) => {
  const query = "SELECT * FROM products";

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      products: rows
    });
  });
});

// Route to add a new product
app.post('/api/products', (req, res) => {
  const { name, description, price } = req.body;

  const query = "INSERT INTO products (name, description, price) VALUES (?, ?, ?)";

  db.run(query, [name, description, price], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({
      message: 'Product added',
      id: this.lastID
    });
  });
});

// Route to get a product by ID
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM products WHERE id = ?";

  db.get(query, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(row);
  });
});

// Route to update a product
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  const query = "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?";

  db.run(query, [name, description, price, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json({ message: 'Product updated' });
  });
});

// Route to delete a product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM products WHERE id = ?";

  db.run(query, [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted' });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
