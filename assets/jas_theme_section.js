var geckoShopify;
(function( $ ) {
   "use strict";
   geckoShopify = (function() {
   var geckoTheme = {
         popupEffect: 'mfp-move-horizontal',
         shopLoadMoreBtn : '.btn-products-load-more.load-on-scroll',
         supports_html5_storage: false,
         ajaxLinks: '.widget_product_categories a, .jas_ajaxFilter a, .jas-pagination-ajax a, .nav_filters a, .widget_product_tag_cloud a'
   };
   return {
      init: function() {
         this.initCarousel();
         this.initMasonry();
         this.shopMasonry();
         this.initSearchForm();
         this.searchDropdown();
         this.ajaxSearch();
         this.initMegaMenu();
         this.initDropdownMenu();
         this.initPushMenu();
         this.initRTLMenu();
         this.initStickyMenu();
         this.initfooterMenu();
         this.initQuickView();
         this.quickShop();
         this.parallax();
         this.resizeElements();
         this.AJAXAddToCart();
         this.AJAXFormAddToCart();
         this.AJAXRemoveFromCart();
         this.initMiniCart();
         this.stickyFooter();
         this.ajaxFilters();
         this.productsLoadMore();
         this.productsTabs();
         this.productsjasTabs();
         this.promoPopup();
         this.cookiesPopup();
         this.initMultiScroll();
         this.initCountdown();
         this.initCountdown_page();
         this.wcQuantityAdjust();
         this.wcExtraContent();
         this.backToTop();
         this.initMagnificPopup();
         this.initCategoryFilter();
         this.wcInitPopupVideo();
         this.product360Button();
         this.wishList();
         this.loginWishlist();
         this.removeWishlist();
         this.catelog_mode();
         //this.wcLiveSearch();
         this.swatchesOnGrid();
         this.swatchesOnBGGrid();
         this.productImages();
         //this.wcStickyAddtocart();
         //this.customThirdParties();
         this.wcPopupAddtocart();
         this.shopifyWrappTable();
         this.fullHeightRow();
         this.initVideoBackgrounds();
         this.jas_map();
         this.ajaxchimp();
         this.spInitSwitchLayout();
         this.spInitSidebarFilter();
         this.simpleDropdown();
         this.spAccordion();
         this.spStickySidebar();
         this.categoriesAccordion();
         this.nanoScroller();
         this.save_note();
         this.checkoutIndicator();
         this.favicon_counter(gecko_settings.cart_count);
         $(window).resize();
        $('body').addClass('document-ready');
      },    

      // Check is mobile
      isMobile : function() {
         return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
      },

      // Init slick carousel
      initCarousel : function() {
         $( '.jas-carousel' ).not( '.slick-initialized' ).slick();
      },

       // Categories masonry
      shopMasonry: function() {
         if (typeof($.fn.isotope) == 'undefined' || typeof($.fn.imagesLoaded) == 'undefined') return;
          // Categories masonry
          $(window).resize(function() {
            $(".categories-masonry").each(function (index) {
              var $el = $(this);
              var colWidth = ( $el.hasClass( 'categories-style-masonry' ) )  ? '.jas-item-category' : '.jas-col-md-3.jas-item-category' ;
              $el.imagesLoaded().done( function(instance) {
                  setTimeout(function(){
                     $el.isotope({
                         resizable: false,
                         isOriginLeft: ! $('body').hasClass('rtl'),
                         layoutMode: 'packery',
                         packery: {
                             gutter: 0,
                             columnWidth: colWidth
                         },
                         itemSelector: '.jas-item-category',
                         // masonry: {
                             // gutter: 0
                         // }
                     });
                     
                  }, 500);
                  // setTimeout(function(){
                  //    $el.isotope('layout');
                  // }, 2500);
              });
            });
          });
      },

      // Init masonry layout
      initMasonry : function() {
         if (typeof($.fn.isotope) == 'undefined' || typeof($.fn.imagesLoaded) == 'undefined') return;
         var el = $( '.jas-masonry' );
       
         el.each( function( i, val ) {
            var _option = $( this ).data( 'masonry' );
              //console.log(_option)
            if ( _option !== undefined ) {
               var _selector = _option.selector,
                  _width    = _option.columnWidth,
                  _layout   = _option.layoutMode;

               $( this ).imagesLoaded( function() {
                  $( val ).isotope( {
                     layoutMode : _layout,
                     isOriginLeft: ! $('body').hasClass('rtl'),
                     itemSelector: _selector,
                     percentPosition: true,
                     masonry: {
                        columnWidth: _width
                     }
                  } );
               });

               $( '.jas-filter a' ).click( function() {
                  var selector = $( this ).data( 'filter' ),
                     parent   = $( this ).parents( '.jas-filter' );

                  $( val ).isotope({ filter: selector });

                  // don't proceed if already selected
                  if ( $( this ).hasClass( 'selected' ) ) {
                     return false;
                  }
                  parent.find( '.selected' ).removeClass( 'selected' );
                  $( this ).addClass( 'selected' );

                  return false;
               });
            }
         });
      },
      
      //  Load more button for products
      productsLoadMore: function() {
         var process = false, intervalID;
          $('.jas-products-element').each(function() {
              var $this = $(this),
                  // cache = [],
                  inner = $this.find('.jas-products-holder');

              if( inner.hasClass('jas-more-btn') ) return;

              // cache[1] = {
              //     items: inner.html(),
              //     status: 'have-posts'
              // };

              var body = $('body'),
                  btnWrap = $this.find('.products-footer'),
                  scrollTop,
                  offset;
          });
         geckoShopify.clickOnScrollButton(geckoTheme.shopLoadMoreBtn, false);
            $(document).off('click', '.btn-products-load-more').on('click', '.btn-products-load-more', function(e) {
            e.preventDefault();
               if (process) return;
               process = true;
            var $this = $(this),
                holder = $this.parent().siblings('.jas-products-holder'),
                jas_ajaxurl = $(this).attr('href');
            loadProducts(holder, jas_ajaxurl, $this, function(data) {
                data = jQuery(data);
                var html = data.find('#jas_data_products').html(),
                    result = data.find('#shopify_result_count').html(),
                    data_status = data.find('#jas_data_arrow').attr("data-status"),
                    data_load_more = data.find('#jas_section_next').attr("href");
                if( holder.hasClass('jas-masonry') ) {
                    console.log('asdas')
                    isotopeAppend(holder, html);
                } else {
                     holder.append(html);
                }
                holder.imagesLoaded().progress(function() {
                  geckoShopify.clickOnScrollButton(geckoTheme.shopLoadMoreBtn, true);
               });
                if ($(".sp_result_html").length > 0) {
                        $('.sp_result_html').text(result);
                     }
                if( data_status == 'have-posts' ) {
                    $this.attr("href", data_load_more);
                    process = false;
                } else {
                   $this.hide().remove();
                }
            });
         });

          var loadProducts = function(holder, ajaxurl, btn, callback) {

              holder.addClass('loading').parent().addClass('element-loading');
              btn.addClass('loading');

              $.ajax({
                  dataType: "html",
                  type: 'GET',
                  url: ajaxurl,
                  success: function(data) {
                      callback( data );
                  },
                  error: function(data) {
                      console.log('ajax error');
                  },
                  complete: function() {
                     if( holder.hasClass('jas_section_eqh') ) {
                        geckoShopify.resizeElements();
                     }
                     //countDown
                     geckoShopify.initCountdown();
                     holder.removeClass('loading').parent().removeClass('element-loading');
                     btn.removeClass('loading');
                      //currency
                      var $cookieCurrency = gl_Currency.cookie.read();
                     if (gecko_settings.show_multiple_currencies && $cookieCurrency !== null) {
                       Currency.convertAll(shopCurrency, $cookieCurrency, '.jas-products-holder span.money');
                     }
                     //product review
                     if (gecko_settings.productreviews && $(".spr-badge").length > 0 ) {
                      return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
                     }
                     process = false;
                  },
              });
          };

          var isotopeAppend = function(el, items) {
              // initialize Masonry after all images have loaded
              var items = $(items);
              //console.log(items);
              el.append(items).isotope( 'appended', items );
              el.isotope('layout');
              setTimeout(function() {
                  el.isotope('layout');
              }, 100);
              el.imagesLoaded().progress(function() {
                  el.isotope('layout');
              });
          };

      },
      //  Helper function that make btn click when you scroll page to it
      clickOnScrollButton: function( btnClass, destroy ) {
          if( typeof $.waypoints != 'function' ) return;
          
          var $btn = $(btnClass);
          if( destroy ) {
              $btn.waypoint('destroy');
          }

          $btn.waypoint(function(){
              $btn.trigger('click');
          }, { offset: '100%' });
      },
      
      //Products tabs element AJAX loading
      productsjasTabs: function() {
         if( ! $('body').hasClass('template-index') ) return;
        $("body").on("click", "ul.jas_tta-tabs-list li a", function(b) {
            b.preventDefault();
            var c = $(this)
              , d = c.closest(".jas_tta-container")
              ,siblings = d.siblings('.jas_tta-panels-container')
              ,holder = siblings.find('.jas_section_eqh')
              , e = d.find("ul.jas_tta-tabs-list");
            e.find("li").removeClass("jas_active"),
            d.find(".jas_tta-panel.not_ajax").removeClass("jas_active"),
            c.closest("li").addClass("jas_active"),
            d.find(c.attr("href")).addClass("jas_active")
        });
      },
      
      productsTabs: function() {
         if( ! $('body').hasClass('template-index') ) return;
          $('.jas_tta-container').each(function() {
              var $this = $(this),
                  $inner = $this.find('.jas_tta-panel-body'),
                  $panel = $this.find('.jas_tta-panel'),
                  $holder = $this.find('.jas_tta-tabs-container');
              $this.find('.products_tabs_ajax li').on('click', function(e) {
                  e.preventDefault();
                  var $this = $(this),
                      ajaxurl = $this.data('atts'),
                      index = $this.index();
                  loadTab(ajaxurl, index, $holder,$panel, $inner, $this, function(data) {
                      $inner.html(data);
                      if(ajaxurl.indexOf('img_size_true') != -1) {
                        setTimeout(function(){geckoShopify.resizeElements(); }, 400);
                     }
                     if(ajaxurl.indexOf('sidetoshow_') != -1) {
                        geckoShopify.initCarousel();
                     } else {
                        geckoShopify.productsLoadMore();
                     }
                  });

              });

          });

          var loadTab = function(ajaxurl, index,$holder,$panel, holder, btn, callback) {

              btn.parent().find('.active-tab-title').removeClass('active-tab-title');
              btn.addClass('active-tab-title');
              $panel.addClass('loading');
              $holder.addClass('element-loading');
              btn.addClass('loading');

              $.ajax({
                  dataType: "html",
                  type: 'GET',
                  url: ajaxurl,
                  success: function(data) {
                      callback( data );
                  },
                  error: function(data) {
                      console.log('ajax error');
                  },
                  complete: function() {
                     //countDown
                     geckoShopify.initCountdown();
//                      btn.removeClass('loading');
//                      $panel.removeClass('loading');
//                      $holder.removeClass('element-loading');
                     var $cookieCurrency = gl_Currency.cookie.read();
                     if (gecko_settings.show_multiple_currencies && $cookieCurrency !== null) {
                       Currency.convertAll(shopCurrency, $cookieCurrency, '.type_jas_fea_coll_tab span.money');
                     }
                     //product review
                     if ($(".spr-badge").length > 0 && gecko_settings.productreviews ) {
                      return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
                     }
                  },
              }).done(function() {
                setTimeout(function(){
                  btn.removeClass('loading');
                  $panel.removeClass('loading');
                  $holder.removeClass('element-loading');
                }, 800);
              });
          };
      },

       jas_currency: function() {
         if (gecko_settings.show_multiple_currencies && gl_Currency.cookie.read() !== null) {
         Currency.convertAll(shopCurrency, gl_Currency.cookie.read(), 'form[action="/cart/add"] span.money');
         }
       },
       jas_productreviews: function() {
          if(theme.jas_productreviews && $(".spr-badge").length > 0 ) {
              $.getScript(window.location.protocol + "//productreviews.shopifycdn.com/assets/v4/spr.js");
          }
       },

      // Initialize search form in header.
      initSearchForm : function() {
         if( gecko_settings.style_search != 'full-screen' ) return;
         var HS = $( '.header__search' );

         // Open search form
         $( '.sf-open' ).on( 'click', function( e ) {
            e.preventDefault();
            HS.fadeIn();
            HS.find( 'input[type="text"]' ).focus();
         });
         $( '#sf-close' ).on( 'click', function(e) {
            e.preventDefault();
            HS.fadeOut();
         });
      },

      searchDropdown: function() {
         if( gecko_settings.style_search != 'dropdown' ) return;
          var body = $('body'),
              searchWrapper = $('.wrapper-search-dropdown');
          body.on('click', '.gecko-search-dropdown>i', function(e) {
              e.preventDefault();
              if( isOpened() ) {
                  closeWidget();
              } else {
                  setTimeout( function() {
                      openWidget();
                  }, 10);
              }
          })


          body.on("click", ".gecko-close-search, #jas-header, #jas-content", function(event) {
              if ( ! $(event.target).is('.gecko-close-search') && $(event.target).closest(".wrapper-search-dropdown").length ) return;

              if( isOpened() ) {
                  closeWidget();
              }
          });

          var closeWidget = function() {
              $('body').removeClass('gecko-search-opened');
              searchWrapper.removeClass('search-overlap');
          };
          var closeByEsc = function( e ) {
              if (e.keyCode === 27) {
                  closeWidget();
                  body.unbind('keyup', closeByEsc);
              }
          };

          var openWidget = function() {
               // Close by esc
               body.bind('keyup', closeByEsc);

              $('body').addClass('gecko-search-opened');
              setTimeout(function() {
                  searchWrapper.find('input[type="text"]').focus();
                  // $(window).one('scroll', function() {
                  //     if( isOpened() ) {
                  //         closeWidget();
                  //     }
                  // });
              }, 300);
              searchWrapper.addClass('search-overlap');

          };

          var isOpened = function() {
              return $('body').hasClass('gecko-search-opened');
          };
      },

      ajaxSearch: function() {
         if( gecko_settings.ajax_search == 'no' ) return;
         var currentAjaxRequest = null,
            search_form = $('form.gecko-ajax-search');
         search_form.each(function() {
            var input = $(this).find('input[name="q"]');
            input.attr('autocomplete', 'off').bind('keyup', function() {
              $('.autocomplete-suggestions').html('').hide();
               var term = $(this).val(),
                  form = $(this).closest('form');
               if (term.trim() == '') {
                   $('.autocomplete-suggestions').html('').hide();
               }else{
                  if( gecko_settings.ajax_search_product == 'yes' ) {
                     var searchURL = '/search?type=product&q=' + term;
                  } else {
                     var searchURL = '/search?q=' + term;
                  }
                  form.addClass('search-loading');
                  if (currentAjaxRequest != null) currentAjaxRequest.abort();
                  currentAjaxRequest = jQuery.get(searchURL + '&view=json', function(data) {
                     $('.autocomplete-suggestions').html(data);
                  }).always(function() {
                     setTimeout(function(){
                       $('.autocomplete-suggestions').show();
                       form.removeClass('search-loading');  
                     }, 200);
                  });
               }
            });
         });
         $('body').bind('click', function(){
            $('.autocomplete-suggestions').hide();
            $('form.gecko-ajax-search').removeClass('search-loading');
        });
      },

      // Init push on header
      initPushMenu : function() {
         $( 'a.jas-push-menu-btn' ).on( 'click', function (e) {
            e.preventDefault();
            $( 'body' ).addClass( 'menu-opened' );
            $( '.mask-overlay, .close-menu' ).on( 'click', function() {
               $( 'body' ).removeClass( 'menu-opened' );
            });
         });
      },

      // Accordion mobile menu
      initDropdownMenu : function() {
         $( 'body' ).on('click','.holderr',function(e) {
            e.preventDefault();
            var el = $( this ).closest( 'li' );
            if ( el.hasClass( 'open' ) ) {
               el.removeClass( 'open' );
               el.find( 'li' ).removeClass( 'open' );
               //el.find( 'ul' ).slideUp();
            } else {
               el.addClass( 'open' );
               //el.children( 'ul' ).slideDown();
               //el.siblings( 'li' ).children( 'ul' ).slideUp();
               el.siblings( 'li' ).removeClass( 'open' );
               el.siblings( 'li' ).find( 'li' ).removeClass( 'open' );
               //el.siblings( 'li' ).find( 'ul' ).slideUp();
            }
         });
         $( 'body' ).on('click','.black_menu>a',function(e) {
            e.preventDefault();
            var el = $( this ).closest( 'li.open' );
            el.removeClass( 'open' );
         });
         $(".jas-canvas-menu").on('click', '.jas-mobile-tabs h3', function() {
           if( $(this).hasClass('active') ) return;
           var menuName = $(this).data('tab');
           $(this).parent().find('.active').removeClass('active');
           $(this).addClass('active');
           $('.jas_ui_menu').removeClass('active');
           $('#' + menuName).addClass('active');
       });
      },

      // Accordion mobile footer
      initfooterMenu : function() {
         if( $(window).width() >= 768 && ! $( "#jas_footer" ).hasClass( "footer__collapsed" )) return;
         $( 'body' ).on('click','.footer__collapsed .widget-title',function(e) {
            e.preventDefault();
            var el = $( this ).closest( 'aside' );
            if ( el.hasClass( 'footer-quick-links__collapsed' ) ) {
               el.removeClass( 'footer-quick-links__collapsed' );
            } else {
               //$( '#jas-footer aside' ).removeClass( 'footer-quick-links__collapsed' );
               el.addClass( 'footer-quick-links__collapsed' );
            }
         });
      },

      // Sticky menu
      initStickyMenu : function() {
         if( gecko_settings.header_sticky == 'no' ) return;
         var header          = document.getElementById( 'jas-header' ),
            headerMid       = document.getElementsByClassName( 'header__mid' )[0],
            headerMidHeight = $( '.header__mid' ).outerHeight(),
            headerTopHeight = $( '.header__top' ).outerHeight(),
            headerHeight    = headerMidHeight + headerTopHeight,
            adminBar        = $( '.admin-bar' ).length ? $( '#wpadminbar' ).height() : 0;
         
         if ( gecko_settings != undefined && gecko_settings[ 'header_sticky' ] ) {
               if ( headerMid == undefined ) return;
               header.setAttribute( 'style', 'height:' + headerHeight + 'px' );

            $( window ).scroll( function() {
               if ( $( this ).scrollTop() > headerTopHeight  + 40 ) {
                  header.classList.add( 'header-sticky' );
                  //headerMid.setAttribute( 'style', 'position: fixed;top:' + adminBar + 'px' );
               } else {
                  header.classList.remove( 'header-sticky' );
                  //headerMid.removeAttribute( 'style' );
               }
            });
         }
         // if ( $( '.header__transparent' ).length > 0 ) {
         //    var headerTransparent = document.getElementsByClassName( 'header__transparent' )[0];

         //    headerTransparent.setAttribute( 'style', 'top:' + ( headerTopHeight + adminBar ) + 'px' );
         // }
      },

      // Init right to left menu
      initRTLMenu : function() {
         var menu = $( '.sub-menu li' ), subMenu = menu.find( ' > .sub-menu');
         menu.on( 'mouseenter', function () {
            if ( subMenu.length ) {
               if ( subMenu.outerWidth() > ( $( window ).outerWidth() - subMenu.offset().left ) ) {
                  subMenu.addClass( 'rtl-menu' );
               }
            }
         });
      },

      // Initialize WC quantity adjust.
      wcQuantityAdjust : function() {
         if ( ! String.prototype.getDecimals ) {
              String.prototype.getDecimals = function() {
                  var num = this,
                      match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                  if ( ! match ) {
                      return 0;
                  }
                  return Math.max( 0, ( match[1] ? match[1].length : 0 ) - ( match[2] ? +match[2] : 0 ) );
              }
          }


          $( document ).on( 'click', '.plus, .minus', function() {
              // Get values
              var $qty        = $( this ).closest( '.quantity' ).find( '.qty'),
                  currentVal  = parseFloat( $qty.val() ),
                  max         = parseFloat( $qty.attr( 'max' ) ),
                  min         = parseFloat( $qty.attr( 'min' ) ),
                  step        = $qty.attr( 'step' );

              // Format values
              if ( ! currentVal || currentVal === '' || currentVal === 'NaN' ) currentVal = 0;
              if ( max === '' || max === 'NaN' ) max = '';
              if ( min === '' || min === 'NaN' ) min = 0;
              if ( step === 'any' || step === '' || step === undefined || parseFloat( step ) === 'NaN' ) step = 1;
              // Change the value
              if ( $( this ).is( '.plus' ) ) {
                  if ( max && ( currentVal >= max ) ) {
                      $qty.val( max );
                  } else {
                      $qty.val( ( currentVal + parseFloat( step )).toFixed( step.getDecimals() ) );
                  }
              } else {
                  if ( min && ( currentVal <= min ) ) {
                      $qty.val( min );
                  } else if ( currentVal > 0 ) {
                      $qty.val( ( currentVal - parseFloat( step )).toFixed( step.getDecimals() ) );
                  }
              }

              // Trigger change event
              $qty.trigger( 'change' );
          });
      },

      // Back to top button
      backToTop : function() {
         var el = $( '#jas-backtop' );
         $( window ).scroll(function() {
            if( $( this ).scrollTop() > $( window ).height() ) {
               el.show();
            } else {
               el.hide();
            }
         });
         el.click( function() {
            $( 'body,html' ).animate({
               scrollTop: 0
            }, 500);
            return false;
         });
      },

      // Init Magnific Popup
      initMagnificPopup : function() {
         if ( $( '.jas-magnific-image' ).length > 0 ) {
            $( '.jas-magnific-image' ).magnificPopup({
               type: 'image',
               image: {
                  verticalFit: true
               },
               callbacks: {
                  beforeOpen: function() {
                     $( '#jas-wrapper' ).after( '<div class="loader"><div class="loader-inner"></div></div>' );
                  },
                  open: function() {
                     $( '.loader' ).remove();
                  },
               }
            });
         }
      },

      // Product quick view
      initQuickView  : function() {
         $( 'body' ).on( 'click', '.open-quick-view', function(e) {
            var btn = $(this);
            $.ajax({
              beforeSend : function (){
                btn.addClass('loading');
              },
              url: $(this).attr('data-ajax'),
              success: function(data) {
                // alert(response)
                $.magnificPopup.open({
                  items: {
                    src: '<div class="mfp-with-anim popup-quick-view" id="content_quickview">' + data + '</div>', // can be a HTML string, jQuery object, or CSS selector
                    type: 'inline'
                  },
                  removalDelay: 500, //delay removal by X to allow out-animation
                  callbacks: {
                    beforeOpen: function() {
                      this.st.mainClass = 'mfp-move-horizontal';
                    },
                    open: function() {
                     $('.jas_section_eqh_quick').gecko_equlize({
                           child: ' .page_pr_img_size .jas-pr_metro-image-equal'
                       });
                      $('.product-images-slider_on').addClass('owl-carousel').slick({
                        rtl: $('body').hasClass('rtl'),
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        fade: true,
                        infinite: false
                      });
                       geckoShopify.initCountdown_page();
                      geckoShopify.simpleDropdown_qv();
                      setTimeout(function() {
                        jQuery(".gecko-scroll-quick").nanoScroller({
                          paneClass: "gecko-scroll-pane",
                          sliderClass: "gecko-scroll-slider",
                          contentClass: "gecko-scroll-content-quick",
                          preventPageScrolling: !1
                        });
                      }, 300);
                      var $cookieCurrency = gl_Currency.cookie.read();
                      if (gecko_settings.show_multiple_currencies && $cookieCurrency !== null) {
                          Currency.convertAll(shopCurrency, $cookieCurrency, '.product-quick-view span.money');
                        }
                      if (gecko_settings.productreviews && $(".spr-badge").length > 0 ) {
                         return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
                        }
                    },
                    close: function() {
                      $( '#content_quickview' ).empty();
                    }
                  },
                });
              },
              complete: function() {
                $( '.loader' ).remove();
                btn.removeClass('loading');
              }
            })
            return false; //for good measure
            e.preventDefault();
            e.stopPropagation();
       });
      },

      // QuickShop
      quickShop: function() {
         var btnSelector = '.btn-quick-shop';


         $(document).on('click', btnSelector, function( e ) {
              e.preventDefault();
              $('.jas-qs-shown.jas-qs-loaded .jas-qs-close').click();
              var $this = $(this),
                  $product = $this.parents('.product').first(),
                  $content = $product.find('.jas-qs-form'),
                  ajaxurl = $(this).attr('data-ajax'),
                  loadingClass = 'btn-loading';

              if( $this.hasClass(loadingClass) ) return;


              // Simply show quick shop form if it is already loaded with AJAX previously
              if( $product.hasClass('jas-qs-loaded') ) {
                  $product.addClass('jas-qs-shown');
                  return;
              }

              $this.addClass(loadingClass);
              $product.addClass('loading-qs');

              $.ajax({
                  url: ajaxurl,
                  dataType: 'html',
                  type: 'GET',
                  success: function(data) {
                     $content.append(data);

                  },
                  complete: function() {
                      $this.removeClass(loadingClass);
                      $product.removeClass('loading-qs');
                      $product.addClass('jas-qs-shown jas-qs-loaded');
                      geckoShopify.simpleDropdown_qs();
                      setTimeout(function() {
                     jQuery(".gecko-scroll-quick-shop").nanoScroller({
                       paneClass: "gecko-scroll-pane",
                       sliderClass: "gecko-scroll-slider",
                       contentClass: "gecko-scroll-content-quick-shop",
                       preventPageScrolling: !1
                     });
                   }, 300);
                      var $cookieCurrency = gl_Currency.cookie.read();
                      if (gecko_settings.show_multiple_currencies && $cookieCurrency !== null) {
                       Currency.convertAll(shopCurrency, $cookieCurrency, '.variations_form_qs span.money');
                     }
                  },
                  error: function() {
                     console.log('Quick Shop error')
                  },
              });

          })

          .on('click', '.jas-qs-close', function() {
              var $this = $(this),
                  $product = $this.parents('.product'),
                  $content = $product.find('.jas-qs-form');;

              $product.removeClass('jas-qs-shown jas-qs-loaded');
              $content.html('');
          });

         $( document.body ).on( 'added_to_cart', function() {
              $('.jas-qs-close').click();
         });

      },

      // catelog mode
      catelog_mode: function() {
         if( ! $('body').hasClass('catalog_mode_on') ) return;
         var body = $("body");
            var html = [
                '<div class="added-to-cart">',
                    '<h3>' + gecko_settings.catelog_title + '</h3>',
                    '<p>' + gecko_settings.catelog_info + '</p>',
                    '<p>' + gecko_settings.catelog_info_2 + '</p>',
                    '<a href="#" class="cate-close-popup button view-cart">' + gecko_settings.catelog_btn + '</a>',
                '</div>',
            ].join("");
            // Append new quantity selector then remove original
            $.magnificPopup.open({
                callbacks: {
                    beforeOpen: function() {
                        this.st.mainClass = geckoTheme.popupEffect + ' cart-popup-wrapper';
                    },
                },
                items: {
                    src: '<div id="login-wishlist" class="jas_login-wishlist white-popup popup-catelog_mode popup-added_to_cart">' + html + '</div>',
                    type: 'inline'
                }
            });

            $('.jas_login-wishlist').on('click', '.cate-close-popup', function(e) {
                e.preventDefault();
                $.magnificPopup.close();
            });
      },

      // Login before using wishlist
      loginWishlist: function() {
         if( !gecko_settings.wishlist ) return;
         var body = $("body");
         body.on('click', '.nitro_wishlist_login', function(event) {
            event.preventDefault();
            var $this = $(this);
            $this.parent().addClass("feid-in");
            var html = [
                '<div class="added-to-cart">',
                    '<p>' + gecko_settings.info_wishlist + '</p>',
                    '<a href="#" class="btn-style-link close-popup">' + gecko_settings.continue_shopping + '</a>',
                    '<a href="/account/login" class="button view-cart">' + gecko_settings.login + '</a>',
                '</div>',
            ].join("");
            // Append new quantity selector then remove original
            $.magnificPopup.open({
                callbacks: {
                    beforeOpen: function() {
                        this.st.mainClass = geckoTheme.popupEffect + ' cart-popup-wrapper';
                    },
                     close: function() {
                      $this.parent().removeClass("feid-in");
                     }
                },
                items: {
                    src: '<div id="login-wishlist" class="jas_login-wishlist white-popup add-to-cart-popup popup-added_to_cart">' + html + '</div>',
                    type: 'inline'
                }
            });

            $('.jas_login-wishlist').on('click', '.close-popup', function(e) {
                e.preventDefault();
                $.magnificPopup.close();
            });
          }); 
      },
      
      // Add wishlist
       wishList: function() {
         if( !gecko_settings.wishlist ) return;
          var body = $("body");
          body.on("click", ".jas_add_wishlist > a", function(event) {
            event.preventDefault();
            var $this = $(this),
               holder = $this.closest('.yith-wcwl-add-to-wishlist'),
               pr_this = holder.find('.jas_add_wishlist'),
               load = holder.find('.jas_adding_wishlist'),
               added = holder.find('.jas_addedbrowse_wishlist');
            pr_this.hide();
            load.show();
            $.ajax({
               url: 'https://nitro-wishlist.teathemes.net?shop='+ Shopify.shop,
               type: 'POST',
               cache: true,
               data: $this.data(),
               success: function(data,status) {
                  try{
                     data = $.parseJSON(data);
                  }
                  catch(ex){
                     //console.log(ex);
                  }
                  if(data.status == 'success' && status == 'success')
                  {
                     added.show();
                     load.hide();
                     pr_this.hide();
                     $('.jas_count_wishlist').html(function(i, val) { return val*1+1 });
                  }else{
                     load.hide();
                     pr_this.show();
                     console.log('Error: '+data.message);
                  }
               },
               error: function(data) {
                  load.hide();
                  pr_this.show();
                  if(data.status==404) {
                     alert('This feature is not available because there is no  Nitro Wishlist app installed. Please install Nitro Wishlist app first  when using Wishlist in Shop.');
                  } else {
                     console.log('Error: '+data.message);
                  }
               },
           });
         });
      },
      
      // Remove wishlist
      removeWishlist: function() {
         if( !gecko_settings.wishlist ) return;
         var body = $("body");
         body.on("click", ".remove_from_wishlist", function(event) {
            event.preventDefault();
            var $this = $(this),
               value = $(this).data('id');
            $.ajax({
              url: 'https://nitro-wishlist.teathemes.net?shop='+ Shopify.shop,
              type: 'POST',
               data: $this.data(),
               beforeSend: function(data){
                 $.blockUI({
                    message: null,
                    css: {
                      backgroundColor: '#fff',
                      opacity: 0.6
                    }
                  });
               },
               success: function(data,status) {
                  try{
                     data = $.parseJSON(data);
                  }
                  catch(ex){
                     //console.log(ex);
                  }
                  if(data.status == 'success' && status == 'success') {
                     $('.jas_count_wishlist').html(function(i, val) { return val*1-1 });
                     $("#yith-wcwl-row-" + value).remove();
                     var rowCount = $('.wishlist_table > tbody > tr').length;
                     if (rowCount < 1) {
                         $('.wishlist_table tbody').empty();
                         $('.wishlist_table tbody').append('<tr><td colspan="6" class="wishlist-empty tc">'+ gecko_settings.nowishlist +'</td>');
                     } 
                  } else {
                     console.log('Error: '+data.message);
                  }
               },
               error: function(data) {
                  $( '.loader' ).remove();
                  console.log('Error: '+data.message);
               },
               complete: function() {
                  setTimeout(function() {
                    $.unblockUI();
                  }, 200);
               }
            });
         });
      },
    
      // Extra content on single product ( Help & Shipping - Return )
      wcExtraContent : function() {
        if ( $( '.jas-wc-help' ).length > 0 ) {
           $('.jas-wc-help').magnificPopup({
               type: 'inline',
               tLoading: '<div class="loader"><div class="loader-inner"></div></div>',
               removalDelay: 500,
               callbacks: {
                 beforeOpen: function() {
                    this.st.mainClass = 'mfp-move-horizontal';
                 }
              }
            });
        }
      },

      // Init mini cart on header
      initMiniCart : function() {
         $( 'body' ).on( 'click', '.jas-sidebar-cart > a', function (e) {
            e.preventDefault();
            $( 'body' ).addClass( 'cart-opened' );
            $( '.mask-overlay, .close-cart' ).on( 'click', function() {
               $( 'body' ).removeClass( 'cart-opened' );
            });
         });
      },
      
      // Error functionality with AJAX
      onError: function(XMLHttpRequest, textStatus) {
        // Shopify returns a description of the error in XMLHttpRequest.responseText.
        // It is JSON.
        // Example: {"description":"The product 'Amelia - Small' is already sold out.","status":500,"message":"Cart Error"}
        var data = eval('(' + XMLHttpRequest.responseText + ')');
        alert(data.message + '(' + data.status  + '): ' + data.description);
      },

      // Add from cart functionality with AJAX
      AJAXFormAddToCart: function() {
          $( document ).on('click', '.ajax_form_cart', function(e) {
              e.preventDefault();
              var $this = $(this);
              $(this).attr('disabled', 'disabled').css('pointer-events', 'none').addClass('loading');
              $.ajax({
                  type: 'POST',
                  url: '/cart/add.js',
                  data: $this.closest('form').serialize(),
                  dataType: 'json',
                  success:function( cart ) {
                        $.get('/cart?view=json', function(data,status) {
                          /*optional stuff to do after success */
                          $('.widget_shopping_cart_content').html(data);
                        }).always(function() {
                           var subtotal = parseFloat($('.widget_shopping_cart_body').data('subtotal'));
                           $(".gecko-cart-subtotal >span").html(Shopify.formatMoney(subtotal, gecko_settings.moneyFormat));
                           $(".cartCount").html($('.widget_shopping_cart_body').data('count'));
                           geckoShopify.favicon_counter(parseInt($('.widget_shopping_cart_body').data('count')));
                           geckoShopify.nanoScroller();
                           var $cookieCurrency = gl_Currency.cookie.read();
                           if (gecko_settings.show_multiple_currencies && $cookieCurrency !== null) {
                              Currency.convertAll(shopCurrency, $cookieCurrency, '.widget_shopping_cart_content span.money');
                              Currency.convertAll(shopCurrency, $cookieCurrency, '.gecko-cart-subtotal  span.money');
                           }
                           geckoShopify.initAddToCart();
                           $this.removeAttr("disabled").css('pointer-events', 'auto').removeClass("loading");
                        });
                        
                  },
                  error: function(XMLHttpRequest, textStatus) {
                     $this.removeAttr("disabled").css('pointer-events', 'auto').removeClass("loading");
                    geckoShopify.onError(XMLHttpRequest, textStatus);
                  }
              });
          })
      },

      // Add to cart functionality with AJAX
      AJAXAddToCart: function() {
          $( document ).on('click', '.ajax_add_to_cart', function(e) {
              e.preventDefault();
              var $this = $(this),
                  variant_id = $this.data('pid');
              $this.addClass('loading');
               $this.parent().addClass('fix_jas_tt');
              $.ajax({
                  type: 'POST',
                  url: '/cart/add.js',
                  data: {quantity: 1, id:variant_id},
                  dataType: 'json',
                  success:function( cart ) {
                        $.get('/cart?view=json', function(data) {
                             /*optional stuff to do after success */
                             $('.widget_shopping_cart_content').html(data);
                           }).always(function() {
                              var subtotal = parseFloat($('.widget_shopping_cart_body').data('subtotal'));
                           $(".gecko-cart-subtotal >span").html(Shopify.formatMoney(subtotal, gecko_settings.moneyFormat));
                              $(".cartCount").html($('.widget_shopping_cart_body').data('count'));
                              geckoShopify.favicon_counter(parseInt($('.widget_shopping_cart_body').data('count')));
                              geckoShopify.nanoScroller();
                              var $cookieCurrency = gl_Currency.cookie.read();
                              if (gecko_settings.show_multiple_currencies && $cookieCurrency !== null) {
                               Currency.convertAll(shopCurrency, $cookieCurrency, '.widget_shopping_cart_content span.money');
                               Currency.convertAll(shopCurrency, $cookieCurrency, '.gecko-cart-subtotal  span.money');
                             }
                             geckoShopify.initAddToCart();
                             if (window.Shopify && Shopify.StorefrontExpressButtons && gecko_settings.use_additional_checkout_buttons) {
                                Shopify.StorefrontExpressButtons.initialize();
                              }
                             $this.removeAttr("disabled").css('pointer-events', 'auto').removeClass("loading");
                          });
                  },
                  error: function(XMLHttpRequest, textStatus) {
                    $this.removeClass("loading");
                    geckoShopify.onError(XMLHttpRequest, textStatus);
                  }
              });
          })
      },

      // Trigger add to cart button
      initAddToCart : function() {
           var timeoutNumber = 0;
           if( gecko_settings.add_to_cart_action == 'popup' ) {
               var html = [
                   '<div class="added-to-cart">',
                       '<p>' + gecko_settings.added_to_cart + '</p>',
                       '<a href="#" class="btn btn-style-link close-popup">' + gecko_settings.continue_shopping + '</a>',
                       '<a href="/cart" class="button view-cart">' + gecko_settings.view_cart + '</a>',
                   '</div>',
               ].join("");
               $.magnificPopup.open({
                   callbacks: {
                       beforeOpen: function() {
                           this.st.mainClass = geckoTheme.popupEffect + '  cart-popup-wrapper';
                       },
                   },
                   items: {
                       src: '<div class="white-popup add-to-cart-popup popup-added_to_cart">' + html + '</div>',
                       type: 'inline'
                   }
               });

               $('.white-popup').on('click', '.close-popup', function(e) {
                   e.preventDefault();
                   $.magnificPopup.close();
               });
            } else if( gecko_settings.add_to_cart_action == 'popup_upsell' ) {
               $.ajax({
                  url: '/cart/?view=upsell',
                  dataType: 'html',
                  type: 'GET',
                  beforeSend : function (){
                     $( 'body' ).addClass('cart__popup_opend');
                    $( '#jas-wrapper' ).after( '<div class="loader"><div class="loader-inner"></div></div>' );
                  },
                  success: function(data) {
                    // Open directly via API
                    $.magnificPopup.open({
                      items: {
                        src: '<div class="mfp-with-anim product-quickview popup-quick-view cart__popup cart__popup_upsell pr"><div id="content_cart__popup_nt">' + data + '</div></div>',
                        type: 'inline'
                      },
                      removalDelay: 500, //delay removal by X to allow out-animation
                      callbacks: {
                        beforeOpen: function() {
                          this.st.mainClass = 'mfp-move-horizontal';
                        },
                        open: function() {
                           geckoShopify.checkoutIndicator();
                           // if (gecko_settings.show_multiple_currencies && $cookieCurrency !== null) {
                       //      Currency.convertAll(shopCurrency, $cookieCurrency, '#content_cart__popup_nt span.money');
                       //    }
                       //    geckoShopify.nanoScroller();
                        },
                        change: function() { },
                        close: function() {
                           $( 'body' ).removeClass('cart__popup_opend');
                          $( '#content_cart__popup_nt' ).empty();
                        }
                      },
                    });
                  },
                  complete: function() {
                     var $cookieCurrency = gl_Currency.cookie.read();
                     if (gecko_settings.show_multiple_currencies && $cookieCurrency !== null) {
                         Currency.convertAll(shopCurrency, $cookieCurrency, '#content_cart__popup_nt span.money');
                       }
                     if (window.Shopify && Shopify.StorefrontExpressButtons && gecko_settings.use_additional_checkout_buttons) {
                             Shopify.StorefrontExpressButtons.initialize();
                           }
                       geckoShopify.nanoScroller();
                    $( '.loader' ).remove();
                  },
                  error: function() {
                    $( '.loader' ).remove();
                    console.log('Quick view error');
                  }
                });
            } else if( gecko_settings.add_to_cart_action == 'no' ) {
               document.location.href="/cart";
            } else {
               // Display Hidden sidebar or dropdown
               clearTimeout(timeoutNumber);
                  if( $('.jas-sidebar-cart').length > 0 ) {
                        if( $('body').hasClass('open_gl_quick_view') ) {
                           $.magnificPopup.close();
                        }
                      $('.jas-sidebar-cart > a').trigger('click');
                      if (window.Shopify && Shopify.StorefrontExpressButtons && gecko_settings.use_additional_checkout_buttons) {
                             Shopify.StorefrontExpressButtons.initialize();
                           }
                  } else {
                     console.log('bb');
                     $('#jas-header .jas-icon-cart').addClass('display-widget');
                     if( $('body').hasClass('open_gl_quick_view') ) {
                        $.magnificPopup.close();
                     }
                     if ($(window).scrollTop() > 100 && $('#jas-header').hasClass('header-sticky') == false ) {
                        $('html, body').animate({
                           scrollTop: 0
                        }, 1000);
                     }
                      timeoutNumber = setTimeout(function() {
                          $('.display-widget').removeClass('display-widget');
                      }, 3500 );
                      if (window.Shopify && Shopify.StorefrontExpressButtons && gecko_settings.use_additional_checkout_buttons) {
                             Shopify.StorefrontExpressButtons.initialize();
                           }
                  }
           }
            if( $('body').hasClass('open_gl_quick_view') ) {
               $('body').removeClass('open_gl_quick_view');
            }
      },
      
      // Remove from cart functionality with AJAX
      AJAXRemoveFromCart: function() {
          $( document ).on('click', '.widget_shopping_cart_content .remove', function(e) {
              e.preventDefault();

              var $this = $(this),
                  $widget = $('.widget_shopping_cart_content'),
                  remove_item = $this.data('remove_item'),
                  variant_id = $this.data('product_id');

              $widget.addClass('removing-process');
              $.ajax({
                  type: 'POST',
                  url: '/cart/change.js',
                  data:  'quantity=0&id='+variant_id,
                  dataType: 'json',
                  success:function( cart ) {
                    $.get('/cart?view=json', function(data) {
                        /*optional stuff to do after success */
                        $('.widget_shopping_cart_content').html(data);
                    }).always(function() {
                        var subtotal = parseFloat($('.widget_shopping_cart_body').data('subtotal'));
                           $(".gecko-cart-subtotal >span").html(Shopify.formatMoney(subtotal, gecko_settings.moneyFormat));
                        $(".cartCount").html($('.widget_shopping_cart_body').data('count'));
                         geckoShopify.favicon_counter(parseInt($('.widget_shopping_cart_body').data('count')));
                        geckoShopify.nanoScroller();
                        var $cookieCurrency = gl_Currency.cookie.read();
                        if (gecko_settings.show_multiple_currencies && $cookieCurrency !== null) {
                         Currency.convertAll(shopCurrency, $cookieCurrency, '.widget_shopping_cart_content span.money');
                        Currency.convertAll(shopCurrency, $cookieCurrency, '.gecko-cart-subtotal  span.money');
                       }
                       if (window.Shopify && Shopify.StorefrontExpressButtons && gecko_settings.use_additional_checkout_buttons) {
                          Shopify.StorefrontExpressButtons.initialize();
                        }
                       if ($('body').hasClass('template-cart')) {
                           $.pjax.reload('.jas_cart_page',{
                                timeout: 5000,
                                fragment: '.jas_cart_page',
                                scrollTo: false
                           });
                         }
                        $widget.removeClass('removing-process');
                    });
                  },
                  error: function() {
                     geckoShopify.onError(XMLHttpRequest, textStatus);
                  }
              });
          })
      },
      save_note: function() {
         if( ! gecko_settings.save_note ) return;
          // Save note anytime it's changed
          $(document.body).on('change', '.CartSpecialInstructions', function() {
            var newNote = $(this).val(),
                $widget = $('.widget_shopping_cart'),
                $checkout = $('.checkout'),
                $cart__popup = $('.cart__popup_upsell');
            // Update the cart note in case they don't click update/checkout
            $widget.addClass('removing-process');
            $cart__popup.addClass('loading');
            $checkout.attr('disabled', 'disabled').css('pointer-events', 'none');
            $.ajax({
              type: 'POST',
              url: '/cart/update.js',
              data: 'note=' + geckoShopify.attributeToString(newNote),
              dataType: 'json',
              error: function(XMLHttpRequest, textStatus) {
                geckoShopify.onError(XMLHttpRequest, textStatus);
              },
              complete: function() {
                $widget.removeClass('removing-process');
                $cart__popup.removeClass('loading');
                $checkout.removeAttr("disabled").css('pointer-events', 'auto');
                if ($('body').hasClass('template-cart')) {
                  $.pjax.reload('.jas_cart_page',{
                       timeout: 5000,
                       fragment: '.jas_cart_page',
                       scrollTo: false
                  });
                }
              }
            });
          });
       },
       attributeToString: function(attribute) {
        if ((typeof attribute) !== 'string') {
          // Converts to a string.
          attribute += '';
          if (attribute === 'undefined') {
            attribute = '';
          }
        }
        // Removing leading and trailing whitespace.
        return jQuery.trim(attribute);
      },

      // CategoryFilter jas_pop_sidebar,pop_default
      initCategoryFilter : function() {
         if ( $( '.pop_default' ).length === 0 ) return;
         $( 'body' ).on('click','.pop_default',function() {
            $( this ).toggleClass('opened');
            if ( $( ".jas-top-sidebar" ).is( ":hidden" ) ) {
               $( ".jas-top-sidebar" ).slideDown( "slow" );
            } else {
               $( ".jas-top-sidebar" ).slideUp();
            }
         });
      },

      // Open video in popup
      wcInitPopupVideo : function() {
         if ( $( '.p-video-youtube' ).length > 0 ) {
            $( '.jas-popup-url' ).magnificPopup({
               disableOn: 0,
               type: 'iframe',
            });

            $( '.jas-popup-mp4' ).magnificPopup({
               disableOn: 0,
               type: 'inline',
            });
         }
      },
      
      //Product 360 button
      product360Button: function() {
          $('.p-video-360 a').magnificPopup({
              type: 'inline',
              mainClass: 'mfp-fade',
              removalDelay: 160,
              disableOn: false,
              preloader: false,
              fixedContentPos: false,
              callbacks: {
                  open: function() {
                      $(window).resize()
                  },
              },

          });
      },

      // Init Multi Scroll
      initMultiScroll : function() {
         if ( ! geckoShopify.isMobile() ) {
            var el = $( '.jas-vertical-slide' );

            el.each( function( i, val ) {
               var _option = $( this ).data( 'slide' );

               if ( _option !== undefined ) {
                  var _speed = ( _option.speed ) ? _option.speed : 700,
                     _nav   = ( 'true' == _option.navigation ) ? true : false,
                     _navp  = ( _option.navigationPosition ) ? _option.navigationPosition : 'left';

                  $( val ).multiscroll( {
                     scrollingSpeed: parseInt( _speed ),
                     navigation: _nav,
                     navigationPosition: _navp
                  } );
               }
            });
         }
      },
      
      // Init wc switch layout
         spInitSwitchLayout :function() {
         $( 'body' ).on( 'click', '.sp-col-switch a', function(e) {
            e.preventDefault();
            $( '.jas-filter-wrap' ).addClass( 'oh' );
            var _this     = $( this ),
               _col      = _this.data( 'col' ),
               _mobile      = _this.data( 'mobile' ),
               _parent   = _this.closest( '.sp-col-switch' ),
               $products = $( '.products' ),
               $btnload = $( '.btn-products-load-more' ),
               _products = $( '.products .product' ),
               _img_lazy = _products.find('.attachment-shop_catalog'),
               _bgimg_lazy = _products.find('.jas_bg'),
               _sizer    = $( '.products .grid-sizer' );

            if ( _this.hasClass( 'active' ) ) {
               return;
            }
            if ($btnload.length > 0){
               var href = $btnload.attr('href'),
                   text = href.replace('inajax15','inajax'+_col).replace('inajax12','inajax'+_col).replace('inajax6','inajax'+_col).replace('inajax4','inajax'+_col).replace('inajax3','inajax'+_col).replace('inajax2','inajax'+_col);
               $btnload.attr('href', text);
             }
            _parent.find( 'a' ).removeClass( 'active' );
            _this.addClass( 'active' );
            if ($products.hasClass('metro')) {
               var _product_small = _products.not('.metro-item'),
                  _product_big = $products.find('.metro-item');
                if (_col == '3' || _col == '2') {
                   _product_small.removeClass( 'jas-col-md-2 jas-col-md-3 jas-col-md-4 jas-col-md-6 jas-col-md-12 jas-col-md-15' ).addClass( 'jas-col-md-' + _col );
                   _product_big.removeClass( 'jas-col-md-2 jas-col-md-3 jas-col-md-4 jas-col-md-6 jas-col-md-12 jas-col-md-15' ).addClass( 'jas-col-md-6' );
                } else {
                  _products.removeClass( 'jas-col-md-2 jas-col-md-3 jas-col-md-4 jas-col-md-6 jas-col-md-12 jas-col-md-15' ).addClass( 'jas-col-md-' + _col );
                }
            }else {
               _products.removeClass( 'jas-col-md-2 jas-col-md-3 jas-col-md-4 jas-col-md-6 jas-col-md-12 jas-col-md-15' ).addClass( 'jas-col-md-' + _col );
            }
                 _products.removeClass( 'jas-col-xs-2 jas-col-xsd-3 jas-col-xs-4 jas-col-xs-6 jas-col-xs-12 jas-col-xs-15' ).addClass( 'jas-col-xs-' + _mobile );
            _sizer.removeClass( 'size-2 size-3 size-4 size-6 size-12 size-15' ).addClass( 'size-' + _col )
            if ( $( '.products' ).hasClass( 'jas-masonry' ) ) {
                setTimeout(function(){ $( '.jas-filter-wrap' ).removeClass( 'oh' ); }, 500);
                if (_bgimg_lazy.length == 0){
                  //console.log('nohas')
                  _img_lazy.removeClass('lazyloaded').addClass('lazyload')
               } else {
                  //console.log('has')
                  geckoShopify.resizeElements();
                  _bgimg_lazy.removeClass('lazyloaded').addClass('lazyload')
               }
               $('.jas-masonry').isotope('layout');
               setTimeout(function(){ $( '.jas-filter-wrap' ).removeClass( 'oh' );$('.jas-masonry').isotope('layout'); }, 500);
            }
         });
      },

      // Init sidebar filter
      spInitSidebarFilter : function() {
         if ( $( '.jas_pop_sidebar' ).length === 0 ) return;
         $( 'body' ).on( 'click', '.jas_pop_sidebar', function(e) {
            $( this ).toggleClass('opened');
            $( '.jas-filter-wrap' ).toggleClass( 'opened' );
            $( '.close-filter' ).on( 'click', function() {
               $( '.jas-filter-wrap' ).removeClass( 'opened' );
               $( '.jas_pop_sidebar' ).removeClass( 'opened' );
            });
            e.preventDefault();
         });
      },

      // Init product accordion
      spAccordion : function() {
         $( '.sp-accordions .tab-heading' ).click( function( e ) {
            e.preventDefault();

            var _this = $( this );
            var parent = _this.closest( '.sp-accordion' );
            var parent_top = _this.closest( '.sp-accordions' );

            if ( parent.hasClass( 'active' ) ) {
               parent.removeClass( 'active' );
               parent.find( '.entry-content' ).stop( true, true ).slideUp();
            } else {
               parent_top.find( '.sp-accordion' ).removeClass( 'active' );
               parent.addClass( 'active' );
               parent_top.find( '.entry-content' ).stop( true, true ).slideUp();
               parent.find( '.entry-content' ).stop( true, true ).slideDown();
            }
         });
      },

      // Sticky sidebar for single product layout 3, 4
      spStickySidebar : function() {
      if ( $( '.jas-sidebar-sticky' ).length > 0 ) {
            $( '.jas-sidebar-sticky' ).stick_in_parent();
         }
      },

      // Init Countdown
      initCountdown : function() {
         $('.jas-countdown').each(function() {

            $(this).countdown($(this).data('time'), {elapse: true})
            .on('update.countdown', function(event) {
              var $this = $(this);
              if (event.elapsed) {
                $this.html('');
              } else {
                  $(this).html(event.strftime(''
                  + '<div class="pr"><span class="db cw fs__16 mt__10">%-D</span><span class="db">'+gecko_settings.countdown_days+'</span></div>'
                  + '<div class="pr"><span class="db cw fs__16 mt__10">%H</span><span class="db">'+gecko_settings.countdown_hours+'</span></div>'
                  + '<div class="pr"><span class="db cw fs__16 mt__10">%M</span><span class="db">'+gecko_settings.countdown_mins+'</span></div>'
                  + '<div class="pr"><span class="db cw fs__16 mt__10">%S</span><span class="db">'+gecko_settings.countdown_sec+'</span></div>'));
              }
            });
         });
      },

      // Init Countdown
      get1dayFromNow : function(days,hours,minutes,seconds) {
       var clac_minutes =  Math.floor(seconds/60)%60,
        clac_date = (hours + ((minutes+clac_minutes)/60)) * 60 * 60 * 1000;
    return new Date( (new Date().valueOf() + (days * 24 * 60 * 60 * 1000)) + clac_date);
       },
       get1dayFromNow_2 : function(days,hours,minutes,seconds) {
       var clac_minutes =  Math.floor(seconds/60)%60; 
    return new Date(new Date().valueOf() + (hours + ((minutes+clac_minutes)/60)) * 60 * 60 * 1000);
       },
      initCountdown_page : function() {
         $('.jas_countdow_page').each(function() {
            if ($(this).hasClass('jas_loop_bar')) {
               var days = parseInt($(this).data('days')),
                  hours = parseInt($(this).data('hours')),
                  minutes = parseInt($(this).data('minutes')),
                  seconds = parseInt($(this).data('seconds'));
              // many days from now!
              if (days > 0 ) {
                 //  function get1dayFromNow() {
                 //     var clac_minutes =  Math.floor(seconds/60)%60,
                 //         clac_date = (hours + ((minutes+clac_minutes)/60)) * 60 * 60 * 1000;
                 //   return new Date( (new Date().valueOf() + (days * 24 * 60 * 60 * 1000)) + clac_date);
                 // }
                 $(this).countdown(geckoShopify.get1dayFromNow(days,hours,minutes,seconds)).on('update.countdown', function(event) {
                  var $this = $(this);
                     $(this).html(event.strftime(''
                     + '<div class="block"><span class="flip-top">%-D</span><br><span class="label">'+gecko_settings.countdown_days_page+'</span></div>'
                     + '<div class="block"><span class="flip-top">%H</span><br><span class="label">'+gecko_settings.countdown_hours_page+'</span></div>'
                     + '<div class="block"><span class="flip-top">%M</span><br><span class="label">'+gecko_settings.countdown_mins_page+'</span></div>'
                     + '<div class="block"><span class="flip-top">%S</span><br><span class="label">'+gecko_settings.countdown_sec_page+'</span></div>'));
                  });
              } else {
                 // function get1dayFromNow() {
                 //  var clac_minutes =  Math.floor(seconds/60)%60; 
                 //   return new Date(new Date().valueOf() + (hours + ((minutes+clac_minutes)/60)) * 60 * 60 * 1000);
                 // }
                 $(this).countdown(geckoShopify.get1dayFromNow_2(days,hours,minutes,seconds)).on('update.countdown', function(event) {
                  var $this = $(this);
                     $(this).html(event.strftime(''
                     + '<div class="block"><span class="flip-top">%-D</span><br><span class="label">'+gecko_settings.countdown_days_page+'</span></div>'
                     + '<div class="block"><span class="flip-top">%H</span><br><span class="label">'+gecko_settings.countdown_hours_page+'</span></div>'
                     + '<div class="block"><span class="flip-top">%M</span><br><span class="label">'+gecko_settings.countdown_mins_page+'</span></div>'
                     + '<div class="block"><span class="flip-top">%S</span><br><span class="label">'+gecko_settings.countdown_sec_page+'</span></div>'));
                  });
               }
              } else {
               $(this).countdown($(this).data('time'), {elapse: true})
               .on('update.countdown', function(event) {
                 var $this = $(this);
                 if (event.elapsed) {
                   $this.html('');
                 } else {
                     $(this).html(event.strftime(''
                     + '<div class="block"><span class="flip-top">%-D</span><br><span class="label">'+gecko_settings.countdown_days_page+'</span></div>'
                     + '<div class="block"><span class="flip-top">%H</span><br><span class="label">'+gecko_settings.countdown_hours_page+'</span></div>'
                     + '<div class="block"><span class="flip-top">%M</span><br><span class="label">'+gecko_settings.countdown_mins_page+'</span></div>'
                     + '<div class="block"><span class="flip-top">%S</span><br><span class="label">'+gecko_settings.countdown_sec_page+'</span></div>'));
                 }
               });
            }
         });
      },

      // Init OpenSwatch 
      swatchesOnGrid: function() {

          $('body').on('click', '.jas_swatch_on_img:not(.current-swatch)', function() {

              var src, dtsrc, srcset;

              var imageSrc = $(this).data('src'),
                  imagedtSrc = $(this).data('dtsrc'),
                  imageSrcset = $(this).data('srcset'),
                  aspectratio = $(this).data('aspectratio');

              if( typeof imageSrc == 'undefined' ) return;

              var product = $(this).parents('.jas-grid-item'),
                  image = product.find('img').first(),
                  src_img = image.attr('data-chksrc');

                  $(this).parent().find('.current-swatch').removeClass('current-swatch');
                  $(this).addClass('current-swatch');
                  product.addClass('jas-swatched');
                  src = imageSrc;
                  dtsrc= imagedtSrc;
                  srcset = imageSrcset;
             
             if( src == src_img ) return;
              product.addClass('loading-qs');
              image.attr('src', src).attr('data-src', dtsrc).attr('data-aspectratio', aspectratio).removeClass('lazyautosizes lazyloaded').addClass('lazyload lazypreload').removeClass('lazyautosizes lazyloaded').addClass('lazyload lazypreload').one('load', function() {
                 image.attr('data-chksrc', src);
                  product.removeClass('loading-qs');
              });

          });

      },
      swatchesOnBGGrid: function() {

                  $('body').on('click', '.jas_swatch_on_bg:not(.current-swatch)', function() {

                    var imagebg = $(this).data('bgset'),
                        imageSrc = $(this).data('src');

                     var product = $(this).parents('.jas-grid-item'),
                        image = product.find('.jas-pr-image-link'),
                        src_img = image.attr('data-chksrc');

                    $(this).parent().find('.current-swatch').removeClass('current-swatch');
                    $(this).addClass('current-swatch');
                    product.addClass('product-swatched');
                    if( imageSrc  == src_img ) return;
                    product.addClass('loading-image');
                    image.attr('data-bgset', imagebg).removeClass('lazyautosizes lazyloaded').addClass('lazyload lazypreload').imagesLoaded( { background: true }, function() {
                      image.attr('data-chksrc', imageSrc);
                      product.removeClass('loading-image');
                    });

                  });

                },

      // Ajax filters
      ajaxFilters: function() {
          if( ! $('body').hasClass('template-collection') && ! $('body').hasClass('ajax-shop-true') ) return;

          var that = this,
              products = $('.products');

          $('body').on('click', '.jas-pagination-ajax a', function(e) {
              scrollToTop();
          });

          $(document).pjax(geckoTheme.ajaxLinks, '.main-page-wrapper', {
              timeout: 5000,
              fragment: '.main-page-wrapper',
              scrollTo: false
          });


          $( document ).on( 'change', 'select.orderby', function() {
              var form = $( '.shopify-ordering'),
                  valueSelected = $(this).find(':selected').data('value');
              $.pjax({
                  container: '.main-page-wrapper',
                  timeout: 4000,
                  url: valueSelected,
                  fragment: '.main-page-wrapper',
                  scrollTo: false
              });

             // return false;
          });
          // $('.shopify-ordering' ).on( 'change', 'select.orderby', function() {
          //     //$( this ).closest( 'form' ).find('[name="_pjax"]').remove();
          //   $( this ).closest( 'form' ).submit();
          // });

          $(document).on('pjax:error', function(xhr, textStatus, error, options) {
              console.log('pjax error ' + error);
          });

          $(document).on('pjax:start', function(xhr, options) {
              $('body').addClass('gecko-loading');
          });

          $(document).on('pjax:complete', function(xhr, textStatus, options) {
               var $cookieCurrency = gl_Currency.cookie.read();
               if (gecko_settings.show_multiple_currencies && $cookieCurrency !== null) {
                 Currency.convertAll(shopCurrency, $cookieCurrency, '.jas-products-holder span.money');
               }
               that.shopPageInit();
              that.initCountdown();
              scrollToTop();
              $('body').removeClass('gecko-loading');
              if (gecko_settings.productreviews && $(".shopify-product-reviews-badge").length > 0 ) {
                return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
               }

          });

          $(document).on('pjax:end', function(xhr, textStatus, options) {

              $('body').removeClass('gecko-loading');

          });

          var scrollToTop = function() {
              if ( gecko_settings.ajax_scroll == 'yes' ) return false;
              console.log('ajax_scroll')
              var $scrollTo = $('.main-page-wrapper'),
                  scrollTo = $scrollTo.offset().top - gecko_settings.ajax_scroll_offset;

              $('html, body').stop().animate({
                  scrollTop: scrollTo
              }, 400);
          };

      },

      // Ajax filters
      shopPageInit: function() {
         geckoShopify.initMasonry();
          if( gecko_settings.shop_equal_img ) {
            setTimeout(function(){geckoShopify.resizeElements();}, 400);
            }
            setTimeout(function(){$('.jas-masonry').isotope('layout');}, 600);
            setTimeout(function(){$('.jas-masonry').isotope('layout');}, 1000);
          this.instagram();
          this.jas_pr_recent();
          this.nanoScroller();
          this.categoriesAccordion();
           geckoShopify.clickOnScrollButton( geckoTheme.shopLoadMoreBtn , false );
      },
      
      //Categories toggle accordion
      categoriesAccordion: function() {

          var $widget = $('.widget_product_categories'),
              $list = $widget.find('.product-categories'),
              $openBtn = $('<div class="gecko-cats-toggle" />'),
              time = 300;

          $list.find('.cat-parent').append( $openBtn );

          $list.on('click', '.gecko-cats-toggle', function() {
              var $btn = $(this),
                  $subList = $btn.prev();

              if( $subList.hasClass('list-shown') ) {
                  $btn.removeClass('toggle-active');
                  $subList.stop().slideUp(time).removeClass('list-shown');
              } else {
                  $subList.parent().parent().find('> li > .list-shown').slideUp().removeClass('list-shown');
                  $subList.parent().parent().find('> li > .toggle-active').removeClass('toggle-active');
                  $btn.addClass('toggle-active');
                  $subList.stop().slideDown(time).addClass('list-shown');
              }
          });

          if( $list.find(' > li.current-cat.cat-parent, > li.current-cat-parent').length > 0 ) {
              $list.find(' > li.current-cat.cat-parent, > li.current-cat-parent').find('> .gecko-cats-toggle').click();
          }

      },

      // Custom 3rd-party plugin
      customThirdParties : function() {
         // Reinit carousel on jas tabs
         $( 'body' ).on( 'click', '.jas_tta-tab a', function( e ) {
            if ( $( '.jas-carousel' ).length > 0 ) {
               setTimeout( function() {
                  $( '.jas-carousel' ).slick( 'getSlick' ).refresh();
               }, 50);
            }
         });
      },

      productImages: function() {
          // Init photoswipe

          var currentImage,
              $productGallery = $('.shopify-product-gallery'),
              $single_thumbnail = $('.single-product-thumbnail'),
              $mainImages = $('.p-thumb'),
              $thumbs = $productGallery,
              currentClass = 'current-image',
              gallery = $('.photoswipe-images'),
              PhotoSwipeTrigger = '.gecko-show-product-gallery',
              galleryType = 'photo-swipe'; // magnific photo-swipe

          $thumbs.addClass('thumbnails-ready');

          if( $productGallery.hasClass( 'image-action-popup') ) {
              PhotoSwipeTrigger += ', .shopify-product-gallery__image a';
          }

          $productGallery.on('click', '.shopify-product-gallery__image a', function(e) {
              e.preventDefault();
          });

          $single_thumbnail.on('click', PhotoSwipeTrigger, function(e) {
              e.preventDefault();
              currentImage = $(this).attr('href');

              if( galleryType == 'magnific' ) {
                  $.magnificPopup.open({
                      type: 'image',
                      image: {
                          verticalFit: false
                      },
                      items: getProductItems(),
                      gallery: {
                          enabled: true,
                          navigateByImgClick: false
                      },
                  }, 0);
              }

              if( galleryType == 'photo-swipe' ) {

                  // build items array
                  var items = getProductItems();

                  callPhotoSwipe( getCurrentGalleryIndex(e), items );

              }

          });

          gallery.each(function() {
              var $this = $(this);
              $this.on('click', 'a', function(e) {
                  e.preventDefault();
                  var index = $(e.currentTarget).data('index') - 1;
                  var items = getGalleryItems($this, []);
                  callPhotoSwipe(index, items);
              } );
          })

          var callPhotoSwipe = function( index, items ) {
              var pswpElement = document.querySelectorAll('.pswp')[0];

              if( $('body').hasClass('rtl') ) {
                  index = items.length - index - 1;
                  items = items.reverse();
              }

              // define options (if needed)
              var options = {
                  history:false,
                  // optionName: 'option value'
                  // for example:
                  index: index, // start at first slide
                  shareButtons:[
                      {id:'facebook', label:gecko_settings.share_fb, url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'},
                      {id:'twitter', label:gecko_settings.tweet, url:'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'},
                      {id:'pinterest', label:gecko_settings.pin_it, url:'http://www.pinterest.com/pin/create/button/'+
                                                          '?url={{url}}&media={{image_url}}&description={{text}}'},
                      {id:'download', label:gecko_settings.download_image, url:'{{raw_image_url}}', download:false}
                  ],
                  getThumbBoundsFn: function(index) {

                  }
              };

              // Initializes and opens PhotoSwipe
              var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
              gallery.init();
          };

          var getCurrentGalleryIndex = function( e ) {
              if( $mainImages.hasClass('jas-carousel') )
                  return $mainImages.find('.slick-active').index();
              else return $(e.currentTarget).parent().index();
          };

          var getProductItems = function() {
              var items = [];

              $mainImages.find('.jas_img_ptw a >img').each(function() {
                  var src = $(this).attr('data-large_image'),
                      width = $(this).attr('data-large_image_width'),
                      height = $(this).attr('data-large_image_height'),
                      caption = $(this).data('caption');

                      items.push({
                          src: src,
                          w: width,
                          h: height,
                          title: ( gecko_settings.product_images_captions == 'yes' ) ? caption : false
                      });

              });

              return items;
          };

          var getGalleryItems = function( $gallery, items ) {
              var src, width, height, title;

              $gallery.find('a').each(function() {
                  src = $(this).attr('href');
                  width = $(this).data('width');
                  height = $(this).data('height');
                  title = $(this).attr('title');
                  if( ! isItemInArray(items, src) ) {
                      items.push({
                          src: src,
                          w: width,
                          h: height,
                          title: title
                      });
                  }
              });

              return items;
          };

          var isItemInArray = function( items, src ) {
              var i;
              for (i = 0; i < items.length; i++) {
                  if (items[i].src == src) {
                      return true;
                  }
              }

              return false;
          };

          /* Fix zoom for first item firstly */

          if( $productGallery.hasClass( 'image-action-zoom') ) {
              var zoom_target   = $( '.shopify-product-gallery__image img' );
              var image_to_zoom = zoom_target.find( 'img' );

              // But only zoom if the img is larger than its container.
              zoom_target.each(function() {
               var $this = $(this);
                 if ( $this.attr( 'data-large_image_width' ) > $( '.shopify-product-gallery__image' ).width() ) {
                     $this.trigger( 'zoom.destroy' );
                     var zoom_parent = $this.closest('.shopify-product-gallery__image')
                     zoom_parent.zoom({
                        url: $this.attr( 'data-large_image' ), 
                         touch: false
                     });
                 }
              });
          }

      },

     // Parallax effect
     
      parallax: function() {
          if( $(window).width() <= 1024) {
             $("[data-jas-parallax]").each(function( index ) {
              $( this ).addClass('lazyload');
            });
          } else {
            window.jasParallaxSkroll = !1;
            var jasSkrollrOptions, callSkrollInit = !1;
            window.jasParallaxSkroll && window.jasParallaxSkroll.destroy(), $(".jas_parallax-inner").remove(), $("[data-5p-top-bottom]").removeAttr("data-5p-top-bottom data-30p-top-bottom"), $("[data-jas-parallax]").each(function() {
                      var skrollrSpeed, skrollrSize, skrollrStart, skrollrEnd, $parallaxElement, parallaxImage,srcset_paralax=$(this).attr("data-bgset"),sizes_paralax=$(this).attr("data-sizes"),fit_paralax=$(this).attr("data-parent-fit");
                      callSkrollInit = !0, "on" === $(this).data("jasParallaxOFade") && $(this).children().attr("data-5p-top-bottom", "opacity:0;").attr("data-30p-top-bottom", "opacity:1;"), skrollrSize = 100 * $(this).data("jasParallax"), $parallaxElement = $("<div />").addClass("jas_parallax-inner").appendTo($(this)), parallaxImage = $(this).data("jas-parallax-image"),$parallaxElement.addClass("lazyload"), $parallaxElement.css("background-image", "url(" + parallaxImage + ")"), $parallaxElement.attr({'data-bgset':srcset_paralax,'data-sizes':sizes_paralax,'data-parent-fit':fit_paralax }), $parallaxElement.height(skrollrSize + "%"),skrollrSpeed = skrollrSize - 100, skrollrStart = -skrollrSpeed, skrollrEnd = 0, $parallaxElement.attr("data-bottom-top", "top: " + skrollrStart + "%;").attr("data-top-bottom", "top: " + skrollrEnd + "%;")
                  }), !(!callSkrollInit || !window.skrollr) && (jasSkrollrOptions = {
                      forceHeight: !1,
                      smoothScrolling: !1,
                      mobileCheck: function() {
                          return !1
                      }
                  }, window.jasParallaxSkroll = skrollr.init(jasSkrollrOptions), window.jasParallaxSkroll)
          }
      },
       // Product recent Widget
      jas_pr_recent: function() {
         if( ! $('body').hasClass('template-collection') && ! $('body').hasClass('template-blog') && ! $('body').hasClass('template-article')) return;
         var ls = gl_Currency.cookie.jasread('jas_recent');
         if(ls != null){ 
            ls = ls.split(',');
            var lr = ls.reverse();
            var length = ls.length;
            // show many products
            $("#recently-viewed-products").show();
            $.ajax({
               url: '/pages/recently-viewed-products/'+ls+'?q=widget_rencet',
               dataType: 'html',
               type: 'GET',
               success: function(responsive) {
                 //console.log(responsive);
                  $('#recently_wrap').html(responsive);
               },
               error: function(data) {
                 console.log('ajax error');
               },
               complete: function() {
                 //currency
                 var $cookieCurrency = gl_Currency.cookie.read();
                 if (gecko_settings.show_multiple_currencies && $cookieCurrency !== null) {
                    Currency.convertAll(shopCurrency, $cookieCurrency, '.widget_recently_viewed_products span.money');
                  }
               }
            }); 
         }else{
            ls = new Array();
          }
      },
      
      // Promo popup
      promoPopup: function() {
         var promo_version = gecko_settings.promo_version;
         if( $('body').hasClass('catalog_mode_on') || gecko_settings.enable_popup != 'yes' || $('.gecko-promo-popup ').length == 0 || ( gecko_settings.promo_popup_hide_mobile == 'yes' && $(window).width() < 768 ) ) return;
          var popup = $( '.gecko-promo-popup' ),
              shown = false,
              pages = gecko_cookie('gecko_shown_pages');

         if( ! pages ) pages = 0;

         if( pages < gecko_settings.popup_pages) {
             pages++;
             gecko_cookie('gecko_shown_pages', pages, { expires: 7, path: '/' } );
             return false;
         }

          var showPopup = function() {
              $.magnificPopup.open({
                  items: {
                      src: '.gecko-promo-popup'
                  },
                  type: 'inline',       
                  removalDelay: 500, //delay removal by X to allow out-animation
                  callbacks: {
                      beforeOpen: function() {
                          this.st.mainClass = gecko_settings.popupEffect + ' promo-popup-wrapper';
                      },
                      open: function() {
                        $('#hideforever_ypop').change(function() {
                        if ($(this).is(':checked')) {
                          gecko_cookie('gecko_popup', 'shown', {expires:7, path:'/'});
                        } else {
                          gecko_cookie('gecko_popup', null, { path: '/' });
                        }
                        });
                      // Will fire when this exact popup is opened
                      // this - is Magnific Popup object
                      },
                      close: function() {
                          gecko_cookie('gecko_popup_' + promo_version, 'shown', { expires: 7, path: '/' } );
                      }
                      // e.t.c.
                  }
              });
          };

          if ( gecko_cookie('gecko_popup_' + promo_version) != 'shown' ) {
              if( gecko_settings.popup_event == 'scroll' ) {
                  $(window).scroll(function() {
                      if( shown ) return false;
                      if( $(document).scrollTop() >= gecko_settings.popup_scroll ) {
                          showPopup();
                          shown = true;
                      }
                  });
              } else {
                  setTimeout(function() {
                      showPopup();
                  }, gecko_settings.popup_delay );
              }
          }
          $('.gecko-open-newsletter').on('click',function(e){
              e.preventDefault();
              showPopup();
          })
      },
      
      //Cookies law
      cookiesPopup: function() {
         var cookies_version = gecko_settings.cookies_version;
          if( gecko_cookie('gecko_cookies_law_' + cookies_version) == 'accepted' ) return;
          var popup = $( '.gecko-cookies-popup' );

          setTimeout(function() {
              popup.addClass('popup-display');
              popup.on('click', '.cookies-accept-btn', function(e) {
                  e.preventDefault();
                  acceptCookies();
              })
          }, 2500 );

          var acceptCookies = function() {
              popup.removeClass('popup-display').addClass('popup-hide');
              gecko_cookie('gecko_cookies_law_' + cookies_version, 'accepted', { expires: 60, path: '/' } );
          };
      },

      // Sticky footer: margin bottom for main wrapper
      stickyFooter: function() {

         if( ! $('body').hasClass( 'footer_sticky' ) || $(window).width() <= 1024 ) return;

         var $body = $('body'),
              $footer = $('#jas-footer'),
              $footerContent = $footer.find('.footer__top, .footer__bot'),
              footerHeight = $footer.outerHeight(),
              $page = $('#jas-content'),
              $doc = $(document),
              $window = $(window),
              docHeight = $doc.outerHeight(),
              windowHeight = $window.outerHeight(),
              position,
              bottomSpace,
              opacity;

         var footerOffset = function() {
              $page.css({
                  marginBottom: $footer.outerHeight()
              })
         };

         var footerEffect = function() {
              position        = $doc.scrollTop();
              docHeight       = $doc.outerHeight();
              windowHeight    = $window.outerHeight();
              bottomSpace     = ( docHeight - (position + windowHeight) );
              footerHeight    = $footer.outerHeight();
              opacity         = parseFloat( (bottomSpace ) / footerHeight).toFixed(5);

              // $footer.removeClass('footer-act-sticky').addClass('footer-not-act-sticky');
              $footer.removeClass('act-sticky');
              // If scrolled to footer
              if( bottomSpace > footerHeight ) return;

              $footerContent.css({
                  opacity: (1 - opacity)
              });

              // $footer.addClass('footer-act-sticky').removeClass('footer-not-act-sticky');
              $footer.addClass('act-sticky');

         };

         $window.on('resize', footerOffset);
         $window.on('scroll', footerEffect);

         $footer.imagesLoaded(function() {
              footerOffset();
         });

     },
     // Init nanoscroller
      nanoScroller: function() {
         if( $(window).width() < 1024 ) return;
          $(".gecko-scroll").nanoScroller({
              paneClass: 'gecko-scroll-pane',
              sliderClass: 'gecko-scroll-slider',
              contentClass: 'gecko-scroll-content',
              preventPageScrolling: false
          });

      },
      // mobile responsive table
      shopifyWrappTable: function() {
      var sopTable = $(".shop_table:not(.shop_table_responsive):not(.jas-shopify-table)").wrap("<div class='jas-table-responsive'></div>");
      },
      // Simple dropdown for category select on search form
      simpleDropdown: function() {
          $('.input-dropdown-inner_pr').each(function() {
              var dd = $(this);
              var btn = dd.find('> a');
              var input = dd.find('> input');
              var list = dd.find('> ul'); //.dd-list-wrapper

              $(document).click(function(e) {
                  var target = e.target;
                  if (dd.hasClass('dd-shown') && !$(target).is('.input-dropdown-inner_pr') && !$(target).parents().is('.input-dropdown-inner_pr')) {
                      hideList();
                      return false;
                  }
              });

              btn.on('click', function(e) {
                  e.preventDefault();
                  if (dd.hasClass('dd-shown')) {
                    hideList();
                  } else {
                   $('.input-dropdown-inner_pr.dd-shown > ul').slideUp(100);
                    $('.input-dropdown-inner_pr.dd-shown').removeClass('dd-shown');
                    showList();
                  }
                  return false;
              });

              list.on('click', 'a', function(e) {
                  e.preventDefault();
                  var value = $(this).data('val');
                  var label = $(this).text();
                  list.find('.is-selected').removeClass('is-selected');
                  $(this).parent().addClass('is-selected');
                  if (value != 0) {
                      list.find('li:first-child').show();
                  } else if (value == 0) {
                      list.find('li:first-child').hide();
                  }
                  btn.text(label);
                  input.val(value);
                  hideList();
              });

              function showList() {
                  dd.addClass('dd-shown');
                  list.slideDown(100);
              }

              function hideList() {
                  dd.removeClass('dd-shown');
                  list.slideUp(100);
              }
          });

      },
      simpleDropdown_qs: function() {
          $('.input-dropdown-inner_qs').each(function() {
              var dd = $(this);
              var btn = dd.find('> a');
              var input = dd.find('> input');
              var list = dd.find('> ul'); //.dd-list-wrapper

              $(document).click(function(e) {
                  var target = e.target;
                  if (dd.hasClass('dd-shown') && !$(target).is('.input-dropdown-inner_qs') && !$(target).parents().is('.input-dropdown-inner_qs')) {
                      hideList();
                      return false;
                  }
              });

              btn.on('click', function(e) {
                  e.preventDefault();
                  if (dd.hasClass('dd-shown')) {
                    hideList();
                  } else {
                   $('.input-dropdown-inner_qs.dd-shown > ul').slideUp(100);
                    $('.input-dropdown-inner_qs.dd-shown').removeClass('dd-shown');
                    showList();
                  }
                  return false;
              });

              list.on('click', 'a', function(e) {
                  e.preventDefault();
                  var value = $(this).data('val');
                  var label = $(this).text();
                  list.find('.is-selected').removeClass('is-selected');
                  $(this).parent().addClass('is-selected');
                  if (value != 0) {
                      list.find('li:first-child').show();
                  } else if (value == 0) {
                      list.find('li:first-child').hide();
                  }
                  btn.text(label);
                  input.val(value);
                  hideList();
              });

              function showList() {
                  dd.addClass('dd-shown');
                  list.slideDown(100);
              }

              function hideList() {
                  dd.removeClass('dd-shown');
                  list.slideUp(100);
              }
          });

      },
      simpleDropdown_qv: function() {
          $('.input-dropdown-inner_qv').each(function() {
              var dd = $(this);
              var btn = dd.find('> a');
              var input = dd.find('> input');
              var list = dd.find('> ul'); //.dd-list-wrapper

              $(document).click(function(e) {
                  var target = e.target;
                  if (dd.hasClass('dd-shown') && !$(target).is('.input-dropdown-inner_qv') && !$(target).parents().is('.input-dropdown-inner_qv')) {
                      hideList();
                      return false;
                  }
              });

              btn.on('click', function(e) {
                  e.preventDefault();
                  if (dd.hasClass('dd-shown')) {
                    hideList();
                  } else {
                   $('.input-dropdown-inner_qv.dd-shown > ul').slideUp(100);
                    $('.input-dropdown-inner_qv.dd-shown').removeClass('dd-shown');
                    showList();
                  }
                  return false;
              });

              list.on('click', 'a', function(e) {
                  e.preventDefault();
                  var value = $(this).data('val');
                  var label = $(this).text();
                  list.find('.is-selected').removeClass('is-selected');
                  $(this).parent().addClass('is-selected');
                  if (value != 0) {
                      list.find('li:first-child').show();
                  } else if (value == 0) {
                      list.find('li:first-child').hide();
                  }
                  btn.text(label);
                  input.val(value);
                  hideList();
              });

              function showList() {
                  dd.addClass('dd-shown');
                  list.slideDown(100);
              }

              function hideList() {
                  dd.removeClass('dd-shown');
                  list.slideUp(100);
              }
          });

      },

      initVideoBackgrounds: function() {
        geckoShopify.jas_initVideoBackgrounds()
      },
      fullHeightRow: function() {
        var $element = $(".jas-full-height:first");
        if ($element.length) {
        var $window, windowHeight, offsetTop, fullHeight;
        $window = $(window), windowHeight = $window.height(), offsetTop = $element.offset().top, offsetTop < windowHeight && (fullHeight = 100 - offsetTop / (windowHeight / 100), $element.css("min-height", fullHeight + "vh"))
        }
        $(document).trigger("jas-full-height-row", $element)
       },
      
      jas_initVideoBackgrounds: function() {
              jQuery("[data-gl-video-bg]").each(function() {
              var youtubeUrl, youtubeId, $element = jQuery(this);
              $element.data("glVideoBg") ? (youtubeUrl = $element.data("glVideoBg"),
              youtubeId = geckoShopify.jasExtractYoutubeId(youtubeUrl),
              youtubeId && ($element.find(".jas_video-bg").remove(),
              geckoShopify.insertYoutubeVideoAsBackground($element, youtubeId)),
              jQuery(window).on("grid:items:added", function(event, $grid) {
              $element.has($grid).length && geckoShopify.jasResizeVideoBackground($element)
              })) : $element.find(".jas_video-bg").remove()
              })
              },
              insertYoutubeVideoAsBackground: function($element, youtubeId, counter) {
              if ("undefined" == typeof YT || "undefined" == typeof YT.Player)
              return counter = "undefined" == typeof counter ? 0 : counter,
              100 < counter ? void console.warn("Too many attempts to load YouTube api") : void setTimeout(function() {
              geckoShopify.insertYoutubeVideoAsBackground($element, youtubeId, counter++)
              }, 100);
              var $container = $element.prepend('<div class="jas_video-bg hidden-xs"><div class="inner"></div></div>').find(".inner");
              new YT.Player($container[0],{
                width: "100%",
                height: "100%",
                videoId: youtubeId,
                playerVars: {
                playlist: youtubeId,
                iv_load_policy: 3,
                enablejsapi: 1,
                disablekb: 1,
                autoplay: 1,
                controls: 0,
                showinfo: 0,
                rel: 0,
                loop: 1,
                wmode: "transparent"
              },
                events: {
                  onReady: function(event) {
                    event.target.mute().setLoop(!0)
                  }
                }
          }),
            geckoShopify.jasResizeVideoBackground($element),
            jQuery(window).bind("resize", function() {
            geckoShopify.jasResizeVideoBackground($element)
          })
        },
        jasResizeVideoBackground: function($element) {
          var iframeW, iframeH, marginLeft, marginTop, containerW = $element.innerWidth(), containerH = $element.innerHeight(), ratio1 = 16, ratio2 = 9;
          containerW / containerH < ratio1 / ratio2 ? (iframeW = containerH * (ratio1 / ratio2),
                                                       iframeH = containerH,
                                                       marginLeft = -Math.round((iframeW - containerW) / 2) + "px",
                                                       marginTop = -Math.round((iframeH - containerH) / 2) + "px",
                                                       iframeW += "px",
                                                       iframeH += "px") : (iframeW = containerW,
                                                                           iframeH = containerW * (ratio2 / ratio1),
                                                                           marginTop = -Math.round((iframeH - containerH) / 2) + "px",
                                                                           marginLeft = -Math.round((iframeW - containerW) / 2) + "px",
                                                                           iframeW += "px",
                                                                           iframeH += "px"),
            $element.find(".jas_video-bg iframe").css({
            maxWidth: "1000%",
            marginLeft: marginLeft,
            marginTop: marginTop,
            width: iframeW,
            height: iframeH
          });
        },
        jasExtractYoutubeId: function(url) {
          if ("undefined" == typeof url)
            return !1;
          var id = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
          return null !== id && id[1]
        },
       //   resizeElements: function() {
       //      $(".jas_section_eqh").each(function (index) {
       //         var $this = $(this),
         //           $gridImages = $this.find('.jas-product-image-equal'),
         //           $gridImagesmetro = $this.find('.jas-pr_metro-image-equal');
         //      $gridImages.css('height', 'auto').equalHeights();
         //      $gridImagesmetro.css('height', 'auto').equalHeights();
         //   });
         // },
         resizeElements: function() {

                $.fn.gecko_equlize = function(options) {

                    var settings = $.extend({
                        child: "",
                    }, options);

                    var that = this;

                    if (settings.child != '') {
                        that = this.find(settings.child);
                    }

                    var resize = function() {

                        var maxHeight = 0;
                        var height;
                        that.each(function() {
                            // $(this).attr('style', '');
                          $(this).css({'height': '' });
                            //if ($(window).width() > 767 && $(this).outerHeight() > maxHeight)
                              if ($(this).outerHeight() > maxHeight)
                                maxHeight = $(this).outerHeight();
                        });

                        that.each(function() {
                          $(this).css({'height': maxHeight+"px" });
//                             $(this).css({
//                                 Height: maxHeight
//                             });
                        });

                    }

                    $(window).bind('resize', function() {
                        resize();
                    });
                    setTimeout(function() {
                        resize();
                    }, 200);
                    setTimeout(function() {
                        resize();
                    }, 500);
                    setTimeout(function() {
                        resize();
                    }, 800);
                }

                $('.jas_section_eqh').each(function() {
                    $(this).gecko_equlize({
                        child: ' [class*=jas-col-] .jas-product-image-equal'
                    });
                    $(this).gecko_equlize({
                        child: ' [class*=jas-col-] .jas-pr_metro-image-equal'
                    });
                    $(this).gecko_equlize({
                        child: ' .page_pr_img_size .jas-pr_metro-image-equal'
                    });
                  $(this).gecko_equlize({
                        child: ' .page_pr_img_size .jas-pr_nav-image-equal'
                    });
                });
            },

          jas_map: function() {
            $(".gecko-gmap").each(function (index) {
               var $this = $(this),
                  lat = $this.data('lat'),
                  lon = $this.data('lon'),
                  icon = $this.data('icon'),
                  style = $this.data('style');
               new Maplace({
                   locations: [
                     {
                       lat: lat,
                       lon: lon,
                       title: '',
                       html: '',
                       icon: icon,
                       animation: google.maps.Animation.DROP
                     }
                   ],
                   controls_on_map: false,
                   title: '',
                   map_div: $this,
                   start: 1,
                   map_options: {
                   zoom: 15,
                   scrollwheel: false                   
                 },
                  styles: {
                     'Custom style': style
                  }
                  }).Load();
           });
         },

         instagram: function() {
            //if( ! $('body').hasClass('template-index') ) return;
           $(".jas_instagram_section").each(function (index) {
             var ul_ins = $(this),
                  user_name = ul_ins.data('username'),
                  limit = ul_ins.data('limit'),
                  target = ul_ins.data('target'),
                  ul_ins_slider = ul_ins.find(".ins-jas-carousel"),
                  ul_ins_html = ul_ins.find(".jas-instagram-pics");
               if ("no_user_name_xxx" == user_name) return;
                 $.ajax({
                   url: 'https://api.teathemes.net/instagram?username='+user_name,
                   dataType: 'json',
                   type: 'GET',
                   success: function(responsive) {
                     //console.log(responsive);
                     var html = '',
                         img_url = null,
                         data = responsive.entry_data.ProfilePage[0].user.media.nodes;
                     $.each(data,function(index,element){
                       if(index >= limit ) return 0;
                       var img_url_150 = element.thumbnail_resources[0].src,
                       img_url_240 = element.thumbnail_resources[1].src,
                       img_url_320 = element.thumbnail_resources[2].src,
                       img_url_480 = element.thumbnail_resources[3].src,
                       img_url_640 = element.thumbnail_resources[4].src;
                       html += '<div class="item pr fl"><a class="db pr oh" href="//instagram.com/p/'+element.code+'" target="'+target+'"><img src="'+img_url_150+'" data-src="'+img_url_150+'" data-sizes="auto" data-srcset="'+img_url_150+' 150w,'+img_url_240+' 240w,'+img_url_320+' 320w,'+img_url_480+' 480w,'+img_url_640+' 640w" class="w__100 lazyload" alt="'+user_name+'"><div class="jas-wrap-lazy"></div><div class="info pa tc flex ts__03 center-xs middle-xs"><span class="pr cw mgr10"><i class="fa fa-heart-o mr__5"></i>'+element.likes.count+'</span><span class="pr cw"><i class="fa fa-comments-o mr__5"></i>'+element.comments.count+'</span></div></a></div>';
                     });
                     ul_ins_html.html(html);
                   },
                   error: function(data) {
                     console.log('ajax error');
                   },
                   complete: function() {
                     if ( typeof ul_ins_slider !== 'undefined' ) {
                        ul_ins_slider.not( '.slick-initialized' ).slick();
                      }
                   }
                 }); 
           });
         },
         
         initMegaMenu: function() {
            if( $(window).width() <= 1024 ) return;
    //         var $megaMenu = jQuery('#jas-header .jas-menu .mega-menu');
            // if($megaMenu.length) {
            //    var windowWidth = jQuery('body').innerWidth();
            //    if (windowWidth > 1024) {
            //       $megaMenu.each(function(){
            //          var $thisMegaMenu = jQuery(this);
            //          //temporary showing mega menu to propper size calc
            //          var thisWidth = $thisMegaMenu.outerWidth();
            //          var thisOffset = $thisMegaMenu.offset().left;
            //          var thisLeft = (thisOffset + (thisWidth/2)) - windowWidth/2;
            //          console.log(thisOffset)
            //          if( thisWidth >= thisLeft) {
    //                     $thisMegaMenu.css('left', -thisLeft);
            //          }
            //          // if(!$thisMegaMenu.closest('ul').hasClass('jas-menu')) {
            //          //    $thisMegaMenu.css('left', '');
            //          // }
            //       });
            //    }
            // }
            var $window = $(window),
                    $header = $('#jas-header'),
                    mainMenu = $('.menu-section').find('ul.jas-menu'),
                    lis = mainMenu.find(' > li.menu_has_offsets');


                mainMenu.on('hover', ' > li', function(e) {
                    setOffset( $(this) );
                });

                var setOffset = function( li ) {

                    var dropdown = li.find(' > .mega-menu'),
                        siteWrapper = $('#jas-wrapper');


                    dropdown.attr('style', '');

                    var dropdownWidth = dropdown.outerWidth(),
                        dropdownOffset = dropdown.offset(),
                        screenWidth = $window.width(),
                        bodyRight = siteWrapper.outerWidth() + siteWrapper.offset().left,
                        viewportWidth = ( $('body').hasClass('wrapper-boxed') || $('body').hasClass('wrapper-boxed-small') ) ? bodyRight : screenWidth;

                        if( ! dropdownWidth || ! dropdownOffset ) return;
                        if( dropdownWidth >= 0 && li.hasClass( 'menu-center' ) && ! $header.hasClass('header-7') ) {
                            // If right point is not in the viewport
                            console.log('center');
                            console.log(li)
                            var toLeft = (dropdownOffset.left + (dropdownWidth/2)) - screenWidth/2;

                            dropdown.css({
                                left: - toLeft 
                            });

                            var beforeSelector = '.' + li.attr('class').split(' ').join('.') + '> .sub-menu-dropdown:before',
                                arrowOffset = toLeft + li.width()/2;

                        } else if( $('body').hasClass('rtl') && dropdownOffset.left <= 0 && li.hasClass( 'menu_has_offsets' ) && ! $header.hasClass('header-7') ) {
                            // If right point is not in the viewport
                            var toLeft = - dropdownOffset.left;

                            dropdown.css({
                                right: - toLeft - 16
                            });

                            var beforeSelector = '.' + li.attr('class').split(' ').join('.') + '> .sub-menu-dropdown:before',
                                arrowOffset = toLeft + li.width()/2;

                        } else if( dropdownOffset.left + dropdownWidth >= viewportWidth && li.hasClass( 'menu_has_offsets' ) && ! $header.hasClass('header-7') ) {
                            // If right point is not in the viewport
                            var toRight = dropdownOffset.left + dropdownWidth - viewportWidth;

                            dropdown.css({
                                left: - toRight - 16
                            });

                            var beforeSelector = '.' + li.attr('class').split(' ').join('.') + '> .sub-menu-dropdown:before',
                                arrowOffset = toRight + li.width()/2;

                        }

                        // Vertical header fit
                        if( $header.hasClass('header-vertical') ) {

                            var bottom = dropdown.offset().top + dropdown.outerHeight(),
                                viewportBottom = $window.scrollTop() + $window.outerHeight();

                            if( bottom > viewportBottom ) {
                                dropdown.css({
                                    top: viewportBottom - bottom - 10
                                });
                            }
                        }
                };

                lis.each(function() {
                    setOffset( $(this) );
                    //$(this).addClass('with-offsets');
                });
         },
         ajaxchimp: function() {
              $('form.jas_ajax_mcsp [type="submit"]').bind('click', function ( event ) {
                  var $form = $(this).closest('form.jas_ajax_mcsp'),
                      $result = $form.find('.mc4wp-response'),
                      $button = $(this);
                  if ( event ) event.preventDefault();
                  // if ( validate_input($form) ) { register($form); }
                  $result.hide(100);
                  $button.val(gecko_settings.mc_subscribing).html(gecko_settings.mc_subscribing);
                  register($form,$result,$button);
              });
         function register($form,$result,$button) {
        console.log($button)
            $.ajax({
                  type: "GET",
                 url: $form.attr('action'),
                 data: $form.serialize(),
                 cache       : false,
                 dataType    : 'jsonp',
                 jsonp: "c",
                 contentType: "application/json; charset=utf-8",
                 error       : function(err) { 
                    $button.val(gecko_settings.mc_submit).html(gecko_settings.mc_submit);
                     var messenger = err.replace('0 - ','').replace('1 - ','').replace('2 - ','');
                    $result.html('<div class="shopify-error">'+messenger+'</div>').show(100); 
                 },
                 success     : function(data) {
                     $button.val(gecko_settings.mc_submit).html(gecko_settings.mc_submit);
                     var messenger = data.msg.replace('0 - ','').replace('1 - ','').replace('2 - ','');
                     if (data.result != "success") {
                        $result.html('<div class="shopify-warning">'+messenger+'</div>').show(100);
                     } else {
                        $result.html('<div class="shopify-message">'+messenger+'</div>').show(100);
                     }
                 }
            });
         }
       },
       favicon_counter: function(badge) {
         if( gecko_settings.favicon_counter == 'no' ) return;
          var favicon = new Favico({
           animation : gecko_settings.favanimation,
            bgColor : gecko_settings.favbgColor,
            textColor : gecko_settings.favtextColor
         });
         favicon.badge(badge);
       },
      checkoutIndicator : function() {
        if( gecko_settings.use_agree_checkbox == 'no' ) return;
        $(".jas_agree").click(function () {
          if ($(':checked').length) {
           // $(this).prop('checked', false);
            $(this).closest('.form_jas_agree').removeClass('pe_none');
          } else {
            //$(this).prop('checked', true);
            $(this).closest('.form_jas_agree').addClass('pe_none');
          }
       });
       $('body').on('click', '[name="checkout"], [name="goto_pp"], [name="goto_gc"], .additional-checkout-buttons', function(evt) {
         console.log(! $(this).closest('.form_jas_agree').hasClass('jas_checkout'))
         // evt.preventDefault();
         if( ! $(this).closest('.form_jas_agree').hasClass('jas_checkout')) return;
            if ($(this).closest('.form_jas_agree').find('.jas_agree').is(':checked')) {
              $(this).submit();
            }
            else {
               var html = [
                   '<div class="added-to-cart">',
                       '<p>' + gecko_settings.conditions + '</p>',
                   '</div>',
               ].join("");
               $.magnificPopup.open({
                   callbacks: {
                       beforeOpen: function() {
                           this.st.mainClass = geckoTheme.popupEffect + '  cart-popup-wrapper';
                       },
                   },
                   items: {
                       src: '<div class="white-popup add-to-cart-popup popup-added_to_cart jas_agree_checkout">' + html + '</div>',
                       type: 'inline'
                   }
               });

               $('.white-popup').on('click', '.close-popup', function(e) {
                   e.preventDefault();
                   $.magnificPopup.close();
               });
              return false;
            }
          });
      },

      // Add to cart popup
      wcPopupAddtocart : function() {
         if( ! $('body').hasClass( 'jas_action_popup_upsell' ) ) return;

         $( 'body' ).on( 'click', '.ajax_modal_add', function( e ) {
            e.preventDefault();

            var _btn = $( this ),
                _id = _btn.data( 'pid' );

            $( '.cart__popup' ).addClass( 'loading' );
            $.ajax({
                type: 'POST',
                url: '/cart/add.js',
                data: {quantity: 1, id:_id},
                dataType: 'json',
                success: function(cart) { 
                    jQuery.get('/cart?view=upsell', function(data) {
                        $('#content_cart__popup_nt').html(data);
                    }).always(function(data) {
                        var $cookieCurrency = gl_Currency.cookie.read();
                        if (gecko_settings.show_multiple_currencies && $cookieCurrency !== null) {
                          Currency.convertAll(shopCurrency, $cookieCurrency, '#content_cart__popup_nt span.money');
                        }
                        geckoShopify.nanoScroller();
                        $( '.cart__popup' ).removeClass( 'loading' );
                     });
                    $.get('/cart?view=json', function(data) {
                       /*optional stuff to do after success */
                           $('.widget_shopping_cart_content').html(data);
                       }).always(function() {
                           var subtotal = parseFloat($('.widget_shopping_cart_body').data('subtotal'));
                           $(".gecko-cart-subtotal >span").html(Shopify.formatMoney(subtotal, gecko_settings.moneyFormat));
                           $(".cartCount").html($('.widget_shopping_cart_body').data('count'));
                            geckoShopify.favicon_counter(parseInt($('.widget_shopping_cart_body').data('count')));
                           geckoShopify.nanoScroller();
                           var $cookieCurrency = gl_Currency.cookie.read();
                           if (gecko_settings.show_multiple_currencies && $cookieCurrency !== null) {
                             Currency.convertAll(shopCurrency, $cookieCurrency, '.widget_shopping_cart_content span.money');
                             Currency.convertAll(shopCurrency, $cookieCurrency, '.gecko-cart-subtotal  span.money');
                           }
                       });
                },
                error: function(XMLHttpRequest, textStatus) {
                  geckoShopify.onError(XMLHttpRequest, textStatus);
                  $( '.cart__popup' ).removeClass( 'loading' );
                }
              });
         })

         function wcPopupUpdateCart( _id, new_qty ) {
            $( '.cart__popup' ).addClass( 'loading' );
            $.ajax({
                type: 'POST',
                url: '/cart/change.js',
                data:  'quantity='+new_qty+'&id='+_id,
                dataType: 'json',
                success: function(cart) { 
                    jQuery.get('/cart?view=up_ajax', function(data) {
                     //$('#push_cart_items').html(data);
                        data = jQuery(data);
                        var sdata = jQuery(data);
                        var t_html = jQuery(sdata.get(0)).html(),
                            t_threshold = jQuery(sdata.get(1)).html(),
                            t_total = $('.cart__popup #'+_id).find('.cart__popup-total .amount');
                           $('.cart__popup #'+_id).find('.cart__popup-qty--input').val(new_qty);
                           var price = parseFloat( t_total.data('price') )*new_qty;
                           t_total.html(Shopify.formatMoney(price, gecko_settings.moneyFormat));
                           $('#cart__popup_total').html(t_html);
                           $('#threshold_bar_popup').html(t_threshold);
                    }).always(function() {
                           var $cookieCurrency = gl_Currency.cookie.read();
                           if (gecko_settings.show_multiple_currencies && $cookieCurrency !== null) {
                             Currency.convertAll(shopCurrency, $cookieCurrency, '#content_cart__popup_nt span.money');
                           }
                           geckoShopify.nanoScroller();
                           $('.cart__popup #undo-'+_id).find('.cart__popup-qty--input').val(new_qty);
                           $( '.cart__popup' ).removeClass( 'loading' );
                       });
                    $.get('/cart?view=json', function(data) {
                       /*optional stuff to do after success */
                           $('.widget_shopping_cart_content').html(data);
                       }).always(function() {
                           var subtotal = parseFloat($('.widget_shopping_cart_body').data('subtotal'));
                           $(".gecko-cart-subtotal >span").html(Shopify.formatMoney(subtotal, gecko_settings.moneyFormat));
                           $(".cartCount").html($('.widget_shopping_cart_body').data('count'));
                            geckoShopify.favicon_counter(parseInt($('.widget_shopping_cart_body').data('count')));
                           geckoShopify.nanoScroller();
                           var $cookieCurrency = gl_Currency.cookie.read();
                           if (gecko_settings.show_multiple_currencies && $cookieCurrency !== null) {
                             Currency.convertAll(shopCurrency, $cookieCurrency, '.widget_shopping_cart_content span.money');
                             Currency.convertAll(shopCurrency, $cookieCurrency, '.gecko-cart-subtotal  span.money');
                           }
                       });
                },
                error: function(XMLHttpRequest, textStatus) {
                  geckoShopify.onError(XMLHttpRequest, textStatus);
                  $( '.cart__popup' ).removeClass( 'loading' );
                }
              });
         }
         $( 'body' ).on( 'change','.cart__popup-qty--input', function( e ) {
            var _this   = $( this ),
               _id   = _this.attr( 'data-id' ),
               new_qty = parseInt( _this.val( ) ),
               _min    = parseInt( _this.attr( 'min' ) ),
               _step   = parseInt( _this.attr( 'step' ) ),
               _max    = parseInt( _this.attr( 'max' ) ),
               invalid = false;
            if ( new_qty === 0 ) {
               var las_qty = parseInt( _this.attr('value'));
               _this.val(las_qty);
               _this.parents( '.cart__popup-item' ).find( '.cart__popup-remove' ).trigger( 'click' );
               return;

            } else if ( isNaN( new_qty ) || new_qty < 0 ) {
               invalid = true;

            } else if ( new_qty > _max && _max > 0 ) {
               _this.val(_max); 
               alert( 'Maximum Quantity: ' + _max );
               return;

            } else if ( new_qty < _min ) {
               invalid = true;

            } else if ( ( new_qty % _step ) !== 0 ) {
               alert( 'Quantity can only be purchased in multiple of ' + _step );
               invalid = true;

            } else {
               wcPopupUpdateCart( _id, new_qty );
            }

            if ( invalid === true ) {
               _this.val( 1 );
            }
         });

         $( 'body' ).on( 'click', '.cart__popup-qty' ,function(e) {
            e.preventDefault();
            var _this     = $(this),
               _qty      = _this.siblings( '.cart__popup-qty--input' ),
                _id   = _qty.attr( 'data-id' ),
               _qtyinput = parseFloat( _qty.val() ),
               _step     = parseFloat( _qty.attr( 'step' ) ),
               _min      = parseFloat( _qty.attr( 'min' ) ),
               _max      = parseFloat( _qty.attr( 'max' ) );

            _qty.trigger( 'focusin' );
            console.log(_step)
            console.log(_qtyinput)
            if ( _this.hasClass( 'cart__popup-qty--plus' ) ) {
               var _newqty = _qtyinput + _step;
               console.log(_newqty)
               if ( _newqty > _max && _max > 0 ) {
                  _qty.val(_max); 
                  alert( 'Maximum Quantity: ' + _max );
                  return;
               }
            } else if ( _this.hasClass( 'cart__popup-qty--minus' ) ) {
               var _newqty = _qtyinput - _step;
               console.log(_newqty)
               if ( _newqty === 0 ) {
                  var las_qty = parseInt( _qty.attr('value'));
                  _qty.val(las_qty);
                  _this.parents( '.cart__popup-item' ).find( '.cart__popup-remove' ).trigger( 'click' );
                  return;
               } else if ( _newqty < _min ) {
                  return;
               } else if ( _qtyinput < 0 ) {
                  alert( 'Invalid' );
                  return;
               }
            }
            console.log(_id)
            wcPopupUpdateCart( _id, _newqty );
         })

         // Remove item from the cart
         $( 'body' ).on( 'click', '.cart__popup-remove',function(e) {
            e.preventDefault();
            $( '.cart__popup' ).addClass( 'loading' );

            var _this    = $( this ),
               _qty      = _this.siblings( '.cart__popup-quantity' ).find('.cart__popup-qty--input'),
                _id   = _this.find('a').attr( 'data-product_id' ),
               _qtyinput = parseInt( _qty.val() );

            $( '.cart__popup' ).addClass( 'loading' );
            $.ajax({
                type: 'POST',
                url: '/cart/change.js',
                data:  'quantity=0&id='+_id,
                dataType: 'json',
                success: function(cart) { 
                    jQuery.get('/cart?view=up_ajax', function(data) {
                    }).always(function(data) {
                           data = jQuery(data);
                           var sdata = jQuery(data);
                           var t_html = jQuery(sdata.get(0)).html(),
                               t_threshold = jQuery(sdata.get(1)).html();;
                                    $('#cart__popup_total').html(t_html);
                                    $('#threshold_bar_popup').html(t_threshold);
                              $('.cart__popup #'+_id).addClass('hide');
                              if (_qtyinput > 0 ) {$('#'+_id+' input').val(_qtyinput)
                              }else{
                                 $('.cart__popup #'+_id+' input').val(1)
                              }
                              $('#undo-'+_id).removeClass('hide');
                              var $cookieCurrency = gl_Currency.cookie.read();
                              if (gecko_settings.show_multiple_currencies && $cookieCurrency !== null) {
                                Currency.convertAll(shopCurrency, $cookieCurrency, '#content_cart__popup_nt span.money');
                              }
                              geckoShopify.nanoScroller();
                           $( '.cart__popup' ).removeClass( 'loading' );
                       });
                    $.get('/cart?view=json', function(data) {
                       /*optional stuff to do after success */
                           $('.widget_shopping_cart_content').html(data);
                       }).always(function() {
                          var subtotal = parseFloat($('.widget_shopping_cart_body').data('subtotal'));
                           $(".gecko-cart-subtotal >span").html(Shopify.formatMoney(subtotal, gecko_settings.moneyFormat));
                           $(".cartCount").html($('.widget_shopping_cart_body').data('count'));
                            geckoShopify.favicon_counter(parseInt($('.widget_shopping_cart_body').data('count')));
                           geckoShopify.nanoScroller();
                           var $cookieCurrency = gl_Currency.cookie.read();
                           if (gecko_settings.show_multiple_currencies && $cookieCurrency !== null) {
                             Currency.convertAll(shopCurrency, $cookieCurrency, '.widget_shopping_cart_content span.money');
                             Currency.convertAll(shopCurrency, $cookieCurrency, '.gecko-cart-subtotal  span.money');
                           }
                       });
                },
                error: function(XMLHttpRequest, textStatus) {
                  geckoShopify.onError(XMLHttpRequest, textStatus);
                  $( '.cart__popup' ).removeClass( 'loading' );
                }
              });
         });

         // Undo the product removed
         $( 'body' ).on( 'click', '.cart__popup-undo', function(e) {
            e.preventDefault();
            var _this   = $( this ),
               _id   = _this.attr( 'data-id' ),
               _qty = $('.cart__popup #'+_id).find('.cart__popup-qty--input').val( ),
               new_qty = parseInt(_qty);
            $( '.cart__popup' ).addClass( 'loading' );
            $.ajax({
             type: 'POST',
             url: '/cart/add.js',
             data: {quantity: new_qty, id:_id},
             dataType: 'json',
             success: function(cart) { 
                 jQuery.get('/cart?view=up_ajax', function(data) {
                 }).always(function(data) {
                  data = jQuery(data);
                  var sdata = jQuery(data);
                  var t_html = jQuery(sdata.get(0)).html(),
                      t_threshold = jQuery(sdata.get(1)).html();;
                        $('#cart__popup_total').html(t_html);
                        $('#threshold_bar_popup').html(t_threshold);
                        $('#undo-'+_id).addClass('hide');
                        $('.cart__popup #'+_id).removeClass('hide');
                        var $cookieCurrency = gl_Currency.cookie.read();
                        if (gecko_settings.show_multiple_currencies && $cookieCurrency !== null) {
                          Currency.convertAll(shopCurrency, $cookieCurrency, '#content_cart__popup_nt span.money');
                        }
                        geckoShopify.nanoScroller();
                        $( '.cart__popup' ).removeClass( 'loading' );
                    });
                 $.get('/cart?view=json', function(data) {
                    /*optional stuff to do after success */
                        $('.widget_shopping_cart_content').html(data);
                    }).always(function() {
                        var subtotal = parseFloat($('.widget_shopping_cart_body').data('subtotal'));
                           $(".gecko-cart-subtotal >span").html(Shopify.formatMoney(subtotal, gecko_settings.moneyFormat));
                        $(".cartCount").html($('.widget_shopping_cart_body').data('count'));
                         geckoShopify.favicon_counter(parseInt($('.widget_shopping_cart_body').data('count')));
                        geckoShopify.nanoScroller();
                        var $cookieCurrency = gl_Currency.cookie.read();
                        if (gecko_settings.show_multiple_currencies && $cookieCurrency !== null) {
                          Currency.convertAll(shopCurrency, $cookieCurrency, '.widget_shopping_cart_content span.money');
                          Currency.convertAll(shopCurrency, $cookieCurrency, '.gecko-cart-subtotal  span.money');
                        }
                    });
             },
             error: function(XMLHttpRequest, textStatus) {
               geckoShopify.onError(XMLHttpRequest, textStatus);
               $( '.cart__popup' ).removeClass( 'loading' );
             }
           });
         });
      },
      }
   }());
})( jQuery );

jQuery(document).ready(function() {
   FastClick.attach(document.body);
   geckoShopify.init();
   $( '.jas-carousel-menu' ).not( '.slick-initialized' ).slick();
});
jQuery( window ).resize(function() {
   //geckoShopify.initMegaMenu();
  //geckoShopify.initStickyMenu();
});
jQuery( window ).load( function() {
   $('.jas-masonry').isotope('layout');
                  setTimeout(function(){$('.jas-masonry').isotope('layout');}, 500);
            setTimeout(function(){$('.jas-masonry').isotope('layout');}, 1000);
   geckoShopify.instagram();
   geckoShopify.jas_pr_recent();
   //geckoShopify.shopMasonry();
   //geckoShopify.lazyload();
});
// document.addEventListener("DOMContentLoaded", function(event) {
//     console.log("DOM fully loaded and parsed");
//   });
jQuery(document)
  .on('shopify:section:load', geckoShopify.shopMasonry)
  .on('shopify:section:unload', geckoShopify.shopMasonry)
  .on('shopify:section:select', geckoShopify.shopMasonry)
  .on('shopify:section:deselect', geckoShopify.shopMasonry)
  .on('shopify:block:select',geckoShopify.shopMasonry)
  .on('shopify:block:deselect', geckoShopify.shopMasonry);
jQuery(document)
  .on('shopify:section:load', geckoShopify.initMasonry)
  .on('shopify:section:unload', geckoShopify.initMasonry)
  .on('shopify:section:select', geckoShopify.initMasonry)
  .on('shopify:section:deselect', geckoShopify.initMasonry)
  .on('shopify:block:select',geckoShopify.initMasonry)
  .on('shopify:block:deselect', geckoShopify.initMasonry);
jQuery(document)
  .on('shopify:section:load', geckoShopify.initCountdown)
  .on('shopify:section:unload', geckoShopify.initCountdown);
jQuery(document)
  .on('shopify:section:load', geckoShopify.resizeElements)
  .on('shopify:section:unload', geckoShopify.resizeElements)
  .on('shopify:section:select', geckoShopify.resizeElements)
  .on('shopify:section:deselect', geckoShopify.resizeElements);
jQuery(document)
  .on('shopify:section:load', geckoShopify.initCarousel)
  .on('shopify:section:unload', geckoShopify.initCarousel)
  .on('shopify:block:select',geckoShopify.initCarousel)
  .on('shopify:block:deselect', geckoShopify.initCarousel);
 jQuery(document)
  .on('shopify:section:load', geckoShopify.fullHeightRow)
  .on('shopify:section:unload', geckoShopify.fullHeightRow);
jQuery(document)
  .on('shopify:section:load', geckoShopify.initVideoBackgrounds)
  .on('shopify:section:unload', geckoShopify.initVideoBackgrounds);
jQuery(document)
  .on('shopify:section:load', geckoShopify.parallax)
  .on('shopify:section:unload', geckoShopify.parallax)
  .on('shopify:block:select',geckoShopify.parallax)
  .on('shopify:block:deselect', geckoShopify.parallax);
jQuery(document)
  .on('shopify:section:load', geckoShopify.instagram)
  .on('shopify:section:unload', geckoShopify.instagram);
jQuery(document)
  .on('shopify:section:load', geckoShopify.jas_map)
  .on('shopify:section:unload', geckoShopify.jas_map)
  .on('shopify:block:select',geckoShopify.jas_map)
  .on('shopify:block:deselect', geckoShopify.jas_map);
jQuery(document)
  .on('shopify:section:load', geckoShopify.initMegaMenu)
  .on('shopify:section:unload', geckoShopify.initMegaMenu)
  .on('shopify:block:select',geckoShopify.initMegaMenu)
  .on('shopify:block:deselect', geckoShopify.initMegaMenu);
  