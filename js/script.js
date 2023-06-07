$(document).ready(function() {
	$(".owl-carousel").owlCarousel({
		items: 1,
		loop: true,
		autoPlay: true,
		center: true,
		nav: true,
		navText: ['<div class="mobile-gallery__prev"><i class="fa-solid fa-backward"></i></div>', '<div class="mobile-gallery__next"><i class="fa-solid fa-forward"></i></div>']
	});

    
	$("#prev").click(function() {
		owl.trigger("owl.prev");
	});
	$("#next").click(function() {
		owl.trigger("owl.next");
	});

	$(window).resize(function() {
		checkSizeWindow();
	});
	checkSizeWindow();

	function checkSizeWindow() {
		if($(window).width() > 768) {
			$(".owl-carousel").trigger('destroy.owl.carousel');
		} else {
			$(".owl-carousel").owlCarousel({
				items: 1,
			});
		}
	}




	let timer_closing;

	function look_info(object, [text, text_type], hide) {
		if(timer_closing != null) {
			clearInterval(timer_closing);
		}
		/*Все элементы съебуют нахуй*/
		info.removeClass('visible');
		info.children().each(function() {
			$(this).removeClass('visible');
		});
		/*Приходят новые нахуй*/
		setTimeout(() => {
			info.addClass('visible');
			object.addClass('visible');
		}, 500);
		/*Если строка*/
		if(arguments[1].length > 0) {
			object.removeClass('info__result--error info__result--succ');
			object.html(arguments[1][0]);
			object.addClass(`info__result--${arguments[1][1]}`);
		}
		/*Если хочет по съебам дать*/
		if(hide == 'yes') {
			let selectors = [];
			selectors.push(info.attr('class'));
			object.children().each(function() {
				selectors.push($(this).attr('class'));
			});
			timer_closing = setTimeout(() => {
				info.removeClass('visible');
				object.removeClass('visible');
			}, 5000);
		} else {
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

	const icons = $('i');
	icons.each(function() {
		let icon = $(this);
		let timer = setTimeout(animation, 5000);

		function animation() {
			icon.animate({
				borderSpacing: -360
			}, {
				step: function(now, fx) {
					$(this).css('transform', 'rotate(' + now + 'deg)');
				},
				duration: 1000,
			}, 'linear');
			timer = setTimeout(animation, 5000);
		}
	});
	/*effect ficker oninput*/
	const inputs = $('.form-reviews__input');
	inputs.each(function() {
		let input = $(this);
		input.keypress(() => input.css('transform', 'scale(1.02)'));
		input.keyup(() => input.css('transform', 'scale(1)'));
	});
	const back_calls = $('.contacts__button');
	back_calls.click(() => {
		look_info(_callToPhones, '', 'yes');
	});
	_btns.click(() => {
		info.removeClass('visible');
		_callToPhones.removeClass('visible');
	});
	const reviews_ = $('.reviews__items');
	const saved_changes = $('.info-reviews__savedChanges');
	const changer = $('.item-reviews--changer'),
		changer_name = $('.item-reviews__name'),
		changer_surname = $('.item-reviews__surname'),
		changer_review = $('.item-reviews__review');
	changer_date = $('.item-reviews__date');
	$(document).on('click', '.item-reviews__change', function() {
		let btn = $(this);
		let review = btn.parents('.item-reviews'),
			review_id = review.attr('data-id'),
			review_name = review.find('.item-reviews__name').text(),
			review_surname = review.find('.item-reviews__surname').text(),
			review_review = review.find('.item-reviews__review').text(),
			review_date = review.find('.item-reviews__date').text();
		review.addClass('hidden');
		changer.addClass('visible');
		changer_name.val(review_name);
		changer_surname.val(review_surname);
		changer_review.val(review_review);
		changer_date.val(review_date);
		look_info(_saved, '', '');
		_savedBtn.click(() => {
			review.removeClass('hidden');
			let new_name = $('.item-reviews--changer .item-reviews__name').val(),
				new_surname = $('.item-reviews--changer .item-reviews__surname').val(),
				new_review = $('.item-reviews--changer .item-reviews__review').val();
			$.ajax({
				url: '../../php/reviews/changeReview.php',
				type: 'post',
				dataType: 'json',
				data: {
					id: review_id,
					new_name: new_name,
					new_surname: new_surname,
					new_review: new_review,
				},
				success: function(data) {
					console.log(reviews_.find(`[data-id=${review_id}]`));
					reviews_.find(`[data-id=${review_id}]`).html(`
					<div class="item-reviews__header">
						<div class="item-reviews__fio">
							<div class="item-reviews__name">${data[0]['name']}</div>
							<div class="item-reviews__surname">${data[0]['surname']}</div>									
						</div>									
						<div class="item-reviews__info">
							<div class="item-reviews__date">${data[0]['date']}</div>
							<div class="item-reviews__buttons">
								<button class="item-reviews__delete btn"></button>
								<button class="item-reviews__change btn"></button>
							</div>	

							<div class="item-reviews__settings"><i class="fa-solid fa-ellipsis-vertical"></i></div>										
						</div>									
					</div>


					<div class="item-reviews__review">${data[0]['review']}</div>					
				`);
					changer.removeClass('visible');
					info.trigger('close');
					look_info(_result, ['Отзыв изменен!', 'succ'], 'yes');
				}
			});
		});
	});
	$(document).on('click', '.item-reviews__delete', function() {
		let btn = $(this);
		let review = btn.parents('.item-reviews');
		let id = review.attr('data-id');
		$.ajax({
			url: '../../php/reviews/deleteReview.php',
			type: 'post',
			data: {
				id: id,
			},
			success: function(data) {
				review.remove();
				look_info(_result, ['Отзыв удален!', 'succ'], 'yes');
			}
		});
	});
	$(document).click(function(e) {
		if($(e.target).hasClass('item-reviews__settings')) {
			$(e.target).parents('.item-reviews__header').find('.item-reviews__buttons').addClass('visible');
		} else {
			$('.item-reviews__buttons').each(function() {
				$(this).removeClass('visible');
			});
		}
	});
	const send_review = $('.form-reviews__button');
	const name_review = $('.form-reviews__inputName');
	const surname_review = $('.form-reviews__inputSurName');
	const review = $('.form-reviews__inputReview');
	const reviews = $('.reviews__items');
	const reviews_errors = $('.reviews__errors');
	send_review.click((e) => {
		e.preventDefault();
		$.ajax({
			url: '../../php/reviews/sendReview.php',
			type: 'post',
			dataType: 'json',
			data: {
				name: name_review.val(),
				surname: surname_review.val(),
				review: review.val(),
			},
			success: function(data) {
				if(data.errors) {
					look_info(_result, [data.errors, 'error'], 'yes');
				} else {
					look_info(_result, ['Отзыв добавлен!', 'succ'], 'yes');
					reviews.append(`
					<div class="reviews__item item-reviews" data-id="${data[0]['id']}">
						<div class="item-reviews__header">
							<div class="item-reviews__fio">
								<div class="item-reviews__name">${data[0]['name']}</div>
								<div class="item-reviews__surname">${data[0]['surname']}</div>									
							</div>									
							<div class="item-reviews__info">
								<div class="item-reviews__date">${data[0]['date']}</div>
								<div class="item-reviews__buttons">
									<button class="item-reviews__delete btn"></button>
									<button class="item-reviews__change btn"></button>
								</div>	

								<div class="item-reviews__settings"><i class="fa-solid fa-ellipsis-vertical"></i></div>										
							</div>									
						</div>


						<div class="item-reviews__review">${data[0]['review']}</div>
					</div>	
				`);
				}
			}
		});
	});
	burger_open.click(() => {
		menu.addClass('visible');
		burger_close.addClass('visible');
		$('body').addClass('lock');
	});
	$(".menu__item:not('.noLine'), .menu__subMenu-item").click(() => {
		menu.removeClass('visible');
		burger_close.removeClass('visible');
		$('body').removeClass('lock');
	});
	burger_close.click(() => {
		menu.removeClass('visible');
		burger_close.removeClass('visible');
		$('body').removeClass('lock');
	});
	menu_items.on('mouseover', function() {
		let item = $(this);
		item.find('.menu__subMenu-list').addClass('visible');
		item.find('.menu__icon').addClass('up');
	});
	menu_items.on('mouseout', function() {
		let item = $(this);
		item.find('.menu__subMenu-list').removeClass('visible');
		item.find('.menu__icon').removeClass('up');
	});



if(localStorage.getItem('theme') == undefined){
    localStorage.setItem('theme', 'dark');
}else{
    if(localStorage.getItem('theme') == 'dark'){
        $('body').addClass('dark');
        $('body').removeClass('light')
    }else if(localStorage.getItem('theme') == 'light'){
        $('body').addClass('light');
        $('body').removeClass('dark');
    }
}

let toggleOn = $('.toggleTheme__on');
let toggleOff = $('.toggleTheme__off');

toggleOff.click(() => {{
    localStorage.setItem('theme', 'light');

    $('body').addClass('light');
    $('body').removeClass('dark');

    toggleOff.addClass('hidden');
    toggleOn.removeClass('hidden');
}});

toggleOn.click(() => {{
    localStorage.setItem('theme', 'dark');

    $('body').addClass('dark');
    $('body').removeClass('light');

    toggleOn.addClass('hidden');
    toggleOff.removeClass('hidden');
}});


});