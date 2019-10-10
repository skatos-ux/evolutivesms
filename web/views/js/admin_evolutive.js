function configload() {
  $.get("/config", function(config, status){
    $("#inputg1").val(config[0].g1);
    $("#inputg2").val(config[0].g2);
    $("#inputg3").val(config[0].g3);
    $("#inputg4").val(config[0].g4);
    $("#inputg5").val(config[0].g5);
    $("#inputg6").val(config[0].g6);
    $("#inputmac").val(config[0].iistrlezkdekf);
    $("#inputkey").val(config[0].dkejfkthotjrr);
    if (config[0].ajdizhdbzgoor == "on"){
      $("#inputsec").attr("class", "btn btn-success group-item");
      $("#inputsec").html("Activée");
    }
    else {
      $("#inputsec").attr("class", "btn btn-danger group-item");
      $("#inputsec").html("Désactivée");
    }
  });
}
$("#inputsec").click(function() {
  if($("#inputsec").html() == "Activée"){
    $("#inputsec").attr("class", "btn btn-danger group-item");
    $("#inputsec").html("Désactivée");
  }
  else if ($("#inputsec").html() == "Désactivée") {
    $("#inputsec").attr("class", "btn btn-success group-item");
    $("#inputsec").html("Activée");
  }
});
$("#save").click(function(){
  var g1 = $("#inputg1").val();
  var g2 = $("#inputg2").val();
  var g3 = $("#inputg3").val();
  var g4 = $("#inputg4").val();
  var g5 = $("#inputg5").val();
  var g6 = $("#inputg6").val();
  var mac = $("#inputmac").val();
  var key = $("#inputkey").val();
  var sec;
  if($("#inputsec").html() == "Désactivée"){
    sec = "off";
  } else {
    sec = "on";
  }
  $.ajax({ url: '/config',
           dataType: 'text',
           type: 'POST',
           contentType: 'application/x-www-form-urlencoded',
           data: 'g1=' + g1 + '&g2=' + g2 + '&g3=' + g3 + '&g4=' + g4 + '&g5=' + g5 + '&g6=' + g6 + '&iistrlezkdekf=' + mac + '&dkejfkthotjrr=' + key + '&ajdizhdbzgoor=' + sec,
           success: function(result) {
             configload();
           }
  });
});
$("#s3").click(function() {
  $.contextMenu('destroy');
  configload();
});
configload();
