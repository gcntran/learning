import '../styles/TodoList.css';

// Add a TodoList component that displays a list of todo items
export function TodoList(props) {
    return (
        <div>
        <ul>
            {props.todos.map(todo => (
                <li key={todo.id}>
                    <input type="checkbox" checked={todo.completed} readOnly />
                    {todo.text}
                </li>
            ))}
        </ul>
        <button>Delete</button>
        </div>
    );
}