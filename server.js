const express = require('express');
const app = express();
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

app.use('/Images', express.static('Images'));

app.get('/product/:productId', (req, res) => {
  app.use('/Images', express.static('Images'));
  const productId = req.params.productId;
  sneaks.getProductPrices(productId, function(err, product){
    if (err) {
      console.error('Error getting product prices:', err);
      res.send(`Error getting product prices: ${err.message}`);
    } else {
      // Get the price values
      const stockXPrice = product.lowestResellPrice.stockX;
      const goatPrice = product.lowestResellPrice.goat;
      const flightClubPrice = product.lowestResellPrice.flightClub;

      res.send(`
        <html>
          <head>
            <title>Product Prices</title>
          </head>
          <body>
            <h1>Product Prices</h1>
            <img src="Images/sneakers/jordan1chicago.jpg">
            <p>StockX Price: ${stockXPrice}+</p>
            <p>Goat Price: ${goatPrice}+</p>
            <p>Flight Club Price: ${flightClubPrice}+</p>
          </body>
        </html>
      `);
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});