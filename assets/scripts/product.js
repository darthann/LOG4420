function getURLParameter(param) {
    var pageURL = window.location.search.substring(1);
    var URLVariables = pageURL.split("&");
    for (var i = 0; i < URLVariables.length; i++) {
        var paramName = URLVariables[i].split("=");
        if (paramName[0] === param) {
            return paramName[1];
        }
    }
}

var id = getURLParameter("id");

$(document).ready(function() {
    function showBadge(count) {
        var badge = $(".shopping-cart > .count");
        badge.show();
        badge.text(count);
    }

    var cartCount = localStorage.getItem("count");
    if (cartCount != null && cartCount != 0) {
        showBadge(cartCount);
    }

    var product = null;

    $.getJSON("./data/products.json", function(data) {
        $.each(data, function(index) {
            if (data[index]["id"].toString() === id) {
                product = data[index];
            }
        });
    }).done(function() {
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
        e.preventDefault();

        var number = $("input.form-control").val();
        
        if (cartCount != null) {
            cartCount = parseInt(cartCount) + parseInt(number);
        } else {
            cartCount = parseInt(number);
        }

        localStorage.setItem("count", cartCount);
        showBadge(cartCount);

        // On utilise un gros string de ce format : id-qty,id-qty,id-qty,id-qty,id-qty,...
        // Il peut arriver que les id se répètent, il va falloir en tenir compte à la génération du panier.
        // (Par exemple, 12-3,8-4,5-2,5-1 est un format possible).
        var cart = localStorage.getItem("cart");
        if (cart == null) {
            cart = id + "-" + number;
        } else {
            cart += "," + id + "-" + number;
        }
        localStorage.setItem("cart", cart);
        
    });
});