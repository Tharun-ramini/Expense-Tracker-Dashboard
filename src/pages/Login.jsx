import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login logic
    const usersRaw = localStorage.getItem("users");
    let users = [];
    if (usersRaw) {
      try {
        users = JSON.parse(usersRaw);
        if (!Array.isArray(users)) {
          users = [];
        }
      } catch (error) {
        users = [];
      }
    }

    const validUser = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!validUser) {
      alert("Invalid email or password!");
      return;
    }
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentuser", JSON.stringify(validUser));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-white/20 border border-white/30 placeholder-indigo-200 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>
        <div className="flex flex-col mt-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-white/20 border border-white/30 placeholder-indigo-200 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition "
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold p-3 rounded-lg transition shadow-lg mt-5"
        >
          Login
        </button>

        <p className=" text-center text-white/200 mt-4 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-700 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
export default Login;
