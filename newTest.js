const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

sneaks.getProductPrices("854262-001", function(err, product){
    if (err) {
        console.error('Error getting product prices:', err);
    } else {
       
        // console.log(product);
        stockXPrice = (product.lowestResellPrice.stockX); 
        goatPrice = (product.lowestResellPrice.goat);
        flightClubPrice = (product.lowestResellPrice.flightClub); 
        console.log("stockX:", stockXPrice);
        console.log("goat:", goatPrice);
        console.log("flightClub:", flightClubPrice);

        return product;
    }
});