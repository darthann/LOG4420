$(document).ready(function() {

    // Only works in shopping-cart.html, need to use local storage.
    // var counter = 0;
    // $("tr").each(function() {
    //     if ($(this).find("td").length != 0) {
    //         counter++;
    //     }
    // });
    
    localStorage.removeItem("count");
    localStorage.removeItem("list");

    var cartCount = localStorage.getItem("count");
    if (cartCount != null && cartCount != 0) {
        var badge = $(".shopping-cart > .count");
        badge.show();
        badge.text(cartCount);
    }
});