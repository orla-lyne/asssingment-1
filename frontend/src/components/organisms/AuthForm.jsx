import { useState } from "react";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import "./Organisms.css";

export default function AuthForm({ mode, onSubmit, error }) {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (mode === "register" && !values.name.trim()) nextErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = "Enter a valid email";
    if (values.password.length < (mode === "register" ? 8 : 1)) {
      nextErrors.password = mode === "register" ? "Password must be at least 8 characters" : "Password is required";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {mode === "register" && <FormField id="name" name="name" label="Name" value={values.name} onChange={handleChange} error={errors.name} />}
      <FormField id="email" name="email" type="email" label="Email" value={values.email} onChange={handleChange} error={errors.email} autoComplete="email" />
      <FormField id="password" name="password" type="password" label="Password" value={values.password} onChange={handleChange} error={errors.password} autoComplete={mode === "register" ? "new-password" : "current-password"} />
      {error && <p className="form-error">{error}</p>}
      <Button type="submit" disabled={submitting}>{submitting ? "Please wait..." : mode === "register" ? "Create account" : "Login"}</Button>
    </form>
  );
}
