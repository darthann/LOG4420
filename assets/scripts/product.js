/**
 * Gets the id from the URL.
 */
function getIdFromURL() {
    var pageURL = window.location.search.substring(1);
    var URLVariables = pageURL.split("&");
    for (var i = 0; i < URLVariables.length; i++) {
        var paramName = URLVariables[i].split("=");
        if (paramName[0] === "id") {
            return paramName[1];
        }
    }
}

var id = getIdFromURL();

$(document).ready(function() {
    /**
     * Display the proper number of products in the cart.
     * @param {int} count The number of products.
     */
    function showBadge(count) {
        var badge = $(".shopping-cart > .count");
        badge.show();
        badge.text(count);
    }

    // Get the number of items in the cart.
    var cartCount = localStorage.getItem("count");
    if (cartCount != null && cartCount != 0) {
        cartCount = parseInt(cartCount);
        showBadge(cartCount);
    }

    var product = null;

    // Find the product related to the id in the URL.
    $.getJSON("./data/products.json", function(data) {
        $.each(data, function(index) {
            if (data[index]["id"].toString() === id) {
                product = data[index];
                return false;
            }
        });
    }).done(function() {
        // Show the proper product.
        if (product === null) {
            $("#no-product").show();
        } else {
            $("#product-name").text(product["name"]);
            $("#product-image").attr("src", "./assets/img/" + product["image"]);
            $("#product-desc").append(product["description"]);
            $("#product-price").text(product["price"]);
    
            $.each(product["features"], function(index) {
                $("#product-features").append("<li>" + product["features"][index] + "</li>");
            });
    
            $("#product").show();
        }
    });

    $("#add-to-cart-form").submit(function(e) {
        // Prevent page refresh.
        e.preventDefault();

        // Get the number in the input.
        var number = parseInt($("input.form-control").val());
        
        if (cartCount !== null) {
            cartCount = parseInt(cartCount) + number;
        } else {
            cartCount = number;
        }

        // Set the cart count in the local storage and update the badge.
        localStorage.setItem("count", cartCount);
        showBadge(cartCount);

        // Get the item from the local storage.
        var item = localStorage.getItem("item" + id);
        var itemCount = 0
        if (item === null) {
            itemCount = number;
        } else {
            // The split is needed because of the way we save the products in the local storage.
            var itemParts = item.split("-");
            itemCount = parseInt(itemParts[1]) + number;
        }

        // The items are saved in the local storage this way:
        // key: item<ID>, value: <productName>-<numberOfThisProductInTheCart>
        localStorage.setItem("item" + id, product["name"] + "-" + itemCount);
        
        // Show the dialog for 5 seconds.
        $("#dialog").fadeIn();
        setTimeout(function() {
            $("#dialog").fadeOut();
        }, 5000);
    });
});