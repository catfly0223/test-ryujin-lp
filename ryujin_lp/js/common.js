$(function(){/* ページ内リンクをスムーズに  */
  $('a[href^="#"]').click(function(){
    var speed = 300;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });
	
	
let $pagetop = $('.flbtn');

  $(window).on( 'scroll', function () {
    //スクロール位置を取得
    if ( $(this).scrollTop() < 1500 ) {
      $pagetop.css('opacity','0');
		
    } else {
      $pagetop.css('opacity','1');
    }
  });
// 現在の日付を取得
var currentDate = new Date();

// 当月の最終日を計算
var lastDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

// 日付を表示する要素を全て取得して、内容を設定
var lastDayElements = document.querySelectorAll(".last-day");
lastDayElements.forEach(function(element) {
    element.textContent = lastDayOfCurrentMonth.getFullYear() + "年" + (lastDayOfCurrentMonth.getMonth() + 1) + "月" + lastDayOfCurrentMonth.getDate() + "日まで";
});


// MonthlyImageChanger.js　毎月自動で画像を変更する

class MonthlyImageChanger {
	constructor(containerClass, imageClass) {
			this.containerClass = containerClass;
			this.imageClass = imageClass;

			// 画像のパスを格納する配列
			this.images = [
					"images/bf01.png",  // 1月の画像
					"images/bf02.png", // 2月の画像
					"images/bf03.png",    // 3月の画像
					"images/bf04.png",    // 4月の画像
					"images/bf05.png",      // 5月の画像
					"images/bf06.png",     // 6月の画像
					"images/bf07.png",     // 7月の画像
					"images/bf08.png",   // 8月の画像
					"images/bf09.png",// 9月の画像
					"images/bf10.png",  // 10月の画像
					"images/bf11.png", // 11月の画像
					"images/bf12.png"  // 12月の画像
			];
			
			// 現在の月を取得
			this.currentMonth = new Date().getMonth(); // 0から11の値で月を表す
			
			// 画像要素と画像コンテナを取得
			this.imgElements = document.querySelectorAll(`.${this.imageClass}`);
			this.containerElements = document.querySelectorAll(`.${this.containerClass}`);
			
			// 現在の月に応じた画像をすべての画像要素に表示
			this.imgElements.forEach((imgElement) => {
					imgElement.src = this.images[this.currentMonth];
			});
	}
}

// MonthlyImageChangerクラスのインスタンスを生成
const monthlyImageChanger = new MonthlyImageChanger("image-container", "monthly-image");





});




////////////////////////////////////////
//スライダー
////////////////////////////////////////
$(function(){
	var setElm = $('.loopSlider'),
	slideSpeed = 4000;

	setElm.each(function(){
		var self = $(this),
		selfWidth = self.innerWidth(),
		findUl = self.find('ul'),
		findLi = findUl.find('li'),
		listWidth = findLi.outerWidth(),
		listCount = findLi.length,
		loopWidth = listWidth * listCount;

		findUl.wrapAll('<div class="loopSliderWrap" />');
		var selfWrap = self.find('.loopSliderWrap');

		if(loopWidth > selfWidth){
			findUl.css({width:loopWidth}).clone().appendTo(selfWrap);

			selfWrap.css({width:loopWidth*2});

			function loopMove(){
				selfWrap.animate({left:'-' + (loopWidth) + 'px'},slideSpeed*listCount,'linear',function(){
					selfWrap.css({left:'0'});
					loopMove();
				});
			};
			loopMove();
		}
	});
});
