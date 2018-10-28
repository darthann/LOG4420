var items = [];

// Get the items from the local storage.
for (var i = 1; i <= 13; i++) {
    var item = localStorage.getItem("item" + i);
    if (item == null) {
        continue;
    }

    var res = item.split("-");
    var itemName = res[0];
    var itemQty = parseInt(res[1]);

    var object = {
        id: i,
        name: itemName,
        quantity: itemQty
    };
    items.push(object);
}

// Sort the items alphabetically.
items.sort(function(a, b) {
    var keyA = a.name;
    var keyB = b.name;

    if (keyA < keyB) {
        return -1;
    } else if (keyA > keyB) {
        return 1;
    }
    return 0;
});

$(document).ready(function() {
    /**
     * Function to execute when the cart becomes empty.
     */
    function cartGoesEmpty() {
        $("#cart").hide();
        $("#no-items").show();
        $(".shopping-cart > .count").hide();
    }

    /**
     * Function to execute when the minus button must be disabled.
     */
    function disableMinusButton() {
        $(".remove-quantity-button").prop("disabled", true);
    }

    /**
     * Function to execute when the minus button must be enabled.
     */
    function enableMinusButton() {
        $(".remove-quantity-button").prop("disabled", false);
    }

    /**
     * Function to execute when the number of products change.
     * @param {double} productPrice The price to be added/removed to/from the total amount.
     * @param {boolean} addProduct A flag that determines if the product is added or removed.
     */ 
    function updateCountAndTotalPrice(productPrice, addProduct = false) {
        var count = parseInt(localStorage.getItem("count"));

        if (addProduct) {
            count++;
        } else {
            count--;
        }

        $(".shopping-cart > .count").text(count);
        localStorage.setItem("count", count);

        var totalPrice = parseFloat($("#price").text());

        if (addProduct) {
            totalPrice += productPrice;
        } else {
            totalPrice -= productPrice;
        }

        $("#price").text(totalPrice.toFixed(2));
        
        if (count === 0) {
            cartGoesEmpty();
        }
    }
    
    // Display the proper number of products in the cart.
    var cartCount = localStorage.getItem("count");
    if (cartCount != null && cartCount != 0) {
        var badge = $(".shopping-cart > .count");
        badge.show();
        badge.text(cartCount);
    }

    if (cartCount > 0) {
        var product = null;

        $.each(items, function(i) {
            // Find the proper product.
            $.getJSON("./data/products.json", function(data) {
                $.each(data, function(j) {
                    if (data[j]["id"] === items[i].id) {
                        product = data[j];
                        return false;
                    }
                });
            }).done(function() {
                if (product !== null) {
                    // Add the proper informations in the table.
                    var price = (product["price"] * items[i].quantity).toFixed(2);
                    $("table").append("<tr><td><button class='remove-item-button'><i class='fas fa-times'></i></button></td><td>" +
                        "<a href='product.html'>" + product["name"] + "</a></td><td class='unit-price'>" + product["price"] + 
                        "</td><td><button class='remove-quantity-button'><i class='fas fa-minus'></i></button>" +
                        "<span class='quantity'>" + items[i].quantity +
                        "</span><button class='add-quantity-button'><i class='fas fa-plus'></i></button></td><td>" + price + 
                        "</td></tr>");

                    if (parseInt(items[i].quantity) === 1) {
                        disableMinusButton();
                    }

                    // Set the total amount.
                    var totalPrice = parseFloat($("#price").text());
                    price = parseFloat(price);
                    if (isNaN(totalPrice)) {
                        totalPrice = price;
                    } else {
                        totalPrice += price;
                    }
                    $("#price").text(totalPrice.toFixed(2));
                }
            });
        });

        // Display the table.
        $("#cart").show();
    } else {
        // Display a message saying there are no products.
        $("#no-items").show();
    }

    $(document).on("click", "button.remove-item-button", function() {
        if (confirm("Voulez-vous supprimer le produit du panier?")) {
            var row = $(this).parent("td").parent("tr");
            var productName = row.find("a").text();
            var productPrice = parseFloat(row.children().last().text());
            var id = null;

            // Find the product id.
            $.getJSON("./data/products.json", function(data) {
                $.each(data, function(i) {
                    if (data[i]["name"] === productName) {
                        id = data[i]["id"];
                        return false;
                    }
                });
            }).done(function() {
                if (id !== null) {
                    // Remove the item from the local storage and the table and update the price.
                    localStorage.removeItem("item" + id);
                    updateCountAndTotalPrice(productPrice);
                    row.remove();
                }
            });
        }
    });

    $(document).on("click", "button.remove-quantity-button", function() {
        var row = $(this).parent("td").parent("tr");
        var productName = row.find("a").text();
        var productPrice = parseFloat(row.find("td.unit-price").text());
        var productTotal = parseFloat(row.children().last().text());
        var quantity = parseInt(row.find("span.quantity").text());
        var id = null;

        // Another safety in case the disabled attribute fails.
        if (quantity > 1) {
            productTotal -= productPrice;
            row.children().last().text(productTotal.toFixed(2));

            quantity--;
            row.find("span.quantity").text(quantity);
            if (quantity === 1) {
                disableMinusButton();
            }

            // Find the product id.
            $.getJSON("./data/products.json", function(data) {
                $.each(data, function(i) {
                    if (data[i]["name"] === productName) {
                        id = data[i]["id"];
                        return false;
                    }
                });
            }).done(function() {
                if (id !== null) {
                    // Update the item in the local storage and the total amount.
                    localStorage.setItem("item" + id, productName + "-" + quantity);
                    updateCountAndTotalPrice(productPrice);
                }
            });
        }
    });

    $(document).on("click", "button.add-quantity-button", function() {
        var row = $(this).parent("td").parent("tr");
        var productName = row.find("a").text();
        var productPrice = parseFloat(row.find("td.unit-price").text());
        var productTotal = parseFloat(row.children().last().text());
        var quantity = parseInt(row.find("span.quantity").text());
        var id = null;

        productTotal += productPrice;
        row.children().last().text(productTotal.toFixed(2));

        quantity++;
        row.find("span.quantity").text(quantity);
        if (quantity > 1) {
            enableMinusButton();
        }

        // Find the product id.
        $.getJSON("./data/products.json", function(data) {
            $.each(data, function(i) {
                if (data[i]["name"] === productName) {
                    id = data[i]["id"];
                    return false;
                }
            });
        }).done(function() {
            if (id !== null) {
                // Update the item in the local storage and the total amount.
                localStorage.setItem("item" + id, productName + "-" + quantity);
                updateCountAndTotalPrice(productPrice, true);
            }
        });
    });

    $("#remove-all-items-button").click(function() {
        if (confirm("Voulez-vous supprimer tous les produits du panier?")) {
            // Remove everthing from the local storage.
            localStorage.removeItem("count");
            for (var i = 1; i <= 13; i++) {
                localStorage.removeItem("item" + i);
            }
            cartGoesEmpty();
        }
    });
});