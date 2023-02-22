const icons = $('i');
icons.each(function(){
	let icon = $(this);
	let timer = setTimeout(animation, 5000);

	function animation(){
		icon.animate({  borderSpacing: -360 }, {
		    step: function(now,fx) {
		      $(this).css('transform','rotate('+now+'deg)');  
		    },
		    duration:1000,
		},'linear');

		timer = setTimeout(animation, 5000);
	}
});


/*effect ficker oninput*/
const inputs = $('.form-reviews__input');
inputs.each(function(){
	let input = $(this);
	input.keypress(() => input.css('transform', 'scale(1.02)'));
	input.keyup(() => input.css('transform', 'scale(1)'));
});