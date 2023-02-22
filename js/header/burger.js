burger_open.click(() => {
	menu.addClass('visible');
	burger_close.addClass('visible');
	$('body').addClass('lock');
});

$(".menu__item:not('.noLine'), .menu__subMenu-item").click(() =>{
	menu.removeClass('visible');
	burger_close.removeClass('visible');
	$('body').removeClass('lock');
});

burger_close.click(() => {
	menu.removeClass('visible');
	burger_close.removeClass('visible');
	$('body').removeClass('lock');
});