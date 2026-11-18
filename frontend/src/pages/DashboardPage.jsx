import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/atoms/Button";
import Spinner from "../components/atoms/Spinner";
import { useAuth } from "../context/AuthContext";
import { getTasks } from "../services/taskService";
import "./Pages.css";

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getTasks()
      .then((data) => setTasks(data.tasks))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  const counts = {
    total: tasks.length,
    pending: tasks.filter((task) => task.status === "PENDING").length,
    inProgress: tasks.filter((task) => task.status === "IN_PROGRESS").length,
    completed: tasks.filter((task) => task.status === "COMPLETED").length,
  };

  return (
    <section>
      <div className="page-heading">
        <div><p className="eyebrow">Dashboard</p><h1>Hello, {user.name}</h1></div>
        <Link to="/tasks/new"><Button>Create task</Button></Link>
      </div>
      {error && <p className="form-error">{error}</p>}
      <div className="stats-grid">
        <article><strong>{counts.total}</strong><span>Total tasks</span></article>
        <article><strong>{counts.pending}</strong><span>Pending</span></article>
        <article><strong>{counts.inProgress}</strong><span>In progress</span></article>
        <article><strong>{counts.completed}</strong><span>Completed</span></article>
      </div>
    </section>
  );
}
