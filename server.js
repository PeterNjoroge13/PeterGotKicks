const express = require("express");
const app = express();
const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();
const path = require("path");

// Serve static files from the project root
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Return JSON prices — called by the price modal in the frontend
app.get("/product/:productId", (req, res) => {
  const productId = req.params.productId;
  sneaks.getProductPrices(productId, (err, product) => {
    if (err) {
      console.error("Price lookup failed:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({
      stockXPrice:    product.lowestResellPrice.stockX,
      goatPrice:      product.lowestResellPrice.goat,
      flightClubPrice: product.lowestResellPrice.flightClub,
    });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`PeterGotKicks running at http://localhost:${PORT}`);
});
