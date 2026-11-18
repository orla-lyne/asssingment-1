import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import "./Organisms.css";

export default function TaskForm({ initialValue, onSubmit, submitting, submitLabel }) {
  const [values, setValues] = useState({ title: "", description: "", status: "PENDING", dueDate: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValue) {
      setValues({
        title: initialValue.title || "",
        description: initialValue.description || "",
        status: initialValue.status || "PENDING",
        dueDate: initialValue.dueDate ? initialValue.dueDate.slice(0, 10) : "",
      });
    }
  }, [initialValue]);

  const handleChange = (event) => {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!values.title.trim()) nextErrors.title = "Title is required";
    if (values.title.length > 120) nextErrors.title = "Title must be 120 characters or fewer";
    if (values.description.length > 1000) nextErrors.description = "Description is too long";
    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) onSubmit(values);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <FormField id="title" name="title" label="Title" value={values.title} onChange={handleChange} error={errors.title} maxLength={121} />
      <div className="form-field">
        <label className="label" htmlFor="description">Description</label>
        <textarea id="description" name="description" className="input textarea" value={values.description} onChange={handleChange} />
        {errors.description && <p className="field-error">{errors.description}</p>}
      </div>
      <div className="form-row">
        <div className="form-field">
          <label className="label" htmlFor="status">Status</label>
          <select id="status" name="status" className="input" value={values.status} onChange={handleChange}>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <FormField id="dueDate" name="dueDate" type="date" label="Due date" value={values.dueDate} onChange={handleChange} />
      </div>
      <Button type="submit" disabled={submitting}>{submitting ? "Saving..." : submitLabel}</Button>
    </form>
  );
}
