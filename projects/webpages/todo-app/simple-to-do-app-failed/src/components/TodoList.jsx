import '../styles/TodoList.css';

// Add a TodoList component that displays a list of todo items
function TodoList(props) {
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
    return (<>
    <ul>
        {items}
    </ul>
    <button>Remove Completed</button>
    </>)
}}