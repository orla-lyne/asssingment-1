import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/atoms/Spinner";
import TaskForm from "../components/organisms/TaskForm";
import { createTask, getTask, updateTask } from "../services/taskService";
import "./Pages.css";

export default function TaskFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    getTask(id)
      .then((data) => setTask(data.task))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setError("");
    try {
      const data = id ? await updateTask(id, values) : await createTask(values);
      navigate(`/tasks/${data.task.id}`);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <section>
      <p className="eyebrow">{id ? "Edit record" : "Create record"}</p>
      <h1>{id ? "Edit task" : "New task"}</h1>
      {error && <p className="form-error">{error}</p>}
      <TaskForm initialValue={task} onSubmit={handleSubmit} submitting={submitting} submitLabel={id ? "Save changes" : "Create task"} />
    </section>
  );
}
