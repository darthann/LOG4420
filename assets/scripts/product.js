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
});