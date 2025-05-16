import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

//pages
import ChatPage from "./pages/chatPage";
import ProductPage from "./pages/ProductPage";
import ReviewPage from "./pages/ReviewPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 to-purple-50">
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-xl font-semibold text-pink-600">
            Skincare Diary
          </Link>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            onClick={handleClick}
            className="text-white bg-blue-100 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Get started
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/products"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                My Products
              </Link>
            </li>
            <li>
              <Link
                to="/reviews"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Reviews
              </Link>
            </li>
            <li>
              <Link
                to="/chat"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Chat
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="bg-white rounded-lg shadow-md p-6 pt-52">
                <h2 className="text-xl font-medium text-purple-600 mb-4">
                  Morning Routine
                </h2>
                <div className="bg-blue-100 w-50 h-50">
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 pt-20">
                <h2 className="text-xl font-medium text-purple-600 mb-4">
                  Evening Routine
                </h2>
                <div className="bg-red-100 w-50 h-50">
                </div>
              </div>
            </>
          }
        />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
