import '../styles/TodoList.css';

// Add a TodoList component that displays a list of todo items
function TodoList(props) {
    // Loop through the todos and create list items
    const items = [];
    for (let i = 0; i < props.todos.length; i++) {
        items.push(
            <li key={i}>
            <input 
                type="checkbox"
                checked={props.todos[i].completed}/>
            <span>{props.todos[i].text}</span>
            </li>
        )
        
    // Return the list of items and a button to remove completed items
    return (<>
    <ul>
        {items}
    </ul>
    <button>Remove Completed</button>
    </>)
}}