import axios from "axios";
import { useEffect, useState } from "react";
import "./done-todos.scss";

const DoneTodo = () => {
  const [doneTodos, setDoneTodos] = useState([]);
  useEffect(() => {
    fetchDoneTodos();
  }, []);

  async function fetchDoneTodos() {
    await axios
      .get(`http://localhost:3000/todos?_sort=isCompleted`)
      .then((response) => {
        setDoneTodos(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="done-todos">
      {doneTodos &&
        doneTodos.map((todo, index) => (
          <p key={index}>{todo.isCompleted ? todo.desc : ""}</p>
        ))}
    </div>
  );
};

export default DoneTodo;
