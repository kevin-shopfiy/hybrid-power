jQuery(document).ready(function ($) {
   'use strict';
      if (NTsettingspr.recently_viewed && typeof(Storage) !== "undefined") {
		   var ls = localStorage.getItem('nt_recent');
			    if(ls != null){ 
			      var arrls = ls.split(',');
			      //console.log(arrls)
			      var index = arrls.indexOf('id:'+NTsettingspr.ProductID);
			      //console.log('index: '+index)
					if (index > -1) { arrls.splice(index, 1) }
			         if(arrls.length > 0){ $("#recently-viewed-products").show() }
			         var arr_list = arrls.toString();
			         var uri = arr_list.replace(/,/g, ' OR ');
			         var res = encodeURI(uri);
			         //console.log(arr_list)
			         jQuery.ajax({
			           url: '/search?view=nathan&type=product&q='+res,
			           dataType: 'html',
			           type: 'GET',
			           success: function(responsive) {
			             //console.log(responsive);
			              $('#recently_wrap').html(responsive).addClass('jas-carousel');
			           },
			           error: function(data) {
			             console.log('ajax error');
			           },
			           complete: function() {
			            $( '#recently_wrap.jas-carousel' ).not( '.slick-initialized' ).slick();
			            setTimeout(function(){ $('#recently-viewed-products').addClass('disable_loader'); }, 300);
			             if( $('#recently_wrap').hasClass('jas_section_eqh') ) {
			                  setTimeout(function(){ elessiShopifyPre.resizeElements(); }, 300);
			               }
			             elessiShopify.initCountdown();
			              //currency
			              if (nathan_settings.show_multiple_currencies && cookieCurrency !== null) {
			                 Currency.convertAll(nathan_settings.shop_currency, cookieCurrency, '#recently_wrap span.money');
			               }
			              //product review
			              if ((typeof SPR !== 'undefined' ) && nathan_settings.productreviews && $(".spr-badge").length > 0 ) {
			                return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
			               }
			           }
			         }); 
			    }else{
			      var arrls = new Array();
			    }
			    var elment = 'id:'+NTsettingspr.ProductID;
			    if(arrls.indexOf(elment)< 0 ){
			      if(arrls.length > 20){arrls.pop();}
			      arrls.unshift(elment);
			      localStorage.setItem('nt_recent', arrls.toString());
			    }
		}
		if (NTsettingspr.related_id && typeof(Storage) !== "undefined") {
           elessiShopify.search_true('#related_nt',NTsettingspr.ProductID,'nathan_related');
		}
		// tag instagram
      if(NTsettingspr.hashtag !== 'none') {
	       var tag = NTsettingspr.hashtag,
	         limit = '12',
	         target = '_self',
	         user_name = tag,
	         ul_ins = $(".instagram-pics");
	       jQuery.ajax({
	         url: 'https://api.teathemes.net/instagram?username='+user_name+'&hash=true',
	         dataType: 'json',
	         type: 'GET',
	         success: function(responsive) {
	           //console.log(responsive);
	           var html = '',
	               data = responsive.entry_data.ProfilePage[0].user.media.nodes;
	           jQuery.each(data,function(index,element){
	              if(index >= limit ) return 0;
                  var img_url_150 = element.thumbnail_resources[0].src,
	              img_url_240 = element.thumbnail_resources[1].src,
	              img_url_320 = element.thumbnail_resources[2].src,
	              img_url_480 = element.thumbnail_resources[3].src,
	              img_url_640 = element.thumbnail_resources[4].src;
	              html += '<div class="item pr fl"><a class="db pr oh" href="//instagram.com/p/'+element.code+'" target="'+target+'"><img src="'+img_url_150+'" data-src="'+img_url_150+'" data-sizes="auto" data-srcset="'+img_url_150+' 150w,'+img_url_240+' 240w,'+img_url_320+' 320w,'+img_url_480+' 480w,'+img_url_640+' 640w" class="w__100 lazyload" alt="'+user_name+'"><div class="jas-wrap-lazy"></div><div class="info pa tc flex ts__03 center-xs middle-xs"><span class="pr cw mgr10"><i class="fa fa-heart-o mr__5"></i>'+element.likes.count+'</span><span class="pr cw"><i class="fa fa-comments-o mr__5"></i>'+element.comments.count+'</span></div></a></div>';
	            });
	           ul_ins.html(html);
	           setTimeout(function(){ $('.instagram.product-extra').addClass('disable_loader'); }, 300);
	         },
	         error: function(data) {
	           console.log('ajax error');
	         }
	       }); 
	      } else if (NTsettingspr.username !== 'none') {
	       var tag = NTsettingspr.username,
	         limit = '12',
	         target = '_self',
	         user_name = tag,
	         ul_ins = $(".instagram-pics");
	       jQuery.ajax({
	         url: "https://api.teathemes.net/instagram?username=" + user_name,
	         dataType: 'json',
	         type: 'GET',
	         success: function(responsive) {
	           //console.log(responsive);
	           var html = '',
	               data = responsive.entry_data.ProfilePage[0].user.media.nodes;
	           jQuery.each(data,function(index,element){
	              if(index >= limit ) return 0;
                  var img_url_150 = element.thumbnail_resources[0].src,
	              img_url_240 = element.thumbnail_resources[1].src,
	              img_url_320 = element.thumbnail_resources[2].src,
	              img_url_480 = element.thumbnail_resources[3].src,
	              img_url_640 = element.thumbnail_resources[4].src;
	              html += '<div class="item pr fl"><a class="db pr oh" href="//instagram.com/p/'+element.code+'" target="'+target+'"><img src="'+img_url_150+'" data-src="'+img_url_150+'" data-sizes="auto" data-srcset="'+img_url_150+' 150w,'+img_url_240+' 240w,'+img_url_320+' 320w,'+img_url_480+' 480w,'+img_url_640+' 640w" class="w__100 lazyload" alt="'+user_name+'"><div class="jas-wrap-lazy"></div><div class="info pa tc flex ts__03 center-xs middle-xs"><span class="pr cw mgr10"><i class="fa fa-heart-o mr__5"></i>'+element.likes.count+'</span><span class="pr cw"><i class="fa fa-comments-o mr__5"></i>'+element.comments.count+'</span></div></a></div>';
	            });
	           ul_ins.html(html);
	           setTimeout(function(){ $('.instagram.product-extra').addClass('disable_loader'); }, 300);
	         },
	         error: function(data) {
	           console.log('ajax error');
	         }
	       }); 
	      } else if (NTsettingspr.access_token !== 'none') {
	       var user_name = NTsettingspr.access_token,
	         limit = '12',
	         target = '_self',
	         ul_ins = $(".instagram-pics");
	       jQuery.ajax({
	         url: "https://api.instagram.com/v1/users/self/media/recent/?access_token="+user_name+"&count="+limit,
             type: 'GET',
             dataType: "jsonp",
             success: function(response) {
               //console.log(response);
               var data = response.data,
                   html = '',
                   img_url = null;
               jQuery.each(data,function(index,element){
                 //if(index >= limit ) return 0;
                 var img_url_150 = element.images.thumbnail.url,
                     img_url_320 = element.images.low_resolution.url,
                     img_url_640 = element.images.standard_resolution.url;
	              html += '<div class="item pr fl"><a class="db pr oh" href="'+element.link+'" target="'+target+'"><img src="'+img_url_150+'" data-src="'+img_url_150+'" data-sizes="auto" data-srcset="'+img_url_150+' 150w,'+img_url_320+' 320w,'+img_url_640+' 640w" class="w__100 lazyload" alt="'+user_name+'"><div class="jas-wrap-lazy"></div><div class="info pa tc flex ts__03 center-xs middle-xs"><span class="pr cw mgr10"><i class="fa fa-heart-o mr__5"></i>'+element.likes.count+'</span><span class="pr cw"><i class="fa fa-comments-o mr__5"></i>'+element.comments.count+'</span></div></a></div>';	            
	          });
	           ul_ins.html(html);
	           setTimeout(function(){ $('.instagram.product-extra').addClass('disable_loader'); }, 300);
	         },
	         error: function(data) {
	           console.log('ajax error');
	         }
	      }); 
	   }

	   // 360 video 
	   if (NTsettingspr.ThreeSixty) {
		   $('.threed-id-'+NTsettingspr.ProductID).ThreeSixty({
	          totalFrames: NTsettingspr.totalFrames,
	          endFrame: NTsettingspr.endFrame,
	          currentFrame: 1, 
	          imgList: '.threed-view-images', 
	          progress: '.spinner',
	          imgArray: NTsettingspr.imgArray,
	          height: NTsettingspr.height,
	          width: NTsettingspr.width,
	          responsive: true,
	          navigation: true
	      });
		}
});