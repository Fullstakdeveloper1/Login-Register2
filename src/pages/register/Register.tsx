import React, { useState } from "react";
import { register } from "../../api/services/auteservice";
import { useNavigate } from "react-router-dom";
import './Register.css'

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  username?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
  general?: string | null;
}

function Register() {
  const [formData, setFormData] = useState<FormData>({ username: "", password: "", confirmPassword: "" });
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
    if (!formData.username) error.username = `Username bosh bo‘lishi mumkin emas`;
    if (!formData.password) error.password = `Parol bosh bo‘lishi mumkin emas`;
    if (formData.password.length < 6) error.password = `Parol kamida 6 ta belgi bo‘lishi kerak`;
    if (formData.password !== formData.confirmPassword) error.confirmPassword = `Parollar mos kelmadi`;
    
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      await register(formData.username, formData.password);
      navigate("/login");
    } catch (error) {
      console.error("Register xatosi:", error);
      setErrors({ general: error instanceof Error ? error.message : "Ro‘yxatdan o‘tishda xatolik" });
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="register-container">
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
    
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
    
          {errors.general && <p>{errors.general}</p>}
    
          <button type="submit" disabled={loading}>Register</button>
        </form>
      </div>
    );
    
}

export default Register;
