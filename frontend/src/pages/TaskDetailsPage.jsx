import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/atoms/Button";
import Spinner from "../components/atoms/Spinner";
import { getTask } from "../services/taskService";
import "./Pages.css";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getTask(id)
      .then((data) => setTask(data.task))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <p className="form-error">{error}</p>;

  return (
    <section className="detail-card">
      <p className="eyebrow">Task details</p>
      <h1>{task.title}</h1>
      <p className="detail-description">{task.description || "No description provided."}</p>
      <dl>
        <div><dt>Status</dt><dd>{task.status.replace("_", " ")}</dd></div>
        <div><dt>Due date</dt><dd>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "None"}</dd></div>
        <div><dt>Created</dt><dd>{new Date(task.createdAt).toLocaleString()}</dd></div>
      </dl>
      <div className="detail-actions">
        <Link to="/tasks"><Button variant="secondary">Back to tasks</Button></Link>
        <Link to={`/tasks/${task.id}/edit`}><Button>Edit task</Button></Link>
      </div>
    </section>
  );
}
