var Chart = require('chart.js');
var ctx = document.getElementById('myChart');

let allChecks = [];
let complete = 0;
let notComplete = 0;
let plannerChecks;
document.addEventListener("DOMContentLoaded", function (event) {
    let today = getParameterByName('date');
    plannerChecks= JSON.parse(localStorage.getItem('planner'));
    
    if (plannerChecks != null) {
        let dateToAdd = plannerChecks.find(x=>x.date==date);
        if (today) {
            if(dateToAdd != undefined) {
                for(i = 0; i < plannerChecks.find(x=>x.date==date).todo.length; i++) {
                    allChecks.push(plannerChecks.find(x=>x.date==date).todo[i].isDone);
                }
            }
        }
    }
    
    if (window.innerWidth <= 800) {
        ctx.setAttribute('height', '300');
    }

    allChecks.map(check => {
        if(check == 0) {
            notComplete += 1;
        } else if(check == 1) {
            complete += 1;
        }
    })

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

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}