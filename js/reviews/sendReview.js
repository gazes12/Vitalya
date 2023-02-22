const send_review = $('.form-reviews__button');
const name_review = $('.form-reviews__inputName');
const surname_review = $('.form-reviews__inputSurName');
const review = $('.form-reviews__inputReview');

const reviews = $('.reviews__items');
const reviews_errors = $('.reviews__errors');

send_review.click((e) =>{
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

		success: function(data){
			if(data.errors){
				look_info(_result, [data.errors, 'error'], 'yes');
			}else{
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