const todoInput = document.querySelector('.todo-name');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
// const todoWarning = document.querySelector('#todo-warning');

todoButton.addEventListener("click", addTodo);

document.addEventListener("DOMContentLoaded", function (event) {
    myPlanner = JSON.parse(localStorage.getItem('planner'));

    if (myPlanner != null) {
        appendTodo();
        appendNotes();
    }
    // appendTodo();
    // appendNotes();
});

let date = getParameterByName('date');

function addTodo(event) {
    event.preventDefault();

    let newTodoObj = {isDone: false};
    let todoText = todoInput.value;
    if (todoText == '') {
        return alert("Enter text");
    } else {
        newTodoObj.text = todoText;
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
        if (todo.isDone) completedButton.setAttribute("checked", "checked");

        let newTodo = document.createElement('li');
        newTodo.innerText = todo.text;
        newTodo.classList.add('todo-item');

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

// function deleteCheck(e) {
//     const item = e.target;
//     //DELETE ITEM
//     if (item.classList[0] === "delete-btn") {
//         const todo = item.parentElement;
//         todo.remove()
//     }
//     //COMPLETE ITEM
//     if (item.classList[0] === "complete-btn") {
//         const todo = item.parentElement;
//         todo.classList.toggle("completedItem")
//     }
// }