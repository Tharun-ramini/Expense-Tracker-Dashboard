import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulate registration logic
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    //get existing users from localStorage
    const usersRaw = localStorage.getItem("users");

    let existingUsers = [];

    if (usersRaw) {
      try {
        existingUsers = JSON.parse(usersRaw);

        if (!Array.isArray(existingUsers)) {
          existingUsers = [];
        }
      } catch (error) {
        existingUsers = [];
      }
    }
    //check if email already exists
    const userExists = existingUsers.find((u) => u.email === email);
    if (userExists) {
      alert("Email already registered! Please login.");
      return;
    }
    //create new user object
    const newUser = { name, email, password };

    //save user to localStorage
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

    alert("Registration successful! Please login.");

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition "
          />
        </div>

        <div className="flex flex-col mt-4">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition "
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition "
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className=" p-3  rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition "
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600  hover:bg-indigo-700 text-white font-semibold p-3 rounded-lg transition shadow-md mt-5"
        >
          Register
        </button>
        <p className="text-center mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline font-semibold "
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
export default Register;
