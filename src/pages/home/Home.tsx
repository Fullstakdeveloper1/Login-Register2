import { useNavigate } from "react-router-dom";
import "./Home.css"; 

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to Our App</h1>
      <p>Iltimos, tizimga kiring yoki ro‘yxatdan o‘ting.</p>

      <div className="button-group">
        <button onClick={() => navigate("/login")} className="login-btn">
          Login
        </button>
        <button onClick={() => navigate("/register")} className="register-btn">
          Register
        </button>
      </div>
    </div>
  );
}

export default Home;
