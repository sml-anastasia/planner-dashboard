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
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

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

calendar.on('clickDayname', function (event) {
    myPlanner.date = event.date;
    updateURL(event.date);
});

document.addEventListener("DOMContentLoaded", function (event) {
    let today = getParameterByName('date');
    if (!today) {
        let dashboard = document.querySelector('#dashboard');
        let start = document.querySelector('#start');
        dashboard.style.display = 'none';
        start.style.display = 'block';
    } else {
        let dateDiv = document.getElementById('date-container');
        let fullDate = getParameterByName('date').split("-");
        let monthNumber = Number(fullDate[1]) - 1;
        dateDiv.innerHTML = months[monthNumber]+' '+fullDate[2];
    }
    if (window.innerWidth <= 480) {
        document.querySelector('.tui-full-calendar-dayname-leftmargin').setAttribute('style', 'margin-left: 20px; display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center;');
        let days = Array.from(document.querySelectorAll('.tui-full-calendar-dayname'));
        days.forEach(day => {
            day.setAttribute('style', 'font-size: 0.3rem; margin-right: 20px;');
        })
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