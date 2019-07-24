function send(){

  var r_ok = "<div id='status' class='alert alert-success "+ ($("#status").length + 1) +"' role='alert'>Les SMS ont été envoyés<button id='rmstatus' class='rmstatus' type='button' onclick='rmstatus("+ ($("#status").length + 1) +");'><i class='fa fa-times' aria-hidden='true'></i></button></div>"
  var r_parterror = "<div id='status' class='alert alert-warning "+ ($("#status").length + 1) +"' role='alert'>Un problême mineur à été repéré pendant l'envoi<button id='rmstatus' class='rmstatus' type='button' onclick='rmstatus("+ ($("#status").length + 1) +");'><i class='fa fa-times' aria-hidden='true'></i></button></div>"
  var r_useerror = "<div id='status' class='alert alert-danger "+ ($("#status").length + 1) +"' role='alert'>Un autre envoi de sms est en cours veuillez réessayer plus tard<button id='rmstatus' class='rmstatus' type='button' onclick='rmstatus("+ ($("#status").length + 1) +");'><i class='fa fa-times' aria-hidden='true'></i></button></div>"
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
  } else {
    $("#send").html("Envoi.. &nbsp; <i class='fas fa-spinner fa-pulse'></i>");
    $.ajax({ url: '/send',
             dataType: 'text',
             type: 'POST',
             contentType: 'application/x-www-form-urlencoded',
             data: 'login='+ login + '&password=' + password + '&to=' + encodeURIComponent(to) + '&message=' + encodeURIComponent(message),
             success: function(result) {
               $("#send").html("Envoyer &nbsp; <i class='fas fa-paper-plane'></i>");
               if(result.includes("ok")){
                 $('.wrapper').prepend(r_ok);
               }
               else if (result.includes("error")) {
                 $('.wrapper').prepend(r_error);
               }
               else if (result.includes("parterr")) {
                 $('.wrapper').prepend(r_parterror);
               }
               else if (result.includes("useerr")) {
                 $('.wrapper').prepend(r_useerror);
               }
               else{
                 $('.wrapper').prepend(r_unknown);
               }
             }
      });
  }
}

function tableload(){
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
      reactiveData:true,
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
        $("#dest").val(destarr.join("; "));
      },
    });
  });
}

function table2load(){
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
        {title:"Date d'envoi", field:"Created_date", headerFilter:"input", headerFilterPlaceholder:"Filtrer", formatter:"datetime", formatterParams: {inputFormat:"YYYY-MM-DD hh:mm:ss",outputFormat:"DD/MM/YYYY hh:mm:ss",invalidPlaceholder:"(invalid date)"}, editor:false},{title:"Message", field:"message", headerFilter:"input", headerFilterPlaceholder:"Filtrer", editor:false},
        {title:"Commentaire", field:"commentaire", headerFilter:"input", headerFilterPlaceholder:"Filtrer", editor:false},

      ],
      rowSelectionChanged:function(data, rows){
        if(data.length != 0){
          var selectedData = data;
          $("#messagedest").val(selectedData[0].to);
          $("#messagebody").val(selectedData[0].message);
          $("#commentaire").val(selectedData[0].commentaire);
        }
      },
    });
  });
}

function submitmodal(){

  var login = $("#login").val();
  var password = $("#password").val();
  var name = $("#name").val();
  var phone = $("#phone").val();
  var g1 = $("#g1").val();
  var g2 = $("#g2").val();
  var g3 = $("#g3").val();
  var g4 = $("#g4").val();
  var g5 = $("#g5").val();
  var g6 = $("#g6").val();

  if(name == "" || phone == "" || g1 == ""){
    $('.wrapper').prepend(r_miss);
  } else {
    $("#submitmodal").html("Création.. &nbsp; <i class='fas fa-spinner fa-pulse'></i>");
    $.ajax({ url: '/users',
             dataType: 'text',
             type: 'PUT',
             contentType: 'application/x-www-form-urlencoded',
             data: 'name=' + name + '&phone=' + encodeURIComponent(phone) + '&g1=' + g1 + '&g2=' + g2 + '&g3=' + g3 + '&g4=' + g4 + '&g5=' + g5 + '&g6=' + g6,
             success: function(result) {
               $("#submitmodal").html("Créer le compte");
               $('#exampleModal').modal('hide');
               tableload();
             }
    });
  }
}


$('#exampleModal').modal({show: false});

tableload();
table2load();

$.contextMenu({
    selector: '#contact',
    callback: function(key, options) {
        if(key == 'add'){
          $('.modal-input').val('');
          $('#exampleModal').modal('show');
        }
    },
    items: {
        "add": {name: "Ajouter", icon: "add"}
    }
});

$.contextMenu({
    selector: '.tabulator-selected',
    callback: function(key, options) {
        if(key == 'suppr'){
          var to_delete_phone = "";
          var to_delete = $('#dest').val();
          var to_delete_user = to_delete.split("; ");
          for (var i = 0; i < to_delete_user.length; i++) {
            var to_delete_infos = to_delete_user[i].split(': ');
            to_delete_phone += to_delete_infos[1] +"; ";
          }
          $.ajax({ url: '/users',
                   dataType: 'text',
                   type: 'DELETE',
                   contentType: 'application/x-www-form-urlencoded',
                   data: 'phone=' + encodeURIComponent(to_delete_phone),
                   success: function(result) {
                     tableload();
                   }
          });
        }
    },
    items: {
        "suppr": {name: "Supprimer la séléction", icon: "quit"}
    }
});

$.contextMenu({
    selector: '#messagelist',
    callback: function(key, options) {
        if(key == 'suppr'){
          $.ajax({ url: '/send',
                   dataType: 'text',
                   type: 'DELETE',
                   contentType: 'application/x-www-form-urlencoded',
                   success: function(result) {
                     table2load();
                   }
          });
        }
    },
    items: {
        "suppr": {name: "Supprimer l'historique", icon: "quit"}
    }
});

function rmstatus(id){
  $("."+id).remove();
}

$("#s2").click(function() {
  table2load();
});
