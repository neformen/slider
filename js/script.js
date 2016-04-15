function startSliders (timeOut) {

	var sliders = document.body.querySelectorAll('.slider li');
	var i = 0;
	var wait = false;
	function slideRight () {
		if (!wait) {
			wait = true;
			var current = i;
			var next = (i < sliders.length - 1) ? (i+1) : 0;
			sliders[current].className = 'left-slider-right ';
			sliders[next].className = 'right-slider-right';
			setTimeout(function () {
				sliders[current].className = 'hidden';
				sliders[next].className = 'active';
				wait = false
				i = next;
			},4000);
		}
	}

	function slideLeft () {
		if (!wait) {
			wait = true;
			var current = i;
			var previous = i > 1 ? (i-1) : (sliders.length - 1);
			sliders[previous].className = 'left-slider-left';
			sliders[current].className = 'right-slider-left';
			setTimeout(function () {
				sliders[current].className = 'hidden';
				sliders[previous].className = 'active';
				i = previous;
				wait = false
			},4000);
		}
	}

	document.addEventListener('keydown', function(e){
		switch (e.keyCode) {
			case 37 : {
				clearInterval(nextSlide);
				slideLeft(sliders, i);
				nextSlide = setInterval(slideRight, timeOut);
				break;
			}
			case 39 : {
				clearInterval(nextSlide);
				slideRight(sliders, i);
				nextSlide = setInterval(slideRight, timeOut);
				break;

			}
		}
	});
	document.addEventListener('click', function(e) {
		switch (e.target.id) {
			case 'left': {
				clearInterval(nextSlide);
				slideLeft(sliders, i);
				nextSlide = setInterval(slideRight, timeOut);
				break;
			};
			case 'right': {
				clearInterval(nextSlide);
				slideRight(sliders, i);
				nextSlide = setInterval(slideRight, timeOut);
				break;
			}
		}
	})

	var nextSlide = setInterval(slideRight, timeOut);
}

document.addEventListener('click',function(e) {
	switch (e.target.id) {
		case 'start': {
			var seconds = document.getElementById('seconds');
			if (+seconds.value > 4) {
				startSliders(seconds.value * 1000);
				seconds.value = '';
				var start = document.getElementById('start');
				start.id = 'restart';
				start.innerHTML = 'Restart';
			} else {
				seconds.value = '';
			}
			break;
		}
		case 'restart': {
			(function(w){w = w || window; var i = w.setInterval(function(){},100000); while(i>=0) { w.clearInterval(i--); }})(/*window*/);
			if (+seconds.value > 4) {
				startSliders(seconds.value * 1000);
				seconds.value = '';
			} else {
				seconds.value = '';
			}
		}
	}
})