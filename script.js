
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// Retrieve todos
const saved = localStorage.getItem("todos");

let todos;

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

// Render todos
function render() {
    list.innerHTML = "";

    todos.forEach(function(todo, index) {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });
}

// Add todo
function addTodo() {
    let text = input.value.trim();

    if (text === "") {
        return;
    }

    let todo = {
        text: text,
        completed: false
    };

    todos.push(todo);
    saveTodos();
    render();

    input.value = "";
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

// Initial render
render();
