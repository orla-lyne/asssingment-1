import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/organisms/AuthForm";
import { useAuth } from "../context/AuthContext";
import "./Pages.css";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    setError("");
    try {
      await login({ email: values.email, password: values.password });
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <section className="auth-page">
      <h1>Welcome back</h1>
      <AuthForm mode="login" onSubmit={handleSubmit} error={error} />
      <p>Need an account? <Link to="/register">Register</Link></p>
    </section>
  );
}
