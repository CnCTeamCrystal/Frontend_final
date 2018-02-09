//chart
$("#start_ajax").click(function(){
  isloading.start();
  var company = $("#Company").val();
  $("#compTitle").text(company);
    $.ajax({
        type:"POST",
        url:"http://169.56.88.197:8080/chart ",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {name:company},
        dataType : "json",
        success: function(xml){
            var result = xml;
            Plotly.plot(ids="Chart",result.data,result.layout || {});
//            alert("hhello");
            keyword();
            positive();
            negative();
        },
        error: function(xhr, status, error) {
            alert(error);
        }
    });
    isloading.stop();
});
//period
$("#start_ajax2").click(function(){
  var company = $("#compTitle").text();
  isloading.start();
  document.getElementById("keyword_list_all2").innerHTML="";
  $.ajax({
      type:"GET",
      url:"http://169.56.88.197:9090/discovery/period/"+company+"/"+$("#sdate").val()+"/"+$("#edate").val(),
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      dataType : "json",
      success: function(xml){
          var result = xml;
          for(var i in result.results){
            //document.write("url:"+result.results[i].url+"<br>");
            var kd;
            for(key in result.results[i].highlight){

              if(key == "enriched_title.keywords.text"  ){
                //document.write(result.results[i].highlight[key]+" ");
                kd = "#"+result.results[i].highlight[key];
                //document.getElementById("keyword_list_all2").innerHTML += "<a style=color:rgb(255,255,255) href="+result.results[i].url+">"+ kd+"&nbsp;";
                if(i == 0){
                  $("#keyword_list_all2").html("<li class=media event><div class=media-body><a class=title href="+result.results[i].url+">"+kd+"</a></div>");
                }
                else{
                  $("#keyword_list_all2").append("<li class=media event><div class=media-body><a class=title href="+result.results[i].url+">"+kd+"</a></div>");
                }
              }
              // else if(key == "enriched_text.keywords.text"){
              //   //document.write(result.results[i].highlight[key]+" ");
              //   kd += "#"+result.results[i].highlight[key];
              // }
            }

          //  document.write("<br>");
          }
      },
      error: function(xhr, status, error) {
          alert(error);
      }
  });
  isloading.stop();
});
function keyword(){
   var company = $("#Company").val();
   isloading.start();
   document.getElementById("keyword_list_all").innerHTML="";
   document.getElementById("keyword_list_all2").innerHTML="";
//  alert("keyword");
    $.ajax({
        type:"GET",
        url:"http://169.56.88.197:9090/discovery/realtime/"+company,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType : "json",
        success: function(xml){
            var result = xml;
            for(var i in result.results){
              //document.write("url:"+result.results[i].url+"<br>");
              var kd;

              for(key in result.results[i].highlight){
                if(key == "enriched_title.keywords.text"  ){
                  //document.write(result.results[i].highlight[key]+" ");
                  kd = "#"+result.results[i].highlight[key];
                  //document.getElementById("keyword_list_all").innerHTML += "<a style=color:rgb(255,255,255) href="+result.results[i].url+">"+ kd+"&nbsp;";
                  if(i == 0){
                    $("#keyword_list_all").html("<li class=media event><div class=media-body><a class=title href="+result.results[i].url+">"+kd+"</a></div>");
                  }
                  else{
                    $("#keyword_list_all").append("<li class=media event><div class=media-body><a class=title href="+result.results[i].url+">"+kd+"</a></div>");
                  }
                }
                // else if(key == "enriched_text.keywords.text"){
                //   //document.write(result.results[i].highlight[key]+" ");
                //   kd += "#"+result.results[i].highlight[key];
                // }
              }

            //  document.write("<br>");
            }
        },
        error: function(xhr, status, error) {
            alert(error);
        }
    });
    isloading.stop();
}

function positive(){
   var company = $("#compTitle").text();
   document.getElementById("keyword_list_all3").innerHTML="";
   isloading.start();
  // $("#compTitle").text(company);
    $.ajax({
        type:"GET",
        url:"http://169.56.88.197:9090/discovery/positive/"+company,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType : "json",
        success: function(xml){
            var result = xml;
            for(var i in result.keywords){
              //document.getElementById("keyword_list_all3").innerHTML += "#"+result.keywords[i]+"&nbsp;";
              if(i == 0){
                $("#keyword_list_all3").html("<li class=media event><div class=media-body>"+"#"+result.keywords[i]+"</div>");
              }
              else{
                $("#keyword_list_all3").append("<li class=media event><div class=media-body>"+"#"+result.keywords[i]+"</div>");
              }
            }
        },
        error: function(xhr, status, error) {
            alert(error);
        }
    });
    isloading.stop();
}

function negative(){
  var company = $("#compTitle").text();
  isloading.start();
  document.getElementById("keyword_list_all4").innerHTML="";
    // $("#compTitle").text(company);
  //  alert("keyword");
      $.ajax({
          type:"GET",
          url:"http://169.56.88.197:9090/discovery/negative/"+company,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          dataType : "json",
          success: function(xml){
              var result = xml;
              for(var i in result.keywords){
                //document.getElementById("keyword_list_all4").innerHTML += "#"+result.keywords[i]+"&nbsp;";
                if(i == 0){
                  $("#keyword_list_all3").html("<li class=media event><div class=media-body>"+"#"+result.keywords[i]+"</div>");
                }
                else{
                  $("#keyword_list_all3").append("<li class=media event><div class=media-body>"+"#"+result.keywords[i]+"</div>");
                }
              }
          },
          error: function(xhr, status, error) {
              alert(error);
          }
      });
      isloading.stop();
}
