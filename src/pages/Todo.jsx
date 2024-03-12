import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import TodoTop from "../components/TodoTop/TodoTop";
import "./todo.scss";
import TodoList from "../components/TodoList/TodoList";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setAddTodo] = useState({
    id: null,
    desc: "",
    isComplated: true,
  });
  const [editMode, setEditMode] = useState(false);
  const [updatedTodo, setUpdateTodo] = useState({});
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);
  async function fetchUsers() {
    await axios
      .get(`http://localhost:3000/todos`)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  async function deleteTodo(id) {
    await axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then(() => {
        fetchUsers();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  async function submitUpdate() {
    const id = localStorage.getItem("id");
    await axios
      .put(`http://localhost:3000/todos/${id}`, updatedTodo)
      .then((response) => {
        setUpdateTodo(response.data);
        fetchUsers();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  const updateTodo = (id) => {
    localStorage.setItem("id", id);
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleAdd = (e) => {
    setAddTodo(e.target.value);
  };

  async function addTodo() {
    await axios
      .post(`http://localhost:3000/todos`, newTodo)
      .then(() => {
        fetchUsers();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return (
    <section id="todo">
      <div className="container todo__container">
        <TodoTop handleAdd={handleAdd} addTodo={addTodo} />
        <div className={`edit-input ${editMode ? "edit-open" : "edit-close"}`}>
          <form>
            <input onChange={handleChange} type="text" value={input} />
            <button className="update" onClick={submitUpdate}>
              Update
            </button>
          </form>
        </div>
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      </div>
    </section>
  );
};

export default Todo;