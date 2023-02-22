/*function window_checkClasses(_classes, closingEl){	
	setTimeout(() => {
		$(document).one('click', function(e){
			if($(e.target).is(_classes.map(function(className) {return '.'+ className;}).join(',')) != true){
				closingEl.removeClass('visible');
				info.removeClass('visible');
				$(this).off(e);
			}			
		});
	}, 1000);
}*/

let timer_closing;
function look_info(object, [text, text_type], hide){
	if(timer_closing != null){
		clearInterval(timer_closing);
	}
	
	/*Все элементы съебуют нахуй*/
	info.removeClass('visible');
	info.children().each(function(){
		$(this).removeClass('visible');
	});

	/*Приходят новые нахуй*/
	setTimeout(() =>{
		info.addClass('visible');
		object.addClass('visible');	
	}, 500);

	/*Если строка*/
	if(arguments[1].length > 0){
		object.removeClass('info__result--error info__result--succ');	

		object.html(arguments[1][0]);
		object.addClass(`info__result--${arguments[1][1]}`);
	}

	/*Если хочет по съебам дать*/
	if(hide == 'yes'){
		let selectors = [];
		selectors.push(info.attr('class'));
		object.children().each(function(){
			selectors.push($(this).attr('class'));			
		});

		timer_closing = setTimeout(() =>{
			info.removeClass('visible');
			object.removeClass('visible');				
		}, 5000);		
	}else{
		/*Если не хочет по съебам давать*/
		info.bind('close', () => info.removeClass('visible'));
	}
}

const info = $('.info'),
	_callToPhones = $('.info-callToPhones'),
		_btns = $('.info-callToPhones__button'),
	_result = $('.info__result'),
	_saved = $('.info__saved'),	
		_savedBtn = $('.info__saved button');



const burger_open = $('.menu__open');
const burger_close = $('.menu__close');
const menu = $('.menu__list'),
    menu_items = $('.menu__item');		