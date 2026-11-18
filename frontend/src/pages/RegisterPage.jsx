import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/organisms/AuthForm";
import { useAuth } from "../context/AuthContext";
import "./Pages.css";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    setError("");
    try {
      await register(values);
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <section className="auth-page">
      <h1>Create your account</h1>
      <AuthForm mode="register" onSubmit={handleSubmit} error={error} />
      <p>Already registered? <Link to="/login">Login</Link></p>
    </section>
  );
}
