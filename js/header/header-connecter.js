$(document).ready(() =>{        
    $.when(
        $.getScript("./js/header/dropDowns.js"),
		$.getScript("./js/header/burger.js"),
		$.getScript("./js/header/selectPhones.js"),
    )

});
