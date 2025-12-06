import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Import components
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { TodoList } from "./components/TodoList.jsx";
import { Card } from "./components/Card.jsx";

// Define state and App component to have a dynamic app
function App() {
  const [todos, setTodos] = useState([]);

  // todos is an empty list first []
  // Then we add something to the list
  // The UI will change based on the useState (dynamic)
  let listContent = <></>; 

  // If there are no todos, show a message
  if (todos.length === 0) {
    listContent = <p>No tasks yet. Add your task first!</p>;
  }

  // If there are todos, map them to list items
  else {
    listContent = todos.map((todo, i) => {
      return (
        <li key={"todo-" + i} className="todo-item">
          <input 
            type="checkbox" 
            checked={todo.completed} 
            data-id={i} 
            id={"todo-" + i}
            onChange={() => toggleTodo(i)}
            // 
            readOnly
          />
          <label 
          htmlFor={"todo-" + i}
          className="todo-item__label">
            {todo.name}
            </label>
        </li>
      );
  })
}

// Handlers for adding todos
function handleFormSubmit(event) {
  event.preventDefault()
  const title = event.target.title.value;
  // Create a new todo object
  const newTodo = {
    name: title,
    completed: false
  };
  // Update the todos state
  setTodos([...todos, newTodo]);

  // Reset the input field
  event.target.reset();
}

// Check and uncheck todos
function toggleTodo(index) {
  const updatedTodos = [...todos];
  updatedTodos[index].completed = !updatedTodos[index].completed;
  setTodos(updatedTodos);
}

return (
  <>
  <Header title="Welcome to My Website" message="Thanks for visiting"/>
  
  <main>
    <section>
      <form id="todo-form" onSubmit={handleFormSubmit}>
        <input 
          type="text" 
          name="title" 
          placeholder="Enter your task here"
          autoComplete='off' 
          required 
        />
        <button className="todo-form__button" type="submit">Add Task</button>
    </form>
    </section>

    <section>
      <h2>My Tasks:</h2>
      <ul className="todo-list" id="todo-list">
        {listContent}
      </ul>
      
      </section>

      <Card 
        title="My Card Title" 
        subtitle="My Card Subtitle" 
        content="This is the content of my card." 
        image="src/assets/react.svg" 
      />

  </main>
  
  <Footer message="Contact me at contact@mywebsite.com" />
  </>
)
}
export default App
