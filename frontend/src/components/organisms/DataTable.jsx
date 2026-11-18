import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import "./Organisms.css";

export default function DataTable({ tasks, onDelete }) {
  if (!tasks.length) {
    return <div className="empty-state"><h3>No tasks yet</h3><p>Create your first task to get started.</p></div>;
  }

  return (
    <div className="table-wrap">
      <table className="task-table">
        <thead><tr><th>Title</th><th>Status</th><th>Due date</th><th>Actions</th></tr></thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td><Link className="task-title" to={`/tasks/${task.id}`}>{task.title}</Link></td>
              <td><span className={`status status-${task.status.toLowerCase()}`}>{task.status.replace("_", " ")}</span></td>
              <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "None"}</td>
              <td className="actions">
                <Link to={`/tasks/${task.id}/edit`}><Button variant="secondary">Edit</Button></Link>
                <Button variant="danger" onClick={() => onDelete(task.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
