import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../atoms/Button";
import "./Organisms.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="navbar">
      <Link className="brand" to="/">Task Manager</Link>
      <nav className="nav-links" aria-label="Main navigation">
        {user ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/tasks">Tasks</NavLink>
            <span className="user-name">{user.name}</span>
            <Button variant="secondary" onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
