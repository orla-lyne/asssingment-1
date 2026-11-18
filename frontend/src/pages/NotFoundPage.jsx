import { Link } from "react-router-dom";
import Button from "../components/atoms/Button";
import "./Pages.css";

export default function NotFoundPage() {
  return (
    <section className="empty-state">
      <h1>404 — Page not found</h1>
      <Link to="/"><Button>Go home</Button></Link>
    </section>
  );
}
