jQuery( document ).ready(function( $ ) {
       $( document ).on( 'click', '.plus, .minus', function() {
          $('.update-cart').prop("disabled", false);
       });
       $('[max]').keyup(function( event ) {
         $('.update-cart').prop("disabled", false);
         });

        $('table .quantity:first').focus();
        $('[max]').change(function() {
          
          var max = parseInt($(this).attr('max'), 10);
          var value = parseInt($(this).val(), 10) || 0;
          if (value > max) { 
            alert(nathan_settings.we_only_stock.replace('[max]', max));
            $(this).val(max); 
          }    
        });
   });