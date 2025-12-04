import '../styles/Footer.css';

// Add a Footer component that displays the footer of the app
export function Footer(props) {
    return (<>
    <footer>
        <p>Copyright © 2023 My Website. All rights reserved.{props.message}</p>
        </footer>
        </>)   
}