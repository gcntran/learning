import { useState } from 'react'
import './App.css'

// Import components
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { TodoList } from "./components/TodoList.jsx";
import { Card } from "./components/Card.jsx";

function App() {
  const [todos, setTodos] = useState([]);

  // Add new task
  function handleFormSubmit(event) {
    event.preventDefault();
    const title = event.target.title.value;
    const newTodo = { name: title, completed: false };
    setTodos([...todos, newTodo]);
    event.target.reset();
  }

  // Toggle completed state
  function toggleTodo(index) {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  }

  // Delete all completed tasks
  function deleteCompleted() {
    setTodos(todos.filter(todo => !todo.completed));
  }

  return (
    <>
      <Header title="Welcome to My Website" message="Thanks for visiting" />

      <main>
        {/* Add task form */}
        <section>
          <form id="todo-form" onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Enter your task here"
              autoComplete="off"
              required
            />
            <button className="todo-form__button" type="submit">
              Add Task
            </button>
          </form>
        </section>

        {/* Todo List section */}
        <section>
          <h2>My Tasks:</h2>
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteCompleted}
          />
        </section>

        {/* Card shows when add task */}
        <section className="cards">
          <h2>Task Cards:</h2>
          {todos.map((todo, i) => (
            <Card
              key={i}
              title={`Task #${i + 1}`}
              subtitle={todo.completed ? "Completed" : "Pending"}
              content={todo.name}
              image="src/assets/react.svg"
            />
          ))}
        </section>
      </main>

      <Footer message="Contact me at contact@mywebsite.com" />
    </>
  );
}

export default App;