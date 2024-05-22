// server.js
const express = require('express');
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
const app = express();

app.get('/api/prices/:id', (req, res) => {
  sneaks.getProductPrices(req.params.id, (err, product) => {
    if (err) {
      console.error('Error getting product prices:', err);
      res.status(500).send('Error getting product prices');
    } else {
      res.json(product);
    }
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));