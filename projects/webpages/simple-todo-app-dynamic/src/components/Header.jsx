import '../styles/Header.css';

// Add a Header component that displays the title of the app
export function Header(props) {
    return (<>
        <header>
            <h1>{props.title}</h1>
            <p>{props.message}</p>
        </header>
    </>)
}