import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/adminSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      );
      dispatch(loginSuccess(data));
      localStorage.setItem("adminInfo", JSON.stringify(data));
      localStorage.setItem("adminToken", data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Login
          </button>
          <Link to="/register" className="text-blue-500 underline">
            Not Account? Register now
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
