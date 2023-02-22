$(document).on('click', '.item-reviews__delete', function(){
	let btn = $(this);
	let review = btn.parents('.item-reviews');
	let id = review.attr('data-id');


	$.ajax({
		url: '../../php/reviews/deleteReview.php',
		type: 'post',
		data: {
			id: id,
		},

		success: function(data){
			review.remove();
			look_info(_result, ['Отзыв удален!', 'succ'], 'yes');
		}
	});
});
