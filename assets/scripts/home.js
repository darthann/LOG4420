$(document).ready(function() {
    
    /**
     * Uncomment and go to the home page to reset the local storage.
     * (Add others lines if other items are created).
     */
    localStorage.removeItem("count");
    localStorage.removeItem("item1");
    localStorage.removeItem("item2");
    localStorage.removeItem("item3");
    localStorage.removeItem("item4");
    localStorage.removeItem("item5");
    localStorage.removeItem("item6");
    localStorage.removeItem("item7");
    localStorage.removeItem("item8");
    localStorage.removeItem("item9");
    localStorage.removeItem("item10");
    localStorage.removeItem("item11");
    localStorage.removeItem("item12");
    localStorage.removeItem("item13");

    var cartCount = localStorage.getItem("count");
    if (cartCount != null && cartCount != 0) {
        var badge = $(".shopping-cart > .count");
        badge.show();
        badge.text(cartCount);
    }
});