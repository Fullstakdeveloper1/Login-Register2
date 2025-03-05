import React, { useState } from "react";
import { login } from "../../api/services/auteservice";
import { useNavigate } from "react-router-dom";
import './Login.css'
interface FormData {
  username: string;
  password: string;
}

interface Errors {
  username?: string | null;
  password?: string | null;
  general?: string | null;
}

function Login() {
  const [formData, setFormData] = useState<FormData>({ username: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (): boolean => {
    const error: Errors = {};
    if (!formData.username) error.username = `Username bosh bolmasligi kerak`;
    if (!formData.password) error.password = `Parol bosh bolmasligi kerak`;
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      await login(formData.username, formData.password);
      navigate("/");
    } catch (error) {
      setErrors({ general: `Login yoki parol xato` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <p>{errors.username}</p>}
  
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
  
        {errors.general && <p>{errors.general}</p>}
  
        <button type="submit" disabled={loading}>Login</button>
      </form>
    </div>
  );
  
}

export default Login;
