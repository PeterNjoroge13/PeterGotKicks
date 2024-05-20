// netlify/functions/server.js
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

exports.handler = async (event, context) => {
  const productId = event.path.split('/').pop();

  return new Promise((resolve, reject) => {
    sneaks.getProductPrices(productId, function(err, product){
      if (err) {
        console.error('Error getting product prices:', err);
        resolve({
          statusCode: 500,
          body: `Error getting product prices: ${err.message}`
        });
      } else {
        // Get the price values
        const stockXPrice = product.lowestResellPrice.stockX;
        const goatPrice = product.lowestResellPrice.goat;
        const flightClubPrice = product.lowestResellPrice.flightClub;

        resolve({
          statusCode: 200,
          body: JSON.stringify({
            stockXPrice: stockXPrice,
            goatPrice: goatPrice,
            flightClubPrice: flightClubPrice
          })
        });
      }
    });
  });
};