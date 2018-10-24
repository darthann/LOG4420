$(document).ready(function() {
    
    /**
     * Uncomment and go to the home page to reset the local storage.
     * (Add others lines if other items are created).
     */
    // localStorage.removeItem("count");
    // localStorage.removeItem("cart");

    var cartCount = localStorage.getItem("count");
    if (cartCount != null && cartCount != 0) {
        var badge = $(".shopping-cart > .count");
        badge.show();
        badge.text(cartCount);
    }
});