$(document).ready(function(){
$(".custom-img-switcher").click(function(){
  
    $(this).parent(".locate_distributor").find("ul.store-lists").slideToggle();
      $(this).parent(".locate_distributor").find(".store-switcher-icon").toggleClass("action-icon");

});
$(".custom-whislist-btn").click(function(e){
    e.preventDefault();
});
$("button.custom-whislist-btn").click(function() {
  $(".popup").fadeIn(500);
});
$(".close").click(function() {
  $(".popup").fadeOut(500);
});

   $('.nt_select_pr_1').find('.swatch__title.batt-pack-energy-extended-range').addClass('active');
$('.nt_select_pr_1').on('click',function(){
  $(this).find('.swatch__title.batt-pack-energy-extended-range').addClass('active');
    
  });
});