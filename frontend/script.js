const API_URL = 'http://localhost:3001/todos';
let id=1;
let todos = [];


// Fetch existing todos when the page loads
document.addEventListener('DOMContentLoaded', async function () {
  // fetch todos
    todos = await fetchTodos()
    let maxId = 0;
    for(let i=0;i<todos.length;i++){
        if(todos[i].id > maxId){
            maxId=todos[i].id;
        }
    }
    id=maxId+1;
    render();
});

// Fetch todos from backend
async function fetchTodos() {
    const response = await axios.get(API_URL);
    return response.data;
}

// Add a new todo to the DOM
function addTodoToDOM(todo) {
    const listEl = document.createElement("li");

    const delButtonEl = document.createElement("button");
    delButtonEl.innerHTML = "Delete"
    delButtonEl.setAttribute("class","delete-btn");
    delButtonEl.setAttribute("onClick","deleteTodo("+todo.id+")")

    const editButtonEl = document.createElement("button");
    editButtonEl.innerHTML = "Edit";
    editButtonEl.setAttribute("class","edit-btn");
    editButtonEl.setAttribute("onClick","editTodo("+todo.id+")");
    
    const completeBtnEl = document.createElement("button");
    completeBtnEl.innerHTML = "✓";
    completeBtnEl.setAttribute(
        "class",
        todo.completed === "Y" ? "complete-btn is-completed" : "complete-btn"
    );
    completeBtnEl.setAttribute(
        "title",
        todo.completed === "Y" ? "Mark as incomplete!" : "Mark as complete!"
    );
    completeBtnEl.setAttribute("onClick", "toggleTodo(" + todo.id + ", '" + todo.completed + "')");

    listEl.setAttribute("id",todo.id);
    const spanEl = document.createElement("span");
    spanEl.innerHTML = todo.title;
    spanEl.setAttribute("style","color: white;")
    listEl.appendChild(spanEl);
    listEl.appendChild(completeBtnEl);
    listEl.appendChild(editButtonEl);
    listEl.appendChild(delButtonEl);
    
    document.getElementById("todo-list").appendChild(listEl);
}

// Switch a list item into edit mode
function editTodo(todoId) {
    const listEl = document.getElementById(todoId);
    const currentTitle = listEl.querySelector("span").innerHTML;

    listEl.innerHTML = "";

    const inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("class", "edit-input");
    inputEl.value = currentTitle;

    const confirmBtn = document.createElement("button");
    confirmBtn.innerHTML = "&#10003;";
    confirmBtn.setAttribute("class", "confirm-btn");
    confirmBtn.setAttribute("onClick", "confirmEdit("+todoId+")");

    listEl.appendChild(inputEl);
    listEl.appendChild(confirmBtn);
}


// Confirm edit and update via backend
async function confirmEdit(todoId) {
    const listEl = document.getElementById(todoId);
    const newTitle = listEl.querySelector(".edit-input").value.trim();
    if(newTitle === "") {
        alert("Title cannot be empty!");
        return;
    }
    
    response = await axios.put(API_URL+"/"+todoId, { title: newTitle });
    todos = response.data;
    render();
}

// Add a new todo
document.getElementById('add-todo-btn').addEventListener('click', async function () {
    const title = document.getElementById("todo-input").value.trim();
    if(title==""){
        alert("Please enter a title for todo!");
        return;
    }
    const response = await axios.post(API_URL,{
        title : title,
        id : id
    });
    id++;
    todos = response.data;
    document.getElementById("todo-input").value="";
    render();
});

// Toggle todo completion
async function toggleTodo(id, completed) {
    const nextCompleted = completed === "Y" ? "N" : "Y";
    const response = await axios.put(API_URL + "/markTodo/" + id , {
        completed: nextCompleted
    });
    todos = response.data;
    render();
}

// Delete a todo
async function deleteTodo(id) {
    const response = await axios.delete(API_URL+"/"+id);
    todos = response.data;
    render();
}

function render(){
    document.getElementById("todo-list").innerHTML="";
    for(let i=0;i<todos.length;i++){
        todo = todos[i];
        addTodoToDOM(todo);
    }
}