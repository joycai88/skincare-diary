import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthRoute from "./components/AuthRoute";

//pages
import ChatPage from "./pages/ChatPage";
import ProductPage from "./pages/ProductPage";
import ReviewPage from "./pages/ReviewPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import RoutinePage from "./pages/RoutinePage";

//components
import Navigation from "./components/Navigation";

function App() {

  return (
    <Routes>
      {/* Pages with navigation bar */}
      <Route
        element={
          <Navigation />
        }
      >
        <Route path="/" element={<RoutinePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route
          path="/account"
          element={
            <AuthRoute>
              <AccountPage />
            </AuthRoute>
          }
        />
      </Route>

      {/* Pages without navigation bar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
