/*
	1. 리스트 높이가 유동적일 때 교차해서 정렬되도록 하는 코드
	2. 리스트의 너비가 같을 때, 리스트가 display:inline-block으로 선언되어있을 때 기준으로 함
*/

var deviceCheck = (function(){
	var _init = function(){
		wWidth = $(window).outerWidth() + 18;		

		if(wWidth < 760) {
			deviceKind = "mobile";
		}else if(wWidth > 1279){
			deviceKind = "desktop";
		}else{
			deviceKind = "tablet";
		}

		return deviceKind;
	};

	return {
		init:_init
	}
})();

var changeHeightList = (function($){
	var $ele,				// 리스트 셀렉터
		option = {},		// 리스트 옵션 객체형태로 전달받기	
		col,				// 리스트 열의 개수
		lHeight = [],		// 리스트 높이는 배열형태로 미리 저장해둠
		lWidth,
		liMarginBottom,
		liMarginLeft,
		liLength,
		deviceCheckVal;				

	var _init = function(ele, userOption){
		$ele = ele.find("li"),						
		option = userOption,			
		col = option.col;
		row = parseInt($ele.length/col),
		liLength = $ele.length;

		deviceKindVal = deviceCheck.init();	

		changeHeightListFunc();

		$(window).on("resize", function(){
			changeHeightListFunc();			
		});
	};

	// 생성자
	function createInit(){
		for(var i=0; i<liLength; i++){
			lHeight[i] = {
				"height":0,
				"left":0,
				"top":0
			}
		}

		$ele.each(function(i){
			calPosition(i);
		});	

		moveList();
	}

	function calPosition(num){
		lHeight[num].height = $ele.eq(num).height();
		lHeight[num].left = (lWidth+liMarginLeft)*(num%col);

		if(col <= num){
			lHeight[num].top = lHeight[num-col].height+lHeight[num-col].top+liMarginBottom;
		}
		if(num == (liLength-1)){
			$ele.parent().css("height",lHeight[num].height+lHeight[num].top+liMarginBottom*2.5);
		}
	}

	function moveList(){
		$ele.each(function(i){
			TweenMax.to($(this), 0.3, {"x":lHeight[i].left, "y":lHeight[i].top, "ease":"Cubic.easeOut"});
		});
	}

	var changeHeightListFunc = function(){
		deviceKindVal = deviceCheck.init();		

		if(deviceKindVal != "mobile"){
			liMarginBottom = Number($ele.css("marginBottom").split("px")[0]);
			lWidth = $ele.width(),
			liMarginLeft = parseInt(($ele.parent().width()-lWidth*col)/(col-1));

			createInit();			
		}else{
			TweenMax.set($ele, {"clearProps":"all"});
		}	
	};

	return {
		init:_init
	}
})(jQuery);