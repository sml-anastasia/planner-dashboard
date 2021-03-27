// let habitsNamesList = [];
// let habitsInputs = [];
let habitBox= document.querySelector("#habit_box");
let allHabits = [];

// document.addEventListener("DOMContentLoaded", function (event) {
//     allHabits = JSON.parse(localStorage.getItem('habits'));
//         if (allHabits != null) {
//         appendHabit();
//     }

//     appendHabit();
// }); 

function addHabit() {
    let newHabit = {checks:[]};
    let habitName = document.getElementById("habit_input");

    if (habitName.value == ""){
        return alert("Please enter your habit");
    } else {
        newHabit.name = habitName.value;
    }
    console.log(newHabit);
    let dateToAdd = myPlanner.find(x=>x.date==date);
    if(dateToAdd!=undefined)
    {
        myPlanner.find(x=>x.date==date).habits.push(newHabit);
    }
    else
        {
            myPlanner.push({date:date,  
                        todo: [],
                        notes: [],
                        deadlines: [],
                        habits: []});
            myPlanner.find(x=>x.date==date).todo.push(newHabit);
        }
    console.log(newHabit);
    appendHabit();
}

function appendHabit(){
    let habits = document.querySelectorAll(".habit-item");
    if (habits.length > 0) {
        habits.forEach(habit => {
        habit.remove();
})
}
    // let date = getParameterByName('date');
    
    //console.log(myPlanner.find(x=>x.date==date).habits);

    if(myPlanner.find(x=>x.date==date)) {
    myPlanner.find(x=>x.date==date).habits.map(habit => {
    let habitItem = document.createElement('div');
    habitItem.classList = 'habit-item';
    let habitTitle = document.createElement('span');
    habitTitle.innerText = habit.name;
    habitTitle.classList = 'habit-title';
    let habitForm = document.createElement('form');
    // habitForm.innerText = note.note;
    habitForm.classList = 'habit-form';
    // habitForm.setAttribute("onchange", "isChecked()");
    // let habitDelete = document.createElement('img');
    // habitDelete.src = 'assets/images/note-icon-delete.svg';
    // habitDelete.classList.add('habit-delete');
    let habitCheck;
    for (let i=0; i<7; i++){
        habitCheck = document.createElement('input');
        habitCheck.setAttribute("type", "checkbox");
        habitCheck.setAttribute("name",`checkbox-${habit.name}`);
        // if (habit.checks[i]) habitCheck.setAttribute("checked", "checked");
        //habitCheck.onclick = 
        // habitCheck.type = 'checkbox';
        // habitCheck.name = `checkbox-${habit.name}`; 
        habitForm.appendChild(habitCheck);
    }


    habitItem.appendChild(habitTitle);
    habitItem.appendChild(habitForm);
    
    habitBox.appendChild(habitItem);
    
    // getDeleteButtons();
    localStorage.setItem('planner', JSON.stringify(myPlanner));
    });
    }
}
// let checkboxes = [];

// function isChecked() {
//     let inputs = document.getElementsByName("checkbox-"+ habitName.value);
//     for (let input of inputs) {
//         if (input.checked) {
//             checkboxes.push("1");
//         } else {
//             checkboxes.push("0");
//         }
//     }
//     console.log(habitName.value);
//     console.log(checkboxes);
// }