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

        var itemCount = localStorage.getItem("item" + id);
        if (itemCount == null) {
            itemCount = number;
        } else {
            itemCount = parseInt(itemCount) + parseInt(number);
        }
        localStorage.setItem("item" + id, itemCount);
        console.log(localStorage.getItem("item" + id));        
    });
});