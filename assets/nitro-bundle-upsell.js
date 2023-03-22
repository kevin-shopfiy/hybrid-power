function JqueryNitroBundle(){!function($){"use strict";var Nitrobase64={PADCHAR:"=",ALPHA:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",makeDOMException:function(){try{return new DOMException(DOMException.INVALID_CHARACTER_ERR)}catch(t){var e=new Error("DOM Exception 5");return e.code=e.number=5,e.name=e.description="INVALID_CHARACTER_ERR",e.toString=function(){return"Error: "+e.name+": "+e.message},e}},getbyte64:function(t,e){var n=Nitrobase64.ALPHA.indexOf(t.charAt(e));if(-1===n)throw Nitrobase64.makeDOMException();return n},decode:function(t){t=""+t;var e,n,r,a=Nitrobase64.getbyte64,o=t.length;if(0===o)return t;if(o%4!=0)throw Nitrobase64.makeDOMException();e=0,t.charAt(o-1)===Nitrobase64.PADCHAR&&(e=1,t.charAt(o-2)===Nitrobase64.PADCHAR&&(e=2),o-=4);var i=[];for(n=0;n<o;n+=4)r=a(t,n)<<18|a(t,n+1)<<12|a(t,n+2)<<6|a(t,n+3),i.push(String.fromCharCode(r>>16,r>>8&255,255&r));switch(e){case 1:r=a(t,n)<<18|a(t,n+1)<<12|a(t,n+2)<<6,i.push(String.fromCharCode(r>>16,r>>8&255));break;case 2:r=a(t,n)<<18|a(t,n+1)<<12,i.push(String.fromCharCode(r>>16))}return i.join("")},getbyte:function(t,e){var n=t.charCodeAt(e);if(255<n)throw Nitrobase64.makeDOMException();return n}},NITRO_BUNDLE_SERVER="https://bundle.teathemes.net/shopify",ORDER_BUNDLE_SERVER=NITRO_BUNDLE_SERVER+"/order",CHECKOUT_SELECTOR=["[onclick$='checkout']","input[name='checkout']","button[name='checkout']","[href$='checkout']","input[name='goto_pp']","button[name='goto_pp']","input[name='goto_gc']","button[name='goto_gc']",".additional-checkout-button",".google-wallet-button-holder",".amazon-payments-pay-button",".nitro-bundle-payments",".nitro-bundle-checkout"],CART_SERVER=NITRO_BUNDLE_SERVER+"/cart",CHECKOUT_SERVER=NITRO_BUNDLE_SERVER+"/checkout",DEBUG=!0;CHECKOUT_SELECTOR="object"==typeof NITRO_CHECKOUT_SELECTOR?NITRO_CHECKOUT_SELECTOR:CHECKOUT_SELECTOR,CHECKOUT_SELECTOR.push(".nitro-bundle-checkout");var isStorage="undefined"!=typeof Storage,NitrosessionStorage={set:function(t,e){isStorage&&sessionStorage.setItem(t,e)},get:function(t){return!("string"!=typeof t||!sessionStorage[t])&&sessionStorage.getItem(t)},isset:function(t){return!!sessionStorage[t]}};function Debug(t){"string"==typeof t?console.log("%c"+t,"color: rgb(255, 145, 145); font-size: 40px; background-color: rgb(120, 120, 120); text-shadow: rgb(3, 3, 3) 4px 4px 4px;"):DEBUG&&console.log(t)}function translator(t,e){return void 0!==NITRO_BUNDLE.translate[t]?void 0===e?NITRO_BUNDLE.translate[t].replace(/\%s/g,""):NITRO_BUNDLE.translate[t].replace(/\%s/g,e):""}function decode(t){if("object"==typeof t)return t;var e=t.substring(0,5);return"undefined"==typeof atob?Nitrobase64.decode(t.replace(e,"")+e):atob(t.replace(e,"")+e)}function reverse(t){return t.split("").reverse().join("")}function CheckOutWithCart(){swal({title:translator("processing"),html:translator("please_wait"),width:600}),swal.enableLoading(),Shopify.BundlegetCart(function(t){if(1<t.item_count){var n=!1;$.each(t.items,function(t,e){if(null!=e.properties&&"string"==typeof e.properties.bundle)return n=!0,1}),n?$.post(ORDER_BUNDLE_SERVER,{cart:t,shop:Shopify.shop},function(t,e,n){"success"==e?"success"===t.status?(swal({type:"success",title:translator("order_created_success_title"),html:translator("order_created_success_message"),timer:5e3,showCancelButton:!1,showConfirmButton:!1}),setTimeout(function(){location.href=t.invoice_url},3e3)):0===t.status?swal({type:"warning",title:translator("title_order_error"),html:t.message,timer:5e3,showCancelButton:!1,showConfirmButton:!1}):(Debug(t),swal({type:"error",title:translator("title_order_error"),html:translator("send_data_error"),timer:5e3,showCancelButton:!1,showConfirmButton:!1})):(swal({type:"error",title:translator("title_order_error"),html:translator("send_data_error"),timer:5e3,showCancelButton:!1,showConfirmButton:!1}),setTimeout(function(){location.href="/checkout"},3e3))}):location.href="/checkout"}else location.href="/checkout"})}Shopify.addItems=function(data,callback){var quantity=quantity||1,params={type:"POST",url:"/cart/add.js",data:jQuery.param(data),dataType:"json",success:function(t){"function"==typeof callback&&callback(t)},error:function(XMLHttpRequest,textStatus){var data=eval("("+XMLHttpRequest.responseText+")");alert(data.message+"("+data.status+"): "+data.description),swal.close()}};jQuery.ajax(params)},Shopify.BundleresizeImage=function(e,t){try{if("original"==t)return e;var n=e.match(/(.*\/[\w\-\_\.]+)\.(\w{2,4})/);return n[1]+"_"+t+"."+n[2]}catch(t){return e}},Shopify.Bundleclear=function(e){var t={type:"POST",url:"/cart/clear.js",data:"",dataType:"json",success:function(t){"function"==typeof e&&e(line_item)}};jQuery.ajax(t)},Shopify.BundlegetProduct=function(t,n){jQuery.getJSON("/products/"+t+".js",function(t,e){"function"==typeof n&&n(t)})},Shopify.BundlegetCart=function(n){jQuery.getJSON("/cart.js",function(t,e){"function"==typeof n&&n(t)})},$("body").on("click",CHECKOUT_SELECTOR.join(","),function(t){t.preventDefault(),CheckOutWithCart()}),$.fn.NitroBundle=function(t){var d=this;function h(t,e){if(null==e)return 0;for(var n=e.length,r=0;r<n;r++)if(e[r].id==t)return e[r].price;return 0}function s(e){e.rule="string"==typeof e.rule?JSON.parse(decode(e.rule)):e.rule,e.variants=e.variants;var n=[],r="";d.find(".bundle-checkbox:checked").each(function(){var t=$(this);n[t.data("key")]={id:t.data("pid"),value:t.val(),quantity:$(t.data("quantity")).val()},r+=t.data("key")}),r=parseInt(r.split("").sort().join(""));var t=e.rule.keys,a=0;for(var o in n){var i=isNaN(parseInt(n[o].quantity))?1:parseInt(n[o].quantity);if("string"==typeof e.variants)try{e.variants=JSON.parse(decodeURIComponent(e.variants))}catch(t){console.log(t),e.variants={}}a+=h(n[o].value,e.variants[n[o].id])*i}if(d.find(".bundle-addition-info").html(""),0<=t.indexOf(r))switch(d.find(".nitro-bundle-subtotal").html(Shopify.convertWithCurrency(a)),d.find(".nitro-bundle-saved").html(""),e.rule.type[r]){case"amount":var s=a-(u=100*(isNaN(parseFloat(e.rule.value[r]))?0:parseFloat(e.rule.value[r])))<0?0:a-u;d.find(".nitro-bundle-saved").html(s<a?"<del>"+Shopify.convertWithCurrency(a)+"</del> (Saved: "+Shopify.convertWithCurrency(a-s)+")":""),d.find(".nitro-bundle-subtotal").html(Shopify.convertWithCurrency(s)),d.find(".bundle-addition-info").html(translator("get_discount_amount",Shopify.convertWithCurrency(u)));break;case"percent":var u;s=a-a*(u=isNaN(parseFloat(e.rule.value[r]))?0:parseFloat(e.rule.value[r]))/100;d.find(".nitro-bundle-saved").html(s<a?"<del>"+Shopify.convertWithCurrency(a)+"</del> (Saved: "+Shopify.convertWithCurrency(a-s)+")":""),d.find(".nitro-bundle-subtotal").html(Shopify.convertWithCurrency(s)),d.find(".bundle-addition-info").html(translator("get_discount_amount",u+" %"));break;case"product":var c=e.rule.value[r];if(0<c.indexOf("|")){var l=c.split(" ");d.find(".bundle-addition-info").html("<h5>"+translator("get_free_product")+'</h5><ul class="bundle-got-product"></ul>'),$.each(l,function(t,e){0<e.indexOf("|")&&Shopify.BundlegetProduct(e.split("|")[1],function(t){d.find(".bundle-addition-info ul").append('<li><img src="'+Shopify.BundleresizeImage(t.featured_image,"medium")+'" width="50"/><a target="_blank" href="'+t.url+'">'+t.title+"</a></li>")})})}else d.find(".bundle-addition-info").html("<h5>"+translator("products_do_not_have_discount")+"</h5>");break;case"discount":d.find(".bundle-addition-info").html("<h5>"+translator("get_discount_code")+"</h5>");break;case"shipping":d.find(".bundle-addition-info").html("<h5> "+translator("get_free_shipping")+"</h5>")}else d.find(".nitro-bundle-subtotal").html(Shopify.convertWithCurrency(a)),d.find(".nitro-bundle-saved").html(""),d.find(".bundle-addition-info").html("")}t=$.extend({rows:"#rows"},t),function(){var t={items:"",handles:"",bid:0,rule:"",variants:"",start:new Date,end:new Date},e=d.find(".bundle-add-to-cart"),n=d.find(".bundle-checkout-now");if(new Date(d.data("end"))<new Date&&d.data("end")!=d.data("start"))return d.closest(".nitro-bundle-section").hide();var i=jQuery.extend({},t,d.data());d.find(".bundle-variant-select").bind("change",function(){var t=$(this),e=$(t.data("target")),n=t.val();e.val(n);var r=e.data("pid");if(void 0!==i.variants[r]){var a=i.variants[r];for(var o in a)if(a[o].id==n){t.closest(".bundle-item").find(".current-price").html(Shopify.convertWithCurrency(a[o].price));break}}$(t.data("target")).is(":checked")&&s(i)}),d.find(".bundle-item").click(function(t){var e=$(this);if($(t.target).is('a,select,input[type="checkbox"],.control__indicator'))return 1;e.find("input:checked").length?e.find("input:checked:not(:disabled)").prop("checked",!1).trigger("change"):e.find('input[type="checkbox"]:not(:disabled)').prop("checked",!0).trigger("change")}),d.find(".bundle-checkbox").on("change",function(){$(this),s(i)}),d.find('input[name="quantity"]').bind("change keyup",function(){var t=$(this);(isNaN(parseInt(t.val()))||parseInt(t.val())<1)&&t.val(1),$(t.data("target")).is(":checked")&&s(i)}),e.on("click",function(){if(new Date(i.start)>new Date||new Date(i.end)<new Date)swal({type:"info",html:"<p>"+(new Date(i.start)>new Date?translator("button_click_prepare_start"):translator("button_click_campaign_end"))+"</p>",title:"Info!",timer:5e3,showCancelButton:!1,showConfirmButton:!1});else{swal({title:translator("processing"),width:600}),swal.enableLoading();var r=[],a="";d.find(".bundle-checkbox:checked").each(function(t,e){var n=$(this);r.push({id:n.val(),quantity:$(n.data("quantity")).val()}),a+=n.data("key")}),a=parseInt(a.split("").sort().join(""));var e=function(){if(1<r.length){var t=r.pop();Shopify.addItems({id:t.id,quantity:t.quantity,properties:{pid:r[0].id}},function(){e()})}else 0<r.length&&(t=r.pop(),Shopify.addItems({id:t.id,quantity:t.quantity,properties:{bundle:d.find(".bundle-addition-info").html(),_bundle:a}},function(){swal({type:"success",html:"<p>"+translator("cart_success")+"</p>",title:translator("title_cart"),timer:5e3,showCancelButton:!1,showConfirmButton:!1}),"function"==typeof Shopify.NitroBundleCartChanged?Shopify.NitroBundleCartChanged():setTimeout(function(){window.location.reload()},2e3)}))};1<r.length?e():swal({type:"info",html:translator("bundle_empty_message"),title:translator("bundle_empty_title"),timer:5e3,showCancelButton:!1,showConfirmButton:!1})}}),n.on("click",function(){if(new Date(i.start)>new Date||new Date(i.end)<new Date)swal({type:"info",html:"<p>"+(new Date(i.start)>new Date?translator("button_click_prepare_start"):translator("button_click_campaign_end"))+"</p>",title:"Info!",timer:5e3,showCancelButton:!1,showConfirmButton:!1});else{swal({title:translator("processing"),html:translator("please_wait"),width:600}),swal.enableLoading();var r=[],a=[],o="";d.find(".bundle-checkbox:checked").each(function(t,e){var n=$(this);r.push({id:n.val(),quantity:$(n.data("quantity")).val()}),a.push(n.data("pid")),o+=n.data("key")}),o=parseInt(o.split("").sort().join("")),$.post(CHECKOUT_SERVER,{data:r,keys:o,products:a,shop:Shopify.shop},function(t,e,n){"success"==e?"success"===t.status?(swal({type:"success",html:translator("order_created_success_title"),title:translator("order_created_success_message"),timer:5e3,showCancelButton:!1,showConfirmButton:!1}),setTimeout(function(){location.href=t.invoice_url},3e3)):0===t.status?swal({type:"warning",title:translator("title_order_error"),html:t.message,timer:5e3,showCancelButton:!1,showConfirmButton:!1}):(Debug(t),swal({type:"error",title:translator("title_order_error"),html:translator("send_data_error"),timer:5e3,showCancelButton:!1,showConfirmButton:!1})):swal({type:"error",html:translator("title_order_error"),title:translator("send_data_error"),timer:5e3,showCancelButton:!1,showConfirmButton:!1})})}}),d.find(".bundle-checkbox:first").trigger("change")}()},jQuery(".nitro-products-bundle").each(function(){$(this).NitroBundle()}),Debug("Nitro Bundle & Upsell Loaded"),console.info('Function "Shopify.NitroBundleCartChanged(){ // Your code here to Update cart when add item  }"')}(jQuery)}var nitro_count=0,nitro_inteval=function(){setTimeout(function(){window.jQuery?(JqueryNitroBundle(),setTimeout(function(){jQuery(".bundle-variant-select").trigger("change")},1e3)):nitro_count<=2e4?(nitro_inteval(),nitro_count+=500):console.log("Your site missing JQuery. Please contact: truongthangit9x@gmail.com")},500)};nitro_inteval();