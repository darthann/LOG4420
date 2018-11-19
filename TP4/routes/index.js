const express = require("express");
const router = express.Router();
const db = require("../lib/db");

//-------------------------------------------------Database accesses------------------------------------------------------

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

function addProduct(body) {
    let Product = db.mongoose.model("Product");
    let product = new Product();

    product.id = body.id;
    product.name = body.name;
    product.price = body.price;
    product.image = body.image;
    product.category = body.caterory;
    product.description = body.description;
    product.features = body.features;

    return product;
}

function deleteProducts(productId) {
    if (!productId) {
        return db.mongoose.model("Product").deleteMany({});
    }
    return db.mongoose.model("Product").deleteOne({id: productId});
}

function getOrders(orderId) {
    if (!orderId) {
        return db.mongoose.model("Order").find({});
    }
    return db.mongoose.model("Order").find({id: orderId});
}

function addOrder(body) {
    let Order = db.mongoose.model("Order");
    let order = new Order();

    order.id = body.id;
    order.firstName = body.firstName;
    order.lastName = body.lastName;
    order.email = body.email;
    order.phone = body.phone;
    order.products = body.products;

    return order;
}

function deleteOrders(orderId) {
    if (!orderId) {
        return db.mongoose.model("Order").deleteMany({});
    }
    return db.mongoose.model("Order").deleteOne({id: orderId});
}

//-----------------------------------------------Routes---------------------------------------------------------

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

router.get("/produits/:id", (req, res) => {
    getProduct(req.params.id).then(function(product) {
        res.status(200);
        if (product.length === 0) {
            res.render("product-missing", { title: "OnlineShop - Produit" });
        } else {
            res.render("product", { title: "OnlineShop - Produit", product: product[0] });
        }
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

//----------------------------------------------------API------------------------------------------------------

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

router.get("/api/products/:id", (req, res) => {
    getProduct(req.params.id).then(function(product) {
        res.status(200);
        res.json(product);
    }).catch(function(err) {
        res.status(404);
        res.send(err);
    });
});

router.post("/api/products", (req, res) => {
    addProduct(req.body).save(function(err) {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            res.status(201);
            res.send("The product has been created");
        }
    });
});

router.delete("/api/products/:id", (req, res) => {
    deleteProducts(req.params.id).then(function(obj) {
        res.status(204);
        res.send("The product has been deleted");
    }).catch(function(err) {
        res.status(404);
        res.send(err);
    });
});

router.delete("/api/products", (req, res) => {
    deleteProducts(undefined).then(function(obj) {
        res.status(204);
        res.send("The products has been deleted");
    }).catch(function(err) {
        res.status(404);
        res.send(err);
    });
});

router.get("/api/orders", (req, res) => {
    getOrders(undefined).then(function(orders) {
        res.status(200);
        res.json(orders);
    }).catch(function(err) {
        res.status(400);
        res.send(err);
    });
});

router.get("/api/orders/:id", (req, res) => {
    getOrders(req.params.id).then(function(order) {
        res.status(200);
        res.json(order);
    }).catch(function(err) {
        res.status(404);
        res.send(err);
    });
});

router.post("/api/orders", (req, res) => {
    addOrder(req.body).save(function(err) {
        if (!err) {
            res.status(201);
            res.send("The order has been created");
        } else {
            res.statut(400);
            res.send(err);
        }
    });
});

router.delete("/api/orders/:id", (req, res) => {
    deleteOrders(req.params.id).then(function(obj) {
        res.status(204);
        res.send("The order has been deleted");
    }).catch(function(err) {
        res.status(404);
        res.send(err);
    });
});

router.delete("/api/orders", (req, res) => {
    deleteOrders(undefined).then(function(obj) {
        res.status(204);
        res.send("All the orders have been deleted");
    }).catch(function(err) {
        res.status(400);
        res.send(err);
    })
});

module.exports = router;
