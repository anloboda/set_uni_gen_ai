import {Link} from "react-router-dom";

export function Header() {
    return (
            <header style={{
                backgroundColor: "#eee",
                padding: "10px 10px",
                textAlign: "center",
                position: "fixed",
                top: 0,
                width: "100%",
                zIndex: 1000,
            }}>
                 <Link to="/"> HOME </Link> |
                 <Link to="/search"> SEARCH </Link>
            </header>

    );
}
