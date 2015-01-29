(function( $ ) {
	
	$.fn.switchContent = function (options) {
	  'use strict';

	  var highlight = $('.highlight'),
	      contentList = $('.content-headlines'),
	      contentListItems = $('.content-headlines li'),
	      firstContentItem = $('.content-headlines li:nth-child(1)'),
	      contentPreview = $('.content-preview'),
	      elCount = $('.content-headlines').children(':not(.highlight)').index(),
	      replacefirstContentItemCss = function(firstContentItem, prop, px) {
		  	return parseInt(firstContentItem.css(prop + '-top').replace('px', ''), px) + parseInt(firstContentItem.css(prop + '-top').replace('px', ''), px);
		  },
	      verticalPadding = replacefirstContentItemCss(firstContentItem, 'padding', 10),
	      verticalMargin = replacefirstContentItemCss(firstContentItem, 'margin', 10),
	      interval,
	      siblings,
	      totalHeight,
	      indexEl = 1,
	      i;
	  
	  function setEqualHeight() {
	    
	    if (contentPreview.height() < contentList.height()) {
	      contentPreview.height(contentList.height());
	    } else if ((contentList.height() < contentPreview.height()) && (contentList.height() > parseInt(contentPreview.css('min-height').replace('px', ''), 10))) {
	      contentPreview.height(contentList.height());
	    }
	    
	  }
	  
	  function setTimedSwitch() {
	  
	    interval = setInterval(function () {
	      if (($('.selected').prev().index() + 1) === elCount) {
	        firstContentItem.trigger('click');
	      } else {
	        $('.selected').next(':not(.highlight)').trigger('click');
	      }
	    }, 3000);
	  
	  }
	  
	  function clickItem() {
	  
	    contentListItems.on('click', function () {
	  
	      contentListItems.removeClass('selected');
	      $(this).addClass('selected');
	  
	      siblings = $(this).prevAll();
	      totalHeight = 0;
	  
	      /* this loop calculates the height of individual elements, including margins/padding */
	      for (i = 0; i < siblings.length; i += 1) {
	          totalHeight += $(siblings[i]).height();
	          totalHeight += verticalPadding;
	          totalHeight += verticalMargin;
	      }
	  
	      /* this moves the highlight vertically the distance calculated in the previous loop
	         and also corrects the height of the highlight to match the current selection */
	      highlight.css({
	        top: totalHeight,
	        height: $(this).height() + verticalPadding
	      });
	  
	      indexEl = $(this).index() + 1;
	  
	      $('.content-content:nth-child(' + indexEl + ')').siblings().removeClass('top-content');
	      $('.content-content:nth-child(' + indexEl + ')').addClass('top-content');
	  
	      clearInterval(interval);
	      setTimedSwitch();
	  
	    });
	  
	  }
	  
	  function resizeWindow() {
	  
	    $(window).resize(function () {
	  
	      clearInterval(interval);
	      setTimeout(function () {
	        $('.selected').trigger('click');
	      }, 1000 );
	  
	      setEqualHeight();
	  
	    }); 
	  
	  }
	  
	  clickItem();
	  resizeWindow();
	  setTimeout(function () {
	      setEqualHeight();
	  }, 500);
	  $('.selected').trigger('click');
	  
	};
}( jQuery ));