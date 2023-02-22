menu_items.on('mouseover', function(){
	let item = $(this);
	item.find('.menu__subMenu-list').addClass('visible');
	item.find('.menu__icon').addClass('up');
});

menu_items.on('mouseout', function(){
	let item = $(this);
	item.find('.menu__subMenu-list').removeClass('visible');
	item.find('.menu__icon').removeClass('up');	
});