import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/atoms/Button";
import Spinner from "../components/atoms/Spinner";
import DataTable from "../components/organisms/DataTable";
import { deleteTask, getTasks } from "../services/taskService";
import "./Pages.css";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadTasks = () => {
    setLoading(true);
    getTasks()
      .then((data) => setTasks(data.tasks))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  };

  useEffect(loadTasks, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    setError("");
    try {
      await deleteTask(id);
      setSuccess("Task deleted successfully");
      setTasks((current) => current.filter((task) => task.id !== id));
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <section>
      <div className="page-heading">
        <div><p className="eyebrow">CRUD</p><h1>Tasks</h1></div>
        <Link to="/tasks/new"><Button>Create task</Button></Link>
      </div>
      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}
      {loading ? <Spinner /> : <DataTable tasks={tasks} onDelete={handleDelete} />}
    </section>
  );
}
