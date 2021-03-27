var Chart = require('chart.js');
var ctx = document.getElementById('myChart');

let allChecks = [];
let complete = 0;
let notComplete = 0;
let plannerChecks;
document.addEventListener("DOMContentLoaded", function (event) {
    plannerChecks= JSON.parse(localStorage.getItem('planner'));
    if (plannerChecks != null) {
        for(i = 0; i < plannerChecks.find(x=>x.date==date).todo.length; i++) {
            allChecks.push(plannerChecks.find(x=>x.date==date).todo[i].isDone);
        }
    }
    console.log(allChecks);
    allChecks.map(check => {
        if(check == 0) {
            notComplete += 1;
        } else if(check == 1) {
            complete += 1;
        }
    })
    console.log(complete);
    console.log(notComplete);

    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['complete', 'not complete'],
            datasets: [{
                label: 'tasks',
                data: [`${complete}`, `${notComplete}`],
                backgroundColor: [
                    'rgb(245, 182, 24)',
                    'rgb(87, 145, 184)'
                ],
                borderColor: [
                    'rgb(245, 182, 24)',
                    'rgb(87, 145, 184)'
                ],
                borderWidth: 1
            }]
        }
    });
});