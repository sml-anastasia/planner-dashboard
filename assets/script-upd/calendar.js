let calendar = new tui.Calendar('#calendar', {
        taskView: false,
        scheduleView: false,
        week: {
            startDayOfWeek: 1,
        }
    });
    function moveToNextWeek() {
        calendar.next();
    };
    function moveToPrevWeek() {
        calendar.prev();
};

var myPlanner = [];
let weekArray = document.getElementsByClassName('tui-full-calendar-dayname');

if (!Date.prototype.toISODate) {
    Date.prototype.toISODate = function() {
        return this.getFullYear() + '-' + ('0' + (this.getMonth() + 1)).slice(-2) + '-' + ('0' + this.getDate()).slice(-2);
    }
}
let today = new Date().toISODate();

function updateURL(date) {
    var baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    var newUrl = baseUrl + '?date=' + date;
    window.location.href = newUrl;
}

calendar.on('clickDayname', function(event) {
    myPlanner.date = event.date;
    updateURL(event.date);
    generateDashboard(event.date);
    console.log(myPlanner);
});

document.addEventListener("DOMContentLoaded", function (event) {
    let today = getParameterByName('date');
    if (!today) {
        console.log('error');
        let dashboard = document.querySelector('#dashboard');
        dashboard.style.display = 'none';
    } else {
        generateDashboard(today);
    }
});

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function generateDashboard(date) {
    console.log(date);
    let todayTasks = myPlanner.find(x=>x.date==date);
    let todayNotes = myPlanner.find(x=>x.date==date);
    console.log(todayTasks);
    console.log(todayNotes);
    // localStorage.setItem('planner', JSON.stringify(myPlanner)); // если эту строчку использовать, то планнер при переключении на другую дату обнуляется в хранилище

    //document.getElementById('taskContainer').innerHTML = dashboardDiv;
    //document.getElementById('dashboard').setAttribute('date', date);
}

/*let weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
function addWeekDaysToCalendar() {
    for (let w of weekArray) {
        w[i].setAttribute('class', weekDays[i]);
    }

    //allHabits.find(x => x.date == date).habits.find(x => x.name == sender.name).checks.push(checkedArr);
    //localStorage.setItem('habits', JSON.stringify(allHabits));
}*/
    

window.addEventListener('load', function highlightDate(event) {
    //console.log(d);
    //console.log(weekArray);
    console.log(weekArray[2].children[0].children[1].innerHTML);

    /*let weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    for (i = 0; i < weekArray.length; i++) {
        weekArray[i].setAttribute("name", weekDays[i]);
    }*/

    for (i = 0; i < weekArray.length; i++) {
        let wDate = weekArray[i].dataset.date;
        //console.log(wDate);
        if (wDate == date) {
            //myPlanner.
            console.log(myPlanner.find(x => x.date == date));
            //myPlanner.find(x=>x.date==date).weekday = weekArray[i].children[0].children[1].innerHTML;
            //console.log('gotcha')
            //console.log(weekArray[i].children)
            weekArray[i].children[0].style.color = 'orange';
            //weekArray[i].children[0].style.fontWeight = 'bold';
            console.log(weekArray[i].children[0].style.color);
        }
        //else console.log('fail');
    }
    //console.log('fail');
    
});