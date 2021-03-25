let modal = document.querySelector(".modal");
let noteForm = document.querySelector(".noteForm");
let noteDiv = document.querySelector("#notes");
let cancel = document.querySelector(".cancel");
let noteDeleteButtons;
let noteList = [];

noteForm.addEventListener('submit', (event) => {
    addNote(event);
});

// let date = getParameterByName('date');

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
        let noteTitle = document.createElement('span');
        noteTitle.innerText = note.title;
        noteTitle.classList = 'note-title';
        let noteText = document.createElement('span');
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