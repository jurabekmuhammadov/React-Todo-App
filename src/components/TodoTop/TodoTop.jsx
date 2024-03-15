/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import "./todo-top.scss";
import axios from "axios";
const TodoTop = () => {
  // eslint-disable-next-line no-unused-vars
  const [newTodo, setNewTodo] = useState({
    desc: "",
    isCompleted: false,
  });
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
    newTodo.desc = inputValue;
  };
  async function addNewTodo() {
    await axios.post(`http://localhost:3000/todos`, newTodo).catch((err) => {
      console.log(err.message);
    });
  }
  return (
    <div id="todo-top">
      <form onSubmit={addNewTodo}>
        <input
          onChange={handleInput}
          className="input-field"
          type="text"
          placeholder="Add Todo"
          required
        />
        <button className="add" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="white"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default TodoTop;
