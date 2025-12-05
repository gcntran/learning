import '../styles/Card.css';

// Add a Card component that displays a card with a title and content
export function Card(props) {
    return (
        <div className="card">

            <h2>{props.title}</h2>
            <h3>{props.subtitle}</h3>

            <div className="content">
                <p>{props.content}</p>
                <img src={props.image} alt={props.title}></img>
            </div>

        </div>
    )
}