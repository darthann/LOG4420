var items = [];

for (var i = 1; i <= 13; i++) {
    var itemQty = localStorage.getItem("item" + i);
    if (itemQty == null) {
        continue;
    }

    var object = {
        id: i,
        quantity: itemQty
    };
    items.push(object);
    // Sort les produits en ordre alphabétique.
}

$(document).ready(function() {
    var cartCount = localStorage.getItem("count");
    if (cartCount != null && cartCount != 0) {
        var badge = $(".shopping-cart > .count");
        badge.show();
        badge.text(cartCount);
    }

    if (cartCount > 0) {
        var product = null;
        $.each(items, function(i) {
            $.getJSON("./data/products.json", function(data) {
                $.each(data, function(j) {
                    if (data[j]["id"] === items[i].id) {
                        product = data[j];
                        return false;
                    }
                });
            }).done(function() {
                if (product !== null) {
                    var total = product["price"] * items[i].quantity;
                    $("table").append("<tr><td><button><i class='fas fa-times'></i></button></td><td><a href='product.html'>" + product["name"] +
                            "</a></td><td>" + product["price"] + "</td><td><button><i class='fas fa-minus'></i></button><span class='quantity'>" +
                            items[i].quantity + "</span><button><i class='fas fa-plus'></i></button></td><td>" + total + "</td></tr>");
                }
            });
        });

        $("#cart").show();
    } else {
        $("#no-items").show();
    }
});