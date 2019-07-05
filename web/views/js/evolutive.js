function preloadImage(url){
    var img=new Image();
    img.src=url;
}

function send(){

  var r_ok = "<div id='status' class='alert alert-success "+ ($("#status").length + 1) +"' role='alert'>Les SMS sont en cours d'envoi<button id='rmstatus' class='rmstatus' type='button' onclick='rmstatus("+ ($("#status").length + 1) +");'><i class='fa fa-times' aria-hidden='true'></i></button></div>"
  var r_error = "<div id='status' class='alert alert-danger "+ ($("#status").length + 1) +"' role='alert'>Un problême a été repéré pendant l'envoi<button id='rmstatus' class='rmstatus' type='button' onclick='rmstatus("+ ($("#status").length + 1) +");'><i class='fa fa-times' aria-hidden='true'></i></button></div>"
  var r_miss ="<div id='status' class='alert alert-danger "+ ($("#status").length + 1) +"' role='alert'>Pas de destinataires ou de message<button id='rmstatus' class='rmstatus' type='button' onclick='rmstatus("+ ($("#status").length + 1) +");'><i class='fa fa-times' aria-hidden='true'></i></button></div>"
  var r_unknown = "<div id='status' class='alert alert-danger "+ ($("#status").length + 1) +"' role='alert'>Un problème inattendu à été rencontré<button id='rmstatus' class='rmstatus' type='button' onclick='rmstatus("+ ($("#status").length + 1) +");'><i class='fa fa-times' aria-hidden='true'></i></button></div>"


  var login = $("#login").val();
  var password = $("#password").val();
  var to = $("#dest").val();
  var message = $("#message").val();
  var result;


  if(to == "" || message ==""){
    $('.wrapper').prepend(r_miss);
  }
  else {
    $("#send").html("Envoi.. &nbsp; <i class='fas fa-spinner fa-pulse'></i>");
    setTimeout(function() {
      $("#send").html("Envoyer &nbsp; <i class='fas fa-paper-plane'></i>");

      $.ajax({ url: '/send',
               dataType: 'text',
               type: 'POST',
               contentType: 'application/x-www-form-urlencoded',
               data: 'login='+ login + '&password=' + password + '&to=' + to + '&message=' + message,
               success: function(result) {
                 if(result == "ok"){
                   $('.wrapper').prepend(r_ok);
                 }
                 else if (result == "error") {
                   $('.wrapper').prepend(r_error);
                 }
                 else{
                   $('.wrapper').prepend(r_unknown);
                 }
               }
      });
    }, 2000);
  }
}

function rmstatus(id){
  $("."+id).remove();
}

$.get("/users", function(data, status){

  var columns = [];
  columns.push({title:"Nom", field:"name", headerFilter:"input", headerFilterPlaceholder:"Filtrer", editor:false});
  columns.push({title:"Téléphone", field:"phone", align:"left", headerFilter:"input", headerFilterPlaceholder:"Filtrer", editor:false});

  for(var key in data[1][0]){
    if(data[1][0][key] != ""){
      var object = {title:data[1][0][key], field:key, headerFilter:"input", headerFilterPlaceholder:"Filtrer", editor: false}
      columns.push(object);
    }
  }

  var table = new Tabulator("#contact", {
    data:data[0],           //load row data from array
    layout:"fitColumns",      //fit columns to width of table
    responsiveLayout:"hide",  //hide columns that dont fit on the table
    selectable:true,
    selectableRollingSelection:false,
    tooltips:true,            //show tool tips on cells
    addRowPos:"top",          //when adding a new row, add it to the top of the table
    history:true,             //allow undo and redo actions on the table       //paginate the data
    paginationSize:7,         //allow 7 rows per page of data
    movableColumns:true,      //allow column order to be changed
    resizableRows:true,       //allow row order to be changed
    initialSort:[             //set the initial sort order of the data
      {column:"name", dir:"asc"},
    ],
    columns: columns,
    rowSelectionChanged:function(data, rows){
      var selectedData = data;
      var destarr = [];
      for(var i in selectedData){
        destarr.push(selectedData[i].name + ": " + selectedData[i].phone);
      }
      $("#dest").val(destarr.join(", "));
    },
  });
});

$("#s2").click(function() {
  $.get("/send", function(messages, status){
    var messagetable = new Tabulator("#messagelist", {
      data: messages,           //load row data from array
      layout:"fitColumns",      //fit columns to width of table
      responsiveLayout:"hide",  //hide columns that dont fit on the table
      selectable:1,
      tooltips:true,            //show tool tips on cells
      addRowPos:"top",          //when adding a new row, add it to the top of the table
      history:true,             //allow undo and redo actions on the table       //paginate the data
      paginationSize:7,         //allow 7 rows per page of data
      movableColumns:true,      //allow column order to be changed
      resizableRows:true,       //allow row order to be changed
      initialSort:[             //set the initial sort order of the data
        {column:"Created_date", dir:"desc"},
      ],
      columns: [
        {title:"id", field:"_id", headerFilter:"input", headerFilterPlaceholder:"Filtrer", editor:false},
        {title:"Destinataire(s)", field:"to", headerFilter:"input", headerFilterPlaceholder:"Filtrer", editor:false},
        {title:"Message", field:"message", headerFilter:"input", headerFilterPlaceholder:"Filtrer", editor:false},
        {title:"Date d'envoi", field:"Created_date", headerFilter:"input", headerFilterPlaceholder:"Filtrer", formatter:"datetime", formatterParams: {inputFormat:"YYYY-MM-DD hh:mm:ss",outputFormat:"DD/MM/YYYY hh:mm:ss",invalidPlaceholder:"(invalid date)"}, editor:false},
      ],
      rowSelectionChanged:function(data, rows){
        if(data.length != 0){
          var selectedData = data;
          $("#messagedest").val(selectedData[0].to);
          $("#messagebody").val(selectedData[0].message);
        }
      },
    });
  });
});
