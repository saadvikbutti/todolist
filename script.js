
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// Retrieve todos
const saved = localStorage.getItem("todos");

let todos;
let currentFilter = "all"

if (saved !== null) {
    todos = JSON.parse(saved);
} else {
    todos = [];
}

// Save todos
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Create todos
function createTodoNode(todo, index) {
    const item = document.createElement("li");

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function() {
        todos.splice(index, 1);
        saveTodos();
        render();
    });

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", function() {
        todo.completed = checkbox.checked;
        saveTodos();
        render();
    });

    // Edit Todo
    const editBtn = document.createElement("button")
    editBtn.textContent = "Edit"

    if(todo.completed){
            editBtn.style.display = "none"
        }

    const editInput = document.createElement("input")
    editInput.value = todo.text
    editInput.style.display = "none";

    let isEditing = false;

    editBtn.addEventListener("click", function(){
        isEditing = !isEditing
        if(isEditing){
            editBtn.textContent = "Save";
            editInput.style.display = "inline";
            todoText.style.display = "none";
        }

        else{
            if(editInput.value.trim() === ""){
                isEditing = true;
                return
            }
            
            else{
                todo.text = editInput.value.trim();
                todoText.style.display = "inline"
                editInput.style.display = "none";
                editBtn.textContent = "Edit"
                saveTodos();
                render();
            }
        }   
    });


    // Todo text
    const todoText = document.createElement("span");
    todoText.textContent = todo.text;
    todoText.classList.toggle("completed", todo.completed);

    // Append elements
    item.appendChild(checkbox);
    item.appendChild(todoText);
    item.appendChild(editInput);
    item.appendChild(editBtn);
    item.appendChild(deleteBtn);

    return item;
}

// Active Todos
const active = document.getElementById("active-btn")


// Completed Todos
const completed = document.getElementById("completed-btn")

// All Todos
const all = document.getElementById("all-btn")

    
// Render todos
function render() {
    list.innerHTML = "";

    let visibleTodos = todos;

    if(currentFilter === "completed"){
        visibleTodos = todos.filter(function(todo){
        return todo.completed === true
        })
    }

    else if(currentFilter === "active"){
        visibleTodos = todos.filter(function(todo){
        return todo.completed === false
        })
    }

    else{
        visibleTodos = todos
    }

    visibleTodos.forEach(function(todo, index) {
        const node = createTodoNode(todo, todos.indexOf(todo));
        list.appendChild(node);
    });

    ProgressCounters();
    
}

// Add todo
function addTodo() {
    let text = input.value.trim();

    if (text === "") {
        return;
    }

    // Caps Logic
    let firstChar = text.charAt(0)
    firstChar = firstChar.toUpperCase()
    let string = text.slice(1)

    text = firstChar + string


    let todo = {
        text: text,
        completed: false
    };

    todos.push(todo);
    saveTodos();
    render();

    input.value = "";
}

// Progress counters
function ProgressCounters(){
    // Completed Counters
    const compCounter = document.getElementById("completed-counters")
    compCounter.textContent = todos.reduce(function(acc, todo){
        if(todo.completed === true){
            return acc + 1;
        }    

        else{
            return acc
        }
    },0)

    // Remaining Counters
    const remCounter = document.getElementById("remaining-counters")
    remCounter.textContent = todos.reduce(function(acc, todo){
        if(todo.completed === false){
            return acc + 1;
        }
        
        else{
            return acc;
        }
    },0)

    // Total Counters
    const totCounter = document.getElementById("total-counters")
    totCounter.textContent = todos.length

}

//Clear All Button
const clearCompletedBtn = document.querySelector("#clear-completed");

function clearCompletedTodos() {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
}


// Event listeners
addBtn.addEventListener("click", function() {
    addTodo();
});

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTodo();
    }
});

all.addEventListener("click", function(){
    currentFilter = "all"
        render()
    })

active.addEventListener("click", function(){
    currentFilter = "active"
    render()
})

completed.addEventListener("click", function(){
    currentFilter = "completed"
    render();
})

clearCompletedBtn.addEventListener("click", clearCompletedTodos);
// Initial render
render();
