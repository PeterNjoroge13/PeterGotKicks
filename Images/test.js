const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

sneaks.getProductPrices("CP9654", function(err, product){
    if (err) {
        console.error('Error getting product prices:', err);
    } else {
        console.log("testing my code", product);
    }
});