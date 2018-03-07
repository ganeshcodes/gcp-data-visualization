$(document).ready(function(){
    /*$('.countrypiebtn').click(function(){
        $.ajax({url: "/countrypie", success: function(resp){
            data = [['CountryCode', 'Count']];
            for(var i in resp){
                row = resp[i];
                data.push([row.CountryCode, parseInt(row.count)])
            }
            console.log('%o',data);
            drawChart(data);
        }});
    });*/

    $("#inpform").submit(function(e) {
        var url = "/countrypie"; // the script where you handle the form input.
        $.ajax({
               type: "POST",
               url: url,
               data: $("#inpform").serialize(), // serializes the form's elements.
               success: function(resp)
               {
                    console.log('%o',resp);
                    data = [['CountryCode', 'Count']];
                    for(var i in resp){
                        row = resp[i];
                        data.push([row.CountryCode, parseInt(row.count)])
                    }
                    console.log('%o',data);
                    drawChart(data);
               }
             });
    
        e.preventDefault(); // avoid to execute the actual submit of the form.
    });

});

function drawChart(data) {
    var data = google.visualization.arrayToDataTable(data);
    var options = {
        title: 'Country Pie'
    };
    var chart = new google.visualization.PieChart(document.getElementById('piediv'));
    chart.draw(data, options);
}