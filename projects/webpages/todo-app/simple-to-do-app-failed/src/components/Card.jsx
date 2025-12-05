import '../styles/Card.css';

// Add a Card component that displays a card with a title and content
export function Card(props) {
    return (<>
        <h2>{props.title}</h2>
        <h3>{props.subtitle}</h3>
        <p>{props.content}</p>
        <img>{props.img}</img>
    </>)
}