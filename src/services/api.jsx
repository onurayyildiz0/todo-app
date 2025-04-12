import axios from 'axios';

const API_URL = 'https://v1.nocodeapi.com/onurayyildiz/google_sheets/EFOpVTXNkcyzOuxs';

export const fetchTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}?tabId=todo-api`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const fetchTodoById = async (id) => {
  try {
    const todos = await fetchTodos();
    return todos.find(todo => todo.id === id);
  } catch (error) {
    console.error(`Error fetching todo with id ${id}:`, error);
    throw error;
  }
};

export const addTodo = async (todo) => {
  try {
    const response = await axios.post(`${API_URL}?tabId=todo-api`, todo);
  
    return response.data.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await axios.put(`${API_URL}?tabId=todo-api&id=${id}`, updatedTodo);
    return response.data;
  } catch (error) {
    console.error(`Error updating todo with id ${id}:`, error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}?tabId=todo-api&row_id=${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting todo with id ${id}:`, error);
    throw error;
  }
};