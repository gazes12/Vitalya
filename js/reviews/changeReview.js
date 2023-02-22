const reviews_ = $('.reviews__items');
const saved_changes = $('.info-reviews__savedChanges');

const changer = $('.item-reviews--changer'),
	changer_name = $('.item-reviews__name'),
	changer_surname = $('.item-reviews__surname'),
	changer_review = $('.item-reviews__review');
	changer_date = $('.item-reviews__date');

$(document).on('click', '.item-reviews__change', function(){
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

	_savedBtn.click(() =>{
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

			success: function(data){
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
				look_info(_result, ['Отзыв изменен!', 'succ'] , 'yes');				
			}
		});
	});
});