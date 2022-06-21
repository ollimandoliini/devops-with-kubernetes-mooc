import React, { FormEvent, useEffect, useState } from "react";
import "./App.css";

type Todo = {
  name: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoName, setTodoName] = useState<string>("");

  useEffect(() => {
    fetch("/api/todos").then((res) => res.json().then(setTodos));
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: todoName }),
    });
    setTodos([...todos, { name: todoName }]);
    setTodoName("");
  };

  return (
    <div className="App">
      <h1>Moro</h1>
      <img src="/api/image" alt="" />

      <form onSubmit={onSubmit}>
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
            <li>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
