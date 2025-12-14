import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { User } from "lucide-react";

function Navigation() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Routine");
  
    return (
    <div className="bg-[#FFE5D4] min-h-screen px-8 py-5">
            <div className="max-w-8xl mx-auto">
              {/* Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex gap-5">
                <button
                  onClick={() => {
                    navigate("/");
                    setActiveTab("Routine");
                  }}
                  className={`px-12 py-4 transition-colors ${
                    activeTab === "Routine"
                      ? "bg-[#694f5d]/60 text-white"
                      : "text-[#694F5D]"
                  }`}
                >
                  Routine
                </button>

                <button
                  onClick={() => {
                    navigate("/products");
                    setActiveTab("Products");
                  }}
                  className={`px-12 py-4 transition-colors ${
                    activeTab === "Products"
                      ? "bg-[#694f5d]/60 text-white"
                      : "text-[#694F5D]"
                  }`}
                >
                  Products
                </button>

                <button
                  onClick={() => {
                    navigate("/chat");
                    setActiveTab("Chat");
                  }}
                  className={`px-12 py-4 transition-colors ${
                    activeTab === "Chat"
                      ? "bg-[#694f5d]/60 text-white"
                      : "text-[#694F5D]"
                  }`}
                >
                  Assistant
                </button>
                </div>
                <button
                  onClick={() => {
                    navigate("/login");
                    setActiveTab("Login");
                  }}
                  className="p-3 transition-colors"
                >
                    <User className="text-[#694f5d]"/>
                </button>
                </div> 
              <div className="p-12 min-h-[800px]">
                <Outlet />
              </div>
            </div>
          </div>
  );
}

export default Navigation;