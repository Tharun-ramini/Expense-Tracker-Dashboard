import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate(); //hooks
  const user = JSON.parse(localStorage.getItem("currentUser")); // Retrieve user data from localStorage
  //use state to manage user data
  const [type, setType] = useState("expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  //transaction form state
  const [transactions, setTransactions] = useState([]);
  //load transaction on page load
  useEffect(() => {
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];

    //filter transactions for current user
    const userTransactions = storedTransactions.filter(
      (t) => t.userEmail === user?.email,
    );
    setTransactions(userTransactions);
  }, [user?.email]);

  //calculate total income and expenses
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const balance = income - expense;

  //function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    const newTransaction = {
      id: Date.now(),
      type,
      title,
      amount: Number(amount),
      category,
      date,
      userEmail: user?.email,
    };
    //delete transaction
    const handleDelete = (id) => {
      const storedTransactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

      const updatedAllTransactions = storedTransactions.filter(
        (t) => t.id !== id,
      );
      localStorage.setItem(
        "transactions",
        JSON.stringify(updatedAllTransactions),
      );

      const userTransactions = updatedAllTransactions.filter(
        (t) => t.userEmail === user?.email,
      );
      setTransactions(userTransactions);
    };

    //update state with new transaction
    setTransactions([...transactions, newTransaction]);

    //clear form fields
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };
  //hadle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentuser");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Page Title */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold ">Expense Tracker</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transofrm hover:-translate-y-1">
          <p className="text-gray-500 text-sm">Total Balance</p>
          <h2 className="text-2xl font-bold mt-2">${balance}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transofrm hover:-translate-y-1 border-b-4 border-blue-500">
          <p className="text-gray-500 text-sm">Total Income</p>
          <h2 className="text-2xl font-bold mt-2 text-green-600">${income}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transofrm hover:-translate-y-1 border-b-4 border-red-500">
          <p className="text-gray-500 text-sm">Total Expenses</p>
          <h2 className="text-2xl font-bold mt-2 text-red-500">-${expense}</h2>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/*  Add Transaction */}
        <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Add New Transaction</h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Description"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-400 outline-none"
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200"
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200"
            />

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition"
            >
              Add Transaction
            </button>
          </form>
        </div>

        {/*  Charts & History */}
        <div className="lg:col-span-2 space-y-8">
          {/* Chart Card Placeholder */}
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Monthly Summary</h3>

            <div className="h-40 flex items-center justify-center text-gray-400">
              Chart Placeholder
            </div>
          </div>

          {/* Expense History */}
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Expense History</h3>

            {transactions.length === 0 ? (
              <p className="text-gray-500 text-center mt-4">
                No transactions yet. Add your first transaction!
              </p>
            ) : (
              transactions.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between items-center bg-white p-4 rounded-lg mb-3"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{t.title}</p>
                    <p className="text-sm text-gray-400">{t.date}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <p
                      className={
                        t.type === "income"
                          ? "text-green-600 font-semibold"
                          : "text-red-500 font-semibold"
                      }
                    >
                      {t.type === "income" ? `+$${t.amount}` : `-$${t.amount}`}
                    </p>

                    <button
                      onClick={() => handleDelete(t.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <footer className="mt-12 pb-10 border-t border-gray-200 pt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Side: Brand/Copyright */}
          <div className="flex items-center gap-2">
            <div className="bg-teal-500 p-1.5 rounded-lg">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <p className="text-gray-500 text-sm font-medium">
              © 2026 Expense Tracker. Built for portfolio.
            </p>
          </div>

          <div className="flex gap-6">
            <button className="text-xs font-semibold text-gray-400 hover:text-teal-600 transition-colors">
              PRIVACY POLICY
            </button>
            <button className="text-xs font-semibold text-gray-400 hover:text-teal-600 transition-colors">
              TERMS OF USE
            </button>
            <button className="text-xs font-semibold text-gray-400 hover:text-teal-600 transition-colors">
              SUPPORT
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
