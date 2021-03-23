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

let myPlanner = [{
    todo: [],
    notes: [],
    deadlines: [],
    habits: []
}
];

if (!Date.prototype.toISODate) {
    Date.prototype.toISODate = function() {
        return this.getFullYear() + '-' + ('0' + (this.getMonth() + 1)).slice(-2) + '-' + ('0' + this.getDate()).slice(-2);
    }
}
let today = new Date().toISODate();

calendar.on('clickDayname', function(event) {
    myPlanner.date = event.date;
    
    generateDashboard(event.date);
    console.log(myPlanner)
});

document.addEventListener("DOMContentLoaded", function (event) {
    generateDashboard(getQueryParams('date'));
});

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

function generateDashboard(date) {
    console.log(date);
    let dashboardDiv = `<div class="todo_container container">
        <h2 class="todo_container__header">To-do</h2>
    </div>
    <section class="notes_container container">
                <h2 class="notes_container__header">Notes</h2>
                <div id="add-box__button">
                    <a href="#myModal" class="btn__link">+</a>
                </div>
                <div id="notes"></div>
            </section>
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <form class="noteForm">
                        <input name="note-title" id="add-box__note-title" placeholder="title"></input>
                        <textarea name="note" id="add-box__note-input" placeholder="write down your note"></textarea>
                        <button type="button" name="submit" class="submit" onclick="addNote();">add</button>
                        <div>
                            <a href="#close" class="cancel">cancel</a>
                        </div>
                    </form>
                </div>
            </div>
    <div class="deadlines_container container">
        <h2 class="deadlines_container__header">Deadlines</h2>
        <div id="deadline_bar"></div>
    </div>
    <div class="habits_container container">
        <h2 class="habits_container__header">Habits</h2>
    </div>`;

    document.getElementById('dashboard').innerHTML = dashboardDiv;
    document.getElementById('dashboard').setAttribute('date', date);
}