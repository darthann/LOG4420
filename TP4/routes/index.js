const express = require("express");
const router = express.Router();
const db = require("../lib/db");

function getProducts(category, searchCriteria) {
    if (!category && !searchCriteria) {
        return db.mongoose.model("Product").find({}).sort({price: 1});
    }

    if (!category) {
        if (searchCriteria === "price-asc") {
            return db.mongoose.model("Product").find({}).sort({price: 1});
        } else if (searchCriteria === "price-dsc") {
            return db.mongoose.model("Product").find({}).sort({price: -1});
        } else if (searchCriteria === "alpha-asc"){
            return db.mongoose.model("Product").find({}).sort({name: 1});
        } else {
            return db.mongoose.model("Product").find({}).sort({name: -1});
        }
    } else {
        if (searchCriteria === "price-asc") {
            return db.mongoose.model("Product").find({category: category}).sort({price: 1});
        } else if (searchCriteria === "price-dsc") {
            return db.mongoose.model("Product").find({category: category}).sort({price: -1});
        } else if (searchCriteria === "alpha-asc"){
            return db.mongoose.model("Product").find({category: category}).sort({name: 1});
        } else {
            return db.mongoose.model("Product").find({category: category}).sort({name: -1});
        }
    }
}

function getProduct(productId) {
    return db.mongoose.model("Product").find({id: productId});
}

router.get("/", (req, res) => {
    res.render("index", { title: "OnlineShop - Accueil" });
});

router.get("/accueil", (req, res) => {
    res.render("index", { title: "OnlineShop - Accueil" });
});

router.get("/produits", (req, res) => {
    let category = req.query.category;
    let criteria = req.query.criteria;
    getProducts(category, criteria).then(function(products) {
        res.status(200);
        res.render("products", { title: "OnlineShop - Produits", products: products }); 
    }).catch(function(err) {
        res.status(400);
        res.send(err);
    });
});

router.get("/api/products", (req, res) => {
    let category = req.query.category;
    let criteria = req.query.criteria;
    getProducts(category, criteria).then(function(products) {
        res.status(200);
        res.json(products);
    }).catch(function(err) {
        res.status(400);
        res.send(err);
    })
});

router.get("/produits/:id", (req, res) => {
    getProduct(req.params.id).then(function(product) {
        res.status(200);
        res.render("product", { title: "OnlineShop - Produit", product: product[0] });
    }).catch(function(err) {
        res.status(400);
        res.send(err);
    });
});

router.get("/api/products/:id", (req, res) => {
    getProduct(req.params.id).then(function(product) {
        res.status(200);
        res.json(product);
    }).catch(function(err) {
        res.status(400);
        res.send(err);
    });
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
