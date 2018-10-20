var PageTransitions = (function () {

	var $main = $('#pt-main'),
		$pages = $main.children('div.pt-page'),
		pagesCount = $pages.length,
		current = 0,
		pageNumb,
		isAnimating = false,
		endCurrPage = false,
		endNextPage = false,
		animEndEventNames = {
			'WebkitAnimation': 'webkitAnimationEnd',
			'OAnimation': 'oAnimationEnd',
			'msAnimation': 'MSAnimationEnd',
			'animation': 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
		// support css animations
		support = Modernizr.cssanimations;

	function init() {

		$pages.each(function () {
			var $page = $(this);
			$page.data('originalClassList', $page.attr('class'));
			console.log("each");
		});

		$pages.eq(current).addClass('pt-page-current');



		$(".sidenav").on("click", ".navPage", function () {
			pageLink = $(this).attr("id");
			console.log(pageLink)
			pageName = $("#" + pageLink + "Page")
			console.log(pageName.attr("data-number"));
			pageNumb = pageName.attr("data-number");
			nextPage(pageNumb);

		})


	}

	function nextPage(options) {

		if (isAnimating) {
			return false;
		}

		isAnimating = true;
		var $currPage = $pages.eq(current);
		if (options.showPage) {
			if (options.showPage < pagesCount - 1) {
				current = options.showPage;
			}
			else {
				current = 0;
			}
		}
		else {
			if (current < pagesCount - 1) {
				++current;
			}
			else {
				current = 0;
			}
		}
		var $nextPage = $pages.eq(current).addClass('pt-page-current'),
			outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop', inClass = 'pt-page-rotateCarouselLeftIn';


		$currPage.addClass(outClass).on(animEndEventName, function () {
			$currPage.off(animEndEventName);
			endCurrPage = true;
			if (endNextPage) {
				onEndAnimation($currPage, $nextPage);
			}
		});

		$nextPage.addClass(inClass).on(animEndEventName, function () {
			$nextPage.off(animEndEventName);
			endNextPage = true;
			if (endCurrPage) {
				onEndAnimation($currPage, $nextPage);
			}
		});

		if (!support) {
			onEndAnimation($currPage, $nextPage);
		}

	}

	function onEndAnimation($outpage, $inpage) {
		endCurrPage = false;
		endNextPage = false;
		resetPage($outpage, $inpage);
		isAnimating = false;
		console.log("onendAnimation");
	}

	function resetPage($outpage, $inpage) {
		$outpage.attr('class', $outpage.data('originalClassList'));
		$inpage.attr('class', $inpage.data('originalClassList') + ' pt-page-current');
		console.log("resetPAge");
	}

	init();

	return {
		init: init,
		nextPage: nextPage,
	};

})();