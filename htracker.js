// let habitsNamesList = [];
// let habitsInputs = [];
let habitBox= document.querySelector("#habit_box");
let allHabits = [];

document.addEventListener("DOMContentLoaded", function (event) {
    allHabits = JSON.parse(localStorage.getItem('habits'));
    // if (allHabits != null) {
        appendHabit();
    // }
}); 

function addHabit() {
    let newHabit = {};
    let habitName = document.getElementById("habit_input");

    if (habitName.value == ""){
        return alert("Please enter your habit");
    } else {
        newHabit.name = habitName.value;
    }

    allHabits.push(newHabit);

    appendHabit();

    // habitsNamesList.push(habitName);

    // let habitString = "";
    // i=0;
    // for (habit of habitsNamesList){
    //     habitString = `<p>${habitName}</p>
    //     <form>
    //     <input type="checkbox" name="checkbox${i}">
    //     <input type="checkbox" name="checkbox${i}">
    //     <input type="checkbox" name="checkbox${i}">
    //     <input type="checkbox" name="checkbox${i}">
    //     <input type="checkbox" name="checkbox${i}">
    //     <input type="checkbox" name="checkbox${i}">
    //     <input type="checkbox" name="checkbox${i}">
    //     </form>`
    //     i++;
    // }
    // habitsInputs.push(habitString);
    // document.getElementById("habit_box").innerHTML += habitString;
    // localStorage.setItem("habit", JSON.stringify(habitsInputs));
}

function appendHabit(){
    let habits = document.querySelectorAll(".habit-item");
    if (habits.length > 0) {
        habits.forEach(habit => {
        habit.remove();
})
}

allHabits.map(habit => {
    let habitItem = document.createElement('div');
    habitItem.classList = 'habit-item';
    let habitTitle = document.createElement('span');
    habitTitle.innerText = habit.name;
    habitTitle.classList = 'habit-title';
    let habitForm = document.createElement('form');
    // habitForm.innerText = note.note;
    habitForm.classList = 'habit-form';
    // let habitDelete = document.createElement('img');
    // habitDelete.src = 'assets/images/note-icon-delete.svg';
    // habitDelete.classList.add('habit-delete');
    let habitCheck;
    for (i=0; i<7; i++){
        habitCheck = document.createElement('input');
        habitCheck.type = 'checkbox';
        habitCheck.name = `checkbox-${habit.name}`; 
        habitForm.appendChild(habitCheck);
    }

    habitItem.appendChild(habitTitle);
    habitItem.appendChild(habitForm);
    
    habitBox.appendChild(habitItem);
    // getDeleteButtons();
    localStorage.setItem('habits', JSON.stringify(allHabits));
    }) 
}