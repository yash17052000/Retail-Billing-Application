import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <h2>Oops! Page not found</h2>
            <p>The page you're looking for doesn't exist or has been moved.</p>
            <button onClick={() => navigate('/')}>Go to homepage</button>
        </div>
    );
}

export default NotFound