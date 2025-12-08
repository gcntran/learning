import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Import components
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { TodoList } from "./components/TodoList.jsx";
import { Card } from "./components/Card.jsx";

// Brightspace example practice with static functional components
function App() {
  return (
    <div>
      <Header title="Welcome to My Website" message="Thanks for visiting my site." />

      <section>
        <form id="todo-form">
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

      <TodoList
        todos={[
          { id: 1, text: " Complete React assignment", completed: false },
          { id: 2, text: " Study for Javascript Framework", completed: false },
          { id: 3, text: " Do laundry", completed: true },
          { id: 4, text: " Finish the portfolio", completed: false }
        ]}
      />

      <Card
        title="My Card Title"
        subtitle="My Card Subtitle"
        content="This is the content of my card."
        image="src/assets/react.svg"
      />

      <Footer message="Contact me at contact@mywebsite.com" />
    </div>
  )
}
export default App
