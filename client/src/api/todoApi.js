import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getTodos = () => axios.get(`${API}/todos`);
export const createTodo = (data) => axios.post(`${API}/todos`, data);
export const updateTodo = (id, data) => axios.put(`${API}/todos/${id}`, data);
export const deleteTodo = (id) => axios.delete(`${API}/todos/${id}`);
