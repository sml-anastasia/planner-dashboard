const todoInput = document.querySelector('.todo-name');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const todoWarning = document.querySelector('#todo-warning');
let todoDeleteButtons;

todoButton.addEventListener("click", addTodo);

document.addEventListener("DOMContentLoaded", function (event) {
    let planner = JSON.parse(localStorage.getItem('planner'));
    if (planner != null) {
        myPlanner = planner;
        appendTodo();
        appendNotes();
    }
});

let date = Helper.getParameterByName('date');
let dateToAdd = myPlanner.find(x=>x.date==date);

function addTodo(event) {
    event.preventDefault();
    let newTodoObj = {};
    let todoText = todoInput.value.replace(/\s+/g, ' ').replace(/^\s/, '').replace(/\s$/, '');
    if (todoText == '') {
        return;
    } else {
        if (myPlanner.find(x => x.date == date)) {
            if (myPlanner.find(x => x.date == date).todo.find(x => x.text == todoText)) {
                todoWarning.innerHTML = 'exists';
                return
            }
            else {
                todoWarning.innerHTML = '';
                newTodoObj.text = todoText;
                newTodoObj.isDone = 0;
            }
        } else {
                newTodoObj.text = todoText;
                newTodoObj.isDone = 0;
            }
        }
    // let dateToAdd = myPlanner.find(x=>x.date==date);
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
    
    let title = document.querySelector("#add-box__note-title").value;
    let note = document.querySelector("#add-box__note-input").value;

    if (title == '' || note == '') {
        return document.getElementById('note-warning').style.display = 'block';
    } else {
        newNote.title = title.replace(/\s+/g,' ' ).replace(/^\s/,'').replace(/\s$/,'');
        newNote.note = note.replace(/\s+/g,' ' ).replace(/^\s/,'').replace(/\s$/,'');
        title = '';
        note = '';
    }

    // let dateToAdd = myPlanner.find(x=>x.date==date);
    if(dateToAdd!=undefined) {
        myPlanner.find(x=>x.date==date).notes.push(newNote);
    }
    else {
            myPlanner.push({date:date,
                        todo: [],
                        notes: [],
                        deadlines: [],
                        habits: []});
            myPlanner.find(x=>x.date==date).notes.push(newNote);
            
        }
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