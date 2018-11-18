const express = require("express");
const router = express.Router();
const db = require("../lib/db");

const getProducts = () => {
    return db.mongoose.model("Product").find({});
}

router.get("/", (req, res) => {
    res.render("index", { title: "OnlineShop - Accueil" });
});

router.get("/accueil", (req, res) => {
    res.render("index", { title: "OnlineShop - Accueil" });
});

router.get("/produits", (req, res) => {
    getProducts().then(function(products) {
        res.render("products", { title: "OnlineShop - Produits", products: products }); 
    })
});

router.get("/api/products", (req, res) => {
    getProducts().then(function(products) {
        res.json(products);
    });
});

router.get("/produits/:id", (req, res) => {
    res.render("product", { title: "OnlineShop - Produit", id: req.params.id });
});

router.get("/contact", (req, res) => {
    res.render("contact", { title: "OnlineShop - Contact" });
});

router.get("/panier", (req, res) => {
    res.render("shopping-cart", { title: "OnlineShop - Panier" });
});

router.get("/commande", (req, res) => {
    res.render("order", { title: "OnlineShop - Commande" });
});

router.get("/confirmation", (req, res) => {
    res.render("confirmation", { title: "OnlineShop - Confirmation" });
});

module.exports = router;
