import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import AuthRoute from "./components/AuthRoute";
import { useState } from "react";

//pages
import ChatPage from "./pages/ChatPage";
import ProductPage from "./pages/ProductPage";
import ReviewPage from "./pages/ReviewPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import RoutinePage from "./pages/RoutinePage";

function App() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Routine");

  return (
    <div className="bg-[#694F5D] min-h-screen">
      <div className="max-w-8xl mx-auto">
        {/*Navigation Bar*/}
        <div className="flex gap-0">
          <button
            onClick={() => {navigate("/");
                            setActiveTab("Routine")}}
            className={`px-12 py-4 rounded-t-3xl transition-colors ${
              activeTab === "Routine"
              ? "bg-[#FFE5D4] text-[#694F5D]"
              : "bg-[#7FA99B] text-white"
            }`}>
            Routine
          </button>

          <button
            onClick={() => {navigate("/products");
                            setActiveTab("Products")}}
            className={`px-12 py-4 rounded-t-3xl transition-colors ${
              activeTab === "Products"
              ? "bg-[#FFE5D4] text-[#694F5D]"
              : "bg-[#7FA99B] text-white"
            }`}>
            Products
          </button>

          <button
            onClick={() => {navigate("/chat");
                            setActiveTab("Chat")}}
            className={`px-12 py-4 rounded-t-3xl transition-colors ${
              activeTab === "Chat"
              ? "bg-[#FFE5D4] text-[#694F5D]"
              : "bg-[#7FA99B] text-white"
            }`}>
            Assistant
          </button>
        </div>

        <div className="bg-[#FFE5D4] rounded-3xl rounded-tl-none p-12 min-h-[800px]">
          <Routes>
          <Route path="/" element={<RoutinePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AuthRoute><AccountPage /></AuthRoute>} />
          <Route path="/register" element={<SignupPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
