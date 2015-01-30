(function( $ ) {

	$.fn.switchContent = function (options) {
	  'use strict';

	  var highlight = $('.highlight'),
	  	  prefix = '.content-switcher-',	
	      contentList = $(prefix + 'headlines'),
	      contentListItems = $(prefix + 'headlines li'),
	      firstContentItem = $(prefix + 'headlines li:nth-child(1)'),
	      contentPreview = $(prefix + 'preview'),
	      elCount = $(prefix + 'headlines').children(':not(.highlight)').index(),
	      replaceFirstContentItemCss = function(firstContentItem, prop, px) {
		  	return parseInt(firstContentItem.css(prop + '-top').replace('px', ''), px) + parseInt(firstContentItem.css(prop + '-bottom').replace('px', ''), px);
		  },
	      verticalPadding = replaceFirstContentItemCss(firstContentItem, 'padding', 10),
	      verticalMargin = replaceFirstContentItemCss(firstContentItem, 'margin', 10),
	      interval,
	      siblings,
	      totalHeight,
	      indexEl = 1,
	      i;
	  
	  function setEqualHeight() {
	    var contentListHeight = contentList.height(),
	    	contentPreviewHeight = contentPreview.height();

	    if (contentPreviewHeight < contentListHeight) {
	      contentPreview.height(contentListHeight);
	    } else if ((contentListHeight < contentPreviewHeight) && (contentListHeight > parseInt(contentPreview.css('min-height').replace('px', ''), 10))) {
	      contentPreview.height(contentListHeight);
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
	  
	      $(prefix + 'content:nth-child(' + indexEl + ')').siblings().removeClass('top-content');
	      $(prefix + 'content:nth-child(' + indexEl + ')').addClass('top-content');
	  
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