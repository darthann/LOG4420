$(document).ready(function() {
    var cartCount = localStorage.getItem("count");
    if (cartCount != null && cartCount != 0) {
        var badge = $(".shopping-cart > .count");
        badge.show();
        badge.text(cartCount);
    }

    document.getElementById("name").innerHTML = localStorage.getItem("first-name") 
        + " " + localStorage.getItem("last-name");

    document.getElementById("confirmation-number").innerHTML = localStorage.getItem("commandCount");
});