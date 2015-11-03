var myModule = (function() {

	var init = function() {
		_setUpListners();
	};

	var _setUpListners = function() {
		$(document).ready(_sliderStoimost);
		$(".filter__reset").on('click', _resetCheckox);
		$('.filter__title').on('click', _accordeon);
		$('#variants__link_six').on('click', _linkSix);
		$('#variants__link_nine').on('click', _linkNine);
		$('#variants__link_three').on('click', _linkThree);
		$(".tovar__image__small").on('click', _slideShow);
		$(".sort__select-elem").select2({
			minimumResultsForSearch: Infinity
		});
	};

	var _linkSix = function(e) {
		e.preventDefault();
		$(this).closest(".variants__item").addClass('active').siblings().removeClass('active');
		$('#modificate').removeClass('modific_three')
						.removeClass('modific_nine')
						.addClass('modific_six');
	};

	var _linkNine = function(e) {
		e.preventDefault();
		$(this).closest(".variants__item").addClass('active').siblings().removeClass('active');
		$('#modificate').removeClass('modific_three')
						.removeClass('modific_six');
	};

	var _linkThree = function(e) {
		e.preventDefault();
		$(this).closest(".variants__item").addClass('active').siblings().removeClass('active');
		$('#modificate').removeClass('modific_nine')
						.removeClass('modific_six')
						.addClass('modific_three');
	};

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