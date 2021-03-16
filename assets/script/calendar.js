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