console.log('loadded can-api.js');
$('#loading-image').hide();

var frm = $('#idForm');


frm.submit(function (e) {

        e.preventDefault();

        $.ajax({
            type: frm.attr('method'),
            url: 'https://glacial-gorge-61422.herokuapp.com/can-api',
          	dataType:'json',
            data: frm.serialize(),
          beforeSent : function(resp){
            $('#loading-image').show();
          },
          complete: function(resp){
            console.log('AJAX complete');
            console.log(resp);
            $('#loading-image').hide();
          },
            success: function(resp){
                console.log('AJAX success');
                console.log(resp);
              	
              var content = `<h2>Latest Update : `+resp.latest_update+`</h2><table>
<tbody>
<tr>
<td>Parameter</td>
<td>Value</td>
<td>Unit</td>
<tr>
<td>Voltage</td>
<td>`+resp.voltage+`</td>
<td>V</td>
</tr>
</tr>
<tr>
<td>Current</td>
<td>`+resp.current+`</td>
<td>A</td>
</tr>
<tr>
<td>System SOC</td>
<td>`+resp.parallel_combined_soc+`</td>
<td>%</td>
</tr>
<tr>
<td>Battery SOC</td>
<td>`+resp.pack_soc+`</td>
<td>%</td>
</tr>
<tr>
<td>Pack Amphours</td>
<td>`+resp.pack_amphours+`</td>
<td>Amh</td>
</tr>
<tr>
<td>Pack Health</td>
<td>`+resp.pack_health+`</td>
<td>%</td>
</tr>
<tr>
<td>Cycles</td>
<td>`+resp.total_pack_cycles+`</td>
<td>N/A</td>
</tr>
<tr>
<td>Temperature</td>
<td>`+resp.avg_pack_temperature+`</td>
<td>Celsius</td>
</tr>
<tr>
<td>Total System Current</td>
<td>`+resp.parallel_combined_current+`</td>
<td>A</td>
</tr>
<tr>
<td>Number of Connected Batteries</td>
<td>`+resp.parallel_active_strings+`</td>
<td>N/A</td>
</tr>
<tr>
<td>System Power</td>
<td>`+resp.total_power_system+`</td>
<td>kw</td>
</tr>
</tbody>
</table>`;
              
			  //var newElement = document.createElement("p");
              //newElement.innerHTML = content;
			  //document.getElementById("can-data").appendChild(newElement);
              //document.getElementById("can-data").innerHTML += content;
              $('#idForm').hide();
              $(document).ready(function() {
    				$('#can-data').prepend(content);
				});
              console.log(content)
                //window.location.href = "https://32jghjulisi7ftls-25344311386.shopifypreview.com/pages?preview_key=3c264f1b39e06b5fcdf8166e87c81971";
              	//$("#loading-image").hide();

             },
            error: function (resp) {
                console.log('AJAX error.');
                console.log(resp);
                //window.location.href = "https://32jghjulisi7ftls-25344311386.shopifypreview.com/pages?preview_key=3c264f1b39e06b5fcdf8166e87c81971";
            },
        });
    });