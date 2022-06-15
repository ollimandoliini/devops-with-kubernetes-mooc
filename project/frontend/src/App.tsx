import React, { useEffect, useState } from "react";
import "./App.css";

const todos = ["Todo1", "Todo2", "Todo3"];





function App() {
  const [todoName, setTodoName] = useState("");
  return (
    <div className="App">
      <h1>Moro</h1>
      <img src="/image" alt="" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTodoName("");
        }}
      >
        <label>
          Todo name:
          <input
            type="text"
            name="name"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
            maxLength={140}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <div>
        <ul>
          {todos.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
