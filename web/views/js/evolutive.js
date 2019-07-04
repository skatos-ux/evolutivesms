function preloadImage(url){
    var img=new Image();
    img.src=url;
}
function send(){
  $("#send").html("Envoi.. &nbsp; <i class='fas fa-spinner fa-pulse'></i>");
  setTimeout(function() {
    $("#send").html("Envoyer &nbsp; <i class='fas fa-paper-plane'></i>");
    var result = "ok";
    var r_ok = "<div id='status' class='alert alert-success' role='alert'>Les SMS sont en cours d'envoiP<button id='rmstatus' class='rmstatus' type='button' onclick='rmstatus();'><i class='fa fa-times' aria-hidden='true'></i></button></div>"
    var r_error = "<div id='status' class='alert alert-danger' role='alert'>Un problême à été repéré pendant l'envoi<button id='rmstatus' class='rmstatus' type='button' onclick='rmstatus();'><i class='fa fa-times' aria-hidden='true'></i></button></div>"
    var r_unknown = "<div id='status' class='alert alert-danger' role='alert'>Un problème inattendu à été rencontré<button id='rmstatus' class='rmstatus' type='button' onclick='rmstatus();'><i class='fa fa-times' aria-hidden='true'></i></button></div>"
    if(result == "ok"){
      $('.wrapper').prepend(r_ok);
    }
    else if (result == "error") {
      $('.wrapper').prepend(r_error);
    }
    else{
      $('.wrapper').prepend(r_unknown);
    }
  }, 2000);
}
function rmstatus(){
  $("#status").remove();
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
