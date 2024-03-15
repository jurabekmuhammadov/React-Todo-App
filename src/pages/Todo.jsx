import axios from "axios";
import TodoTop from "../components/TodoTop/TodoTop";
import { useEffect } from "react";
import { useState } from "react";
import TodoList from "../components/TodoList/TodoList";
import "./todo.scss";
import DoneTodo from "../components/DoneTodo/DoneTodo";

const Todo = () => {
  useEffect(() => {
    fetchTodos();
  }, []);

  const [todos, setTodos] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState("");
  const [editId, setEditId] = useState(null);

  async function fetchTodos() {
    await axios
      .get(`http://localhost:3000/todos`)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  async function fetchEditTodo(id) {
    setIsEditOpen(!isEditOpen);
    setEditId(id);
    await axios
      .get(`http://localhost:3000/todos/${id}`)
      .then((response) => {
        setUpdatedTodo(response.data.desc);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  const updatingValue = (e) => {
    setUpdatedTodo(e.target.value);
  };
  async function updateTodo() {
    await axios
      .put(`http://localhost:3000/todos/${editId}`, {
        id: editId,
        desc: updatedTodo,
        isCompleted: false,
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <section id="todo">
      <div id="top">
        <TodoTop />
        <form
          className={`edit-input ${isEditOpen ? "open-edit" : "close-edit"}`}
          onSubmit={updateTodo}
        >
          <input onChange={updatingValue} type="text" value={updatedTodo} />
          <button type="submit">Save</button>
        </form>
      </div>
      <h3>Tasks to do - {todos.length}</h3>
      <TodoList
        todos={todos}
        fetchTodos={fetchTodos}
        fetchEditTodo={fetchEditTodo}
      />
      <h3>Done - 0</h3>
      <DoneTodo />
    </section>
  );
};

export default Todo;
