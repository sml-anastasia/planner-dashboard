// var Chart = require('chart.js');

const todoInput = document.querySelector('.todo-name');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
let todoDeleteButtons;
// const todoWarning = document.querySelector('#todo-warning');

todoButton.addEventListener("click", addTodo);

document.addEventListener("DOMContentLoaded", function (event) {
    let planner = JSON.parse(localStorage.getItem('planner'));
    if (planner != null) {
        myPlanner = planner;
        appendTodo();
        appendNotes();
    }
});

let date = getParameterByName('date');

function addTodo(event) {
    event.preventDefault();

    let newTodoObj = {};
    let todoText = todoInput.value;
    if (todoText == '') {
        return;
    } else {
        newTodoObj.text = todoText;
        newTodoObj.isDone = 0;
    }
    
    let dateToAdd = myPlanner.find(x=>x.date==date);
    if(dateToAdd!=undefined)
    {
        myPlanner.find(x=>x.date==date).todo.push(newTodoObj);
    }
    else
        {
            myPlanner.push({date:date,  
                        todo: [],
                        notes: [],
                        deadlines: [],
                        habits: []});
            myPlanner.find(x=>x.date==date).todo.push(newTodoObj);
        }
    console.log(newTodoObj);
    appendTodo();
}

function appendTodo() {
    let todos = document.querySelectorAll(".todo");
    if (todos.length > 0) {
        todos.forEach(t => {
            t.remove();
        })
    }

if(myPlanner.find(x=>x.date==date))
    myPlanner.find(x=>x.date==date).todo.map(todo => {
        let todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        let completedButton = document.createElement('input');
        completedButton.setAttribute("type", "checkbox");
        completedButton.setAttribute("class", "todo-check");
        completedButton.setAttribute("onchange", "doneTodo(this);");
        completedButton.setAttribute("id", `done-${todo.text}`);
        if(todo.isDone == 1) {
            completedButton.setAttribute("checked", "checked");
        }

        let newTodo = document.createElement('li');
        newTodo.innerText = todo.text;
        newTodo.classList.add('todo-item');
        if(todo.isDone == 1) {
            newTodo.classList.add("done");
        }

        let deleteButton = document.createElement('img');
        deleteButton.src = 'assets/images/icon-delete.svg';
        deleteButton.classList.add('delete-btn');

        todoDiv.appendChild(completedButton);
        todoDiv.appendChild(newTodo);
        todoDiv.appendChild(deleteButton);
        todoList.appendChild(todoDiv);
        getDeleteToDoButtons();
        localStorage.setItem('planner', JSON.stringify(myPlanner));
    })
    todoInput.value = "";
}

function doneTodo(sender) {
    let todoDone = sender.nextSibling.innerText;
    for (i = 0; i < myPlanner.find(x=>x.date==date).todo.length; i++) {
        if (myPlanner.find(x=>x.date==date).todo[i].text == todoDone) {
            if (myPlanner.find(x=>x.date==date).todo[i].isDone == 1) {
                myPlanner.find(x=>x.date==date).todo[i].isDone = 0;
                sender.nextSibling.classList.remove("done");
                localStorage.setItem('planner', JSON.stringify(myPlanner));
            } else {
                myPlanner.find(x=>x.date==date).todo[i].isDone = 1;
                sender.nextSibling.classList.add("done");
                localStorage.setItem('planner', JSON.stringify(myPlanner));
            }
        }
    }
}

function getDeleteToDoButtons() {
    todoDeleteButtons = Array.from(document.querySelectorAll('.delete-btn'));
    todoDeleteButtons.forEach(btn => {
        let todoToDelete = btn.previousSibling.innerText;
        btn.addEventListener('click', () => {
            deleteTodo(todoToDelete);
        })
    })
}

function deleteTodo(todoToDelete) {
    for(let i = 0; i < myPlanner.find(x=>x.date==date).todo.length; i++) {
        if(myPlanner.find(x=>x.date==date).todo[i].text == todoToDelete) {
            myPlanner.find(x=>x.date==date).todo.splice(i, 1);
        }
    }
    localStorage.setItem('planner', JSON.stringify(myPlanner));
    appendTodo();
}



// NOTES

let modal = document.querySelector(".modal");
let noteForm = document.querySelector(".noteForm");
let noteDiv = document.querySelector("#notes");
let cancel = document.querySelector(".cancel");
let noteDeleteButtons;

noteForm.addEventListener('submit', (event) => {
    addNote(event);
});

function addNote(event) {
    event.preventDefault();

    let newNote = {};
    
    let title = document.querySelector("#add-box__note-title");
    let note = document.querySelector("#add-box__note-input");

    if (title.value == '' || note.value == '') {
        return alert("Please, enter both fields");
    } else {
        newNote.title = title.value;
        newNote.note = note.value;
    }

    let dateToAdd = myPlanner.find(x=>x.date==date);
    if(dateToAdd!=undefined)
    {
        myPlanner.find(x=>x.date==date).notes.push(newNote);
    }
    else
        {
            myPlanner.push({date:date,
                        todo: [],
                        notes: [],
                        deadlines: [],
                        habits: []});
            myPlanner.find(x=>x.date==date).notes.push(newNote);
            
        }
    console.log(newNote);
    title.value = '';
    note.value = '';
    appendNotes();
    cancel.click();
}

function appendNotes() {
    let notes = document.querySelectorAll(".note-item");
    if (notes.length > 0) {
        notes.forEach(note => {
            note.remove();
        })
    }

    if(myPlanner.find(x=>x.date==date))
    myPlanner.find(x=>x.date==date).notes.map(note => {
        let noteBox = document.createElement('div');
        noteBox.classList = 'note-item';
        let noteTitle = document.createElement('p');
        noteTitle.innerText = note.title;
        noteTitle.classList = 'note-title';
        let noteText = document.createElement('p');
        noteText.innerText = note.note;
        noteText.classList = 'note-text';
        let noteDelete = document.createElement('img');
        noteDelete.src = 'assets/images/icon-delete.svg';
        noteDelete.classList.add('note-delete');

        noteBox.appendChild(noteTitle);
        noteBox.appendChild(noteText);
        noteBox.appendChild(noteDelete);
        noteDiv.appendChild(noteBox);
        getDeleteNoteButtons();
        localStorage.setItem('planner', JSON.stringify(myPlanner));
    })
}

function getDeleteNoteButtons() {
    noteDeleteButtons = Array.from(document.querySelectorAll('.note-delete'));
    noteDeleteButtons.forEach(button => {
        let noteToDelete = button.previousSibling.previousSibling.innerText;
        button.addEventListener('click', () => {
            
            deleteNote(noteToDelete);
        })
    })
}

function deleteNote(noteToDelete) {
    for(let i = 0; i < myPlanner.find(x=>x.date==date).notes.length; i++) {
        if(myPlanner.find(x=>x.date==date).notes[i].title == noteToDelete) {
            myPlanner.find(x=>x.date==date).notes.splice(i, 1);
        }
    }
    localStorage.setItem('planner', JSON.stringify(myPlanner));
    appendNotes();
}

///////////////////////

// var ctx = document.getElementById('myChart');
// var myChart = new Chart(ctx, {
//     type: 'doughnut',
//     data: {
//         labels: ['Red', 'Blue'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19],
//             backgroundColor: [
//                 'rgb(255, 99, 132)',
//                 'rgb(54, 162, 235)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });