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
        var url = "/satavgpie"; // the script where you handle the form input.
        $.ajax({
               type: "POST",
               url: url,
               data: $("#inpform").serialize(), // serializes the form's elements.
               success: function(resp)
               {
                    console.log('%o',resp);
                    data = [['State', 'Average']];
                    for(var i in resp){
                        row = resp[i];
                        data.push([row.state, parseInt(row.average)])
                    }
                    console.log('%o',data);
                    drawChart(data);
               }
             });
    
        e.preventDefault(); // avoid to execute the actual submit of the form.
    });

    $(".countrylinebtn").click(function(e) {
        var url = "/countryline"; // the script where you handle the form input.
        $.ajax({
               type: "GET",
               url: url,
               success: function(resp)
               {
                    console.log('%o',resp);
                    data = [['Country', 'Number of stores']];
                    for(var i in resp){
                        row = resp[i];
                        data.push([row.CountryCode, parseInt(row.count)])
                    }
                    console.log('%o',data);
                    drawLineChart(data);
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

function drawLineChart(data) {
    var data = google.visualization.arrayToDataTable(data);
    var options = {
        title: 'Line Chart'
    };
    var chart = new google.visualization.LineChart(document.getElementById('linediv'));
    chart.draw(data, options);
}