var _resetCheckox = (function()  {
	var _resetChek = function($this) {
		var container = $this.closest(".filter__item"),
			checkboxes = container.find("input:checkbox");

		checkboxes.each(function() {
			$(this).prop('checked', false);
		});
	}

	return {
		init: function() {
			$(".filter__reset").on('click', function(e) {
				e.preventDefault();
				_resetChek($(this));
			});
		}
	}
}());

var _accordeon = (function()  {
	var _accordList = function($this) {
		var $this = $this.children();
			container = $this.closest(".filter__item"),
			content = container.find(".filter__content"),
			otherContent = $this.closest(".filter__box").find(".filter__content");

		if(!container.hasClass("active")) {
			otherContent.slideUp().closest(".filter__item").removeClass("active");

			container.addClass("active");
			content.stop(true, true).slideDown();
		} else {
			container.removeClass("active");
			content.stop(true, true).slideUp();
		}
	}

	return {
		init: function() {
			$(".filter__title").on('click', function(e) {
				e.preventDefault();
				_accordList($(this));
			});
		}
	}
}());

var _variant = (function()  {
	var _variantList = function($this) {
		var thisId = $this.attr("id");
		$('#modificate').removeClass('modific_three modific_nine modific_six').addClass(thisId);
	}

	return {
		init: function() {
			$(".variants__item").on('click', function(e) {
				e.preventDefault();
				_variantList($(this));
			});
		}
	}
}());

var _sliderStoimost = (function()  {
	var _sliderRange = function() {
		$( ".filter__slider-element" ).slider({
			range: true,
			min: 0,
			max: 26000,
			values: [ 100, 13000 ],
			slide: function( event, ui ) {
				$( "#price" ).val(ui.values[0]);
				$("#price2").val(ui.values[1]);
			}
		});
		$( "#price" ).val($( ".filter__slider-element" ).slider( "values", 0 ));
		$("#price2").val($(".filter__slider-element").slider( "values", 1 ));
	}

	return {
		init: function() {
			_sliderRange();
		}
	}
}());

var _slideShow = (function()  {
	var _changeBig = function($this) {
		var 
			src = $this.attr("src"),
			container = $this.closest(".tovar__images__box"),
			display = container.find(".tovar__image__big");

		$this.closest(".tovar__images__item").addClass("active")
			.siblings().removeClass("active");

		display.fadeOut(function() {
			$(this).attr("src", src).fadeIn();
		});
	}
	
	return {
		init: function() {
			$(".tovar__image__small").on('click', function(e) {
				e.preventDefault();
				_changeBig($(this));
			});
		}
	}
}());

$(document).ready(function(){
	if($(".filter__reset").length) {
		_resetCheckox.init();
	}

	if($(".filter__title").length) {
		_accordeon.init();
	}

	if($(".variants__item").length) {
		_variant.init();
	}

	if($(".filter__slider-element").length) {
		_sliderStoimost.init();
	}

	if($(".tovar__image__small").length) {
		_slideShow.init();
	}

	/*------------ slider ------------*/

	$(".sort__select-elem").select2({
		minimumResultsForSearch: Infinity
	});

	/*---------- columnizer ----------*/

	$(".info__text_column").columnize({
		width: 500
	});
});