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
            <title>Product Prices</title>
            <link rel="stylesheet" href="/style.css">
          </head>
          <body>
            <h1>Product Prices</h1>
            
            <div id="projects">
            <div class="container">
                <h1 class="sub-title">Retro Jordans</h1>
                <div class="work-list">
                    <div class="work">
                        <img src="Images/sneakers/Jordan1Bred.jpg">
                        <div class="layer">
                            <h3>StoxkX Price:</h3>
                            <p>StockX Price: ${stockXPrice}+</p>
                                 
                        </div>
                    </div>
                    <div class="work">
                        <img src="Images/sneakers/Jordan1Royal.jpg">
                        <div class="layer">
                            <h3>Jordan 1 "Royal"</h3>
                            <p>The Air Jordan 1 "Royal" is another iconic colorway of the Air Jordan 1 silhouette.
                                 It features a black and royal blue color scheme, first released in 1985 alongside the "Bred" colorway.
                                  Like the "Bred," the "Royal" is highly sought after by sneaker collectors and fans of the Air Jordan line.</p>
                                  <a href="/product/555088-007" class="sneaker-link"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                        </div>
                    </div>
                    <div class="work">
                        <img src="Images/sneakers/jordan1chicago.jpg">
                        <div class="layer">
                            <h3>Jordan 1 "Chicago" </h3>
                            <p>The Air Jordan 1 "Chicago" is one of the most iconic and sought-after colorways of the Air Jordan 1 silhouette. 
                                It features a classic white, black, and red color scheme, paying homage to the Chicago Bulls, Michael Jordan's team.
                                 The "Chicago" colorway was first released in 1985 and has been re-released several times due to its popularity among sneaker enthusiasts.</p>
       <a href="/product/854262-001" class="sneaker-link"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
    
    
                        </div>
                    </div>
                </div>
                <a href="#" class="btn" onclick="toggleContent(event)" id="toggleButton">See More</a>      
            </div>
        </div>





            <p>StockX Price: ${stockXPrice}+</p>
            <p>Goat Price: ${goatPrice}+</p>
            <p>Flight Club Price: ${flightClubPrice}+</p>
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
