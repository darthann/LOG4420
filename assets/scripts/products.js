$(document).ready(function() {
    // Display the proper number of products in the cart.
    var cartCount = localStorage.getItem("count");
    if (cartCount != null && cartCount != 0) {
        var badge = $(".shopping-cart > .count");
        badge.show();
        badge.text(cartCount);
    }

    /**
     * Sort according to the sorting method.
     * @param {Array} products The list of products to sort.
     * @param {string} order The order telling how the sort must be executed (name or price).
     * @param {string} category The category of products that must be displayed.
     */
    function sortProducts (products, order, category) {
        $("ul#products-list").empty();

        // Sorts the list accordingly.
        products.sort(function(a, b) {
            var keyA;
            var keyB;
            if (order === "low-high" || order === "high-low") {
                keyA = a["price"];
                keyB = b["price"];
            } else if (order === "A-Z" || order === "Z-A") {
                keyA = a["name"];
                keyB = b["name"];
            }

            if (order === "low-high" || order === "A-Z") {
                if (keyA < keyB) {
                    return -1;
                } else if (keyA > keyB) {
                    return 1;
                }
                return 0;
            } else if (order === "high-low" || order === "Z-A") {
                if (keyA > keyB) {
                    return -1;
                } else if (keyA < keyB) {
                    return 1;
                }
                return 0;
            }
        });

        // Select products according to the selected category.
        var categorizedProducts = [];
        if (category === "all") {
            categorizedProducts = products;
        } else {
            $.each(products, function(index) {
                var product = products[index];
                if (product["category"] === category) {
                    categorizedProducts.push(product);
                }
            });
        }

        // Show the results.
        $.each(categorizedProducts, function(index) {
            var product = categorizedProducts[index];
            $("ul#products-list").append("<li><a href='product.html?id=" + product["id"] + "'><h3>" + product["name"] + 
                                        "</h3><img src='assets/img/" + product["image"] +
                                        "' /><p>" + product["price"] + "</p></a></li>");
        });

        $("p#products-count").text(categorizedProducts.length + " produits");
    }

    var products = [];
    var sortOrder = "low-high";
    var category = "all";

    $.getJSON("./data/products.json", function(data) {
        $.each(data, function(product) {
            products.push(data[product]);
        });

        sortProducts(products, sortOrder, category);
    });

    $("button").click(function() {
        // The id correspond to the sorting way or category.
        var id = $(this).attr("id");

        // The parent id correspond to "product-categories" or "product-criteria".
        var parentId = $(this).parent().attr("id");

        if (parentId === "product-categories") {
            category = id;
        } else if (parentId === "product-criteria") {
            sortOrder = id;
        }

        sortProducts(products, sortOrder, category);

        // Select the button that has been clicked and unselect the previously selected button.
        $("#" + parentId).find("button.selected").removeClass("selected");
        $(this).addClass("selected");
    });
});