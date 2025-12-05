import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Import components
import { Header } from "./assets/components/Header.jsx";
import { Footer } from "./assets/components/Footer.jsx";
import { TodoList } from "./assets/components/TodoList.jsx";
import { Card } from "./assets/components/Card.jsx";

// Static App function
function App() {
return (
  <div>
  <Header title="Welcome to My Website" message="Thanks for visiting my site." />
  
  <TodoList 
        todos={[
          { id: 1, text: "Complete React assignment", completed: false },
          { id: 2, text: "Study for math test", completed: false },
          { id: 3, text: "Do laundry", completed: true }
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
