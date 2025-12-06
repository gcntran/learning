import '../styles/TodoList.css';

// Add a TodoList component that displays a list of todo items
export function TodoList({ todos, onToggle, onDelete }) {
    const items = todos.map((todo, i) => (
        <li key={i} className="todo-item">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(i)}   // toggle handler from App.jsx
            />
            <span>{todo.name}</span>
        </li>
    ));

    return (
        <>
            <ul className="todo-list" id="todo-list">
                {items}
            </ul>
            <button onClick={onDelete}>Delete Completed</button>
        </>
    );
}