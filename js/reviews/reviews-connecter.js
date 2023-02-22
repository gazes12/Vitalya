$(document).ready(() =>{
    $.when(
        $.getScript("./js/reviews/deleteReview.js"),
        $.getScript("./js/reviews/changeReview.js"),
        $.getScript("./js/reviews/mobileButtons.js"),
        $.getScript("./js/reviews/sendReview.js"),
    )	
});
