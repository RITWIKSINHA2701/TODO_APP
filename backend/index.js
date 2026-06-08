import express from 'express';
import cors from 'cors';
import { getAllTodo, createTodo, updateTodo, deleteTodoById, searchTodo, markTodo } from './routes/todo.js';
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


// Get all todos
app.get('/todos', getAllTodo);

// Add a new todo
app.post('/todos', createTodo);

// Update a todo
app.put('/todos/:id', updateTodo);

// Update completed flag
app.put('/todos/markTodo/:id', markTodo);

// Delete a todo
app.delete('/todos/:id', deleteTodoById);

// Search todos
app.get('/todos/search', searchTodo); 


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});