const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

//retreive todos

const saved = localStorage.getItem("todos")

let todos;
if(saved !== null){
    todos = JSON.parse(saved)
}

else{
    todos = [];
}

//save todos
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

//create todos

function createTodoNode(todo, index){
    const item = document.createElement("li")
    
    const deleteBtn = document.createElement("button")
    deleteBtn.addEventListener("click", function() {
        todos.splice(index, 1)
        saveTodos();
        render();
    });

    item.textContent = todo;
    deleteBtn.textContent = "Delete";
    
    item.appendChild(deleteBtn)
    return item;
}

function render(){
    list.innerHTML = "";

    todos.forEach(function(todo, index){
        const node = createTodoNode(todo, index)
        list.appendChild(node)
    })
}

function addTodo(){
    let text = input.value.trim()
    if(text == ""){
        return;
    }

    todos.push(text)
    saveTodos();
    render();

    input.value = ""
}

addBtn.addEventListener("click", function() {
    addTodo();
});

input.addEventListener("keydown", function(event) {
    if(event.key === "Enter"){
        addTodo();
    }
});

render();