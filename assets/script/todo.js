const todoInput = document.querySelector('.todo-name');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
let todoArr = [];

todoButton.addEventListener("click", addTodo);

document.addEventListener("DOMContentLoaded", function (event) {
    todoArr = JSON.parse(localStorage.getItem('todos'));
    if (todoArr != null) {
        appendTodo();
    }
});

function addTodo(event) {
    event.preventDefault();

    let newTodoObj = {};
    let todoText = todoInput.value;
    if (todoText == '') {
        return alert("Enter text");
    } else {
        newTodoObj.text = todoText;
    }

    todoArr.push(newTodoObj);
    console.log(newTodoObj);
    console.log(todoArr);
    appendTodo();
}

function appendTodo() {
    let todos = document.querySelectorAll(".todo");
    if (todos.length > 0) {
        todos.forEach(t => {
            t.remove();
        })
    }

    todoArr.map(todo => {
        let todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        let newTodo = document.createElement('li');
        newTodo.innerText = todo.text;
        newTodo.classList.add('todo-item');

        let completedButton = document.createElement('input');
        completedButton.setAttribute("type", "checkbox");
        // habitCheck.type = 'checkbox';
        // habitCheck.name = `checkbox-${habit.name}`; 
        // completedButton.innerHTML = '<i class="fas fa-check"></i>';
        // completedButton.classList.add('complete-btn')

        let deleteButton = document.createElement('img');
        deleteButton.src = 'assets/images/icon-delete.svg';
        deleteButton.classList.add('delete-btn');
        // let deleteButton = document.createElement('p');
        // deleteButton.innerHTML = '&times';
        // let deleteButton = document.createElement('button');
        // deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        // deleteButton.classList.add('delete-btn')
        
        todoDiv.appendChild(newTodo);
        todoDiv.appendChild(completedButton);
        todoDiv.appendChild(deleteButton);
        todoList.appendChild(todoDiv);
        getDeleteToDoButtons()
        localStorage.setItem('todos', JSON.stringify(todoArr));
    })
    todoInput.value = "";
}

function getDeleteToDoButtons() {
    todoDeleteButtons = Array.from(document.querySelectorAll('.delete-btn'));
    todoDeleteButtons.forEach(btn => {
        let todoToDelete = btn.previousSibling.previousSibling.innerText;
        btn.addEventListener('click', () => {
            deleteTodo(todoToDelete);
        })
    })
}

function deleteTodo(todoToDelete) {
    for(let i = 0; i < todoArr.length; i++) {
        if(todoArr[i].text == todoToDelete) {
            todoArr.splice(i, 1);
        }
    }
    localStorage.setItem('todos', JSON.stringify(todoArr));
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