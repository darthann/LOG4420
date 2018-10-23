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
            localStorage.setItem("count", cartCount);
            showBadge(cartCount);
        } else {
            localStorage.setItem("count", number);
            showBadge(number);
        }

        // Ça marche pas, trouver un autre moyen
        var list = localStorage.getItem("list");
        console.log(localStorage.getItem("list"));
        if (list != null) {
            list.push(id + "," + number);
            localStorage.setItem("list", list);
        } else {
            var list = [];
            list.push(id + "," + number);
            localStorage.setItem("list", list);
        }
        
    });
});