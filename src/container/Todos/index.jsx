import { useState, useEffect } from "react";
import Loading from "../../components/Loader";
import TodoList from "../../components/TodoList";
import ToDoForm from "../../components/TodoList/TodoForm";
import "./Todos.css";

const App = () => {
  const [todos, setTodos] = useState(null);

  const addTask = (userInput) => {
    let listCopy = [...todos];
    listCopy = [
      ...listCopy,
      { id: todos.length + 1, title: userInput, complete: false },
    ];
    setTodos(listCopy);
    localStorage.setItem("items", JSON.stringify(listCopy));
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items) {
      setTodos(items);
    } else {
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((json) => setTodos(json.slice(0, 20)));
    }
  }, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };

  return (
    <div className="container">
      {todos ? (
        <>
          <ToDoForm addTask={addTask} />
          <TodoList handleOnDragEnd={handleOnDragEnd} todos={todos} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default App;
