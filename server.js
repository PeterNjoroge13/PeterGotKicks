const express = require("express");
const app = express();
const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();
const path = require("path");

// Serve static files (images, CSS, etc.) from the public directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Define route for fetching product prices
app.get("/product/:productId", (req, res) => {
  const productId = req.params.productId;
  sneaks.getProductPrices(productId, function (err, product) {
    if (err) {
      console.error("Error getting product prices:", err);
      res.status(500).send(`Error getting product prices: ${err.message}`);
    } else {
      // Get the price values
      const stockXPrice = product.lowestResellPrice.stockX;
      const goatPrice = product.lowestResellPrice.goat;
      const flightClubPrice = product.lowestResellPrice.flightClub;

      res.send(`
        <html>
          <head>
           
            <link rel="stylesheet" href="/Style.css">
          </head>
          <body>
        
            
            <div id="projects">
            <div class="container">
                <h1 class="sub-title">Product Prices</h1>
                <div class="work-list">
                    <div class="work">
                        <img src="/Images/stockx.jpg">
                        <div class="layer">
                            <h3>StoxkX Price:</h3>
                            <p>StockX Price: ${stockXPrice}+</p>
                            <a href="https://stockx.com/" class="sneaker-link"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                        </div>
                    </div>
                    <div class="work">
                        <img src="/Images/goat.jpg">
                        <div class="layer">
                            <h3>Goat Price: </h3>
                            <p>Goat Price: ${goatPrice}+</p>
                                  <a href="https://www.goat.com/" class="sneaker-link"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                        </div>
                    </div>
                    <div class="work">
                        <img src="/Images/flightclub.jpg">
                        <div class="layer">
                            <h3>Flight Club Price: </h3>
                            <p>Flight Club Price: ${flightClubPrice}+</p>
       <a href="https://www.flightclub.com/" class="sneaker-link"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                        </div>
                    </div>
                </div>
                <a href="/" class="btn" id="toggleButton">Home</a>
            </div>
        </div>





           
          </body>
        </html>
      `);
    }
  });
});

// Handle other routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
