var myModule = (function() {

	var init = function() {
		_setUpListners();
	};

	var _setUpListners = function() {
		$(document).ready(_sliderStoimost);
		$(".filter__reset").on('click', _resetCheckox);
		$('.filter__title').on('click', _accordeon);
		$(".variants__item").on('click', _variant);
		$(".tovar__image__small").on('click', _slideShow);
		$(".sort__select-elem").select2({
			minimumResultsForSearch: Infinity
		});
		$(".info__text_column").columnize({
			width: 500
		});
	};

	var _variant = function(e) {
		e.preventDefault();
		var thisId = $(this).attr("id");
		$('#modificate').removeClass('modific_three modific_nine modific_six').addClass(thisId);
	}

	var _sliderStoimost = function() {
		$( ".filter__slider-element" ).slider({
		range: true,
		min: 0,
		max: 26000,
		values: [ 100, 13000 ],
		slide: function( event, ui ) {
			//Поле минимального значения
			$( "#price" ).val(ui.values[ 0 ]);
			//Поле максимального значения
			$("#price2").val(ui.values[1]);         }
		});
		//Записываем значения ползунков в момент загрузки страницы
		//То есть значения по умолчанию
		$( "#price" ).val($( ".filter__slider-element" ).slider( "values", 0 ));
		$("#price2").val($(".filter__slider-element").slider( "values", 1 ));
	};

	var _resetCheckox = function(e) {
		e.preventDefault();
		var $this = $(this),
			container = $this.closest(".filter__item"),
			checkboxes = container.find("input:checkbox");

		checkboxes.each(function() {
			$(this).prop('checked', false);
		});
	};

	var _accordeon = function(e) {
		e.preventDefault();
		var $this = $(this).children();
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
	};

	var _slideShow = function() {
		var $this=$(this),
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
		init: init
	};
})();

myModule.init();