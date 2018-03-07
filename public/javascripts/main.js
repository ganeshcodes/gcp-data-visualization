$(document).ready(function(){
    $('.countrypiebtn').click(function(){
        $.ajax({url: "/countrypie", success: function(resp){
            data = [['CountryCode', 'Count']];
            for(var i in resp){
                row = resp[i];
                data.push([row.CountryCode, parseInt(row.count)])
            }
            console.log('%o',data);
            drawChart(data);
        }});
    });
});

function drawChart(data) {
    var data = google.visualization.arrayToDataTable(chartdata);
    var options = {
        title: 'Country Pie'
    };
    var chart = new google.visualization.PieChart(document.getElementById('piediv'));
    chart.draw(data, options);
}