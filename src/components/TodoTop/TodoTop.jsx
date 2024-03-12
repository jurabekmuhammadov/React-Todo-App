/* eslint-disable react/no-unescaped-entities */
import "./todo-top.scss";
const TodoTop = (handleAdd, addTodo) => {
  return (
    <div id="todo-top">
      <h1>Hello, I'm Todo list</h1>
      <span>0/0 complete</span>
      <form onSubmit={addTodo}>
        <input
          onChange={handleAdd}
          className="input-field"
          type="text"
          placeholder="Add Todo"
        />
        <button className="add" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoTop;
