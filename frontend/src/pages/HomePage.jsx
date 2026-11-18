import { Link } from "react-router-dom";
import Button from "../components/atoms/Button";
import { useAuth } from "../context/AuthContext";
import "./Pages.css";

export default function HomePage() {
  const { user } = useAuth();
  return (
    <section className="hero">
      <p className="eyebrow">Simple, organized productivity</p>
      <h1>Manage every task in one place</h1>
      <p>Create tasks, set statuses and due dates, and keep your work moving forward.</p>
      <Link to={user ? "/dashboard" : "/register"}><Button>{user ? "Open dashboard" : "Create free account"}</Button></Link>
    </section>
  );
}
