let todos = [];

export async function getAllTodo (req, res, next){
    res.json(todos);
}

export async function createTodo (req, res, next){
    const todo={
        title : req.body.title,
        id : req.body.id,
        completed : "N"
    }
    todos.push(todo);
    res.json(todos);
}

export async function updateTodo (req, res, next){
    const id = req.params.id;
    let todo = todos.find(todo => todo.id==id);
    todo.title = req.body.title;
    res.json(todos);
}

export async function markTodo (req, res, next){
    const id = req.params.id;
    let todo = todos.find(todo => todo.id==id);
    todo.completed = req.body.completed;
    res.json(todos);
}

export async function searchTodo (req, res, next){
    const searchString = req.body.searchString;
    let todo = todos.find(todo => todo.title.includes(searchString));
    res.json(todo);
}

export async function deleteTodoById (req, res, next){
    const id = req.params.id;
    todos = todos.filter(todo => todo.id!=id);
    res.json(todos)
}