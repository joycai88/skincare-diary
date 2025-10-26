import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import { useNavigate } from "react-router-dom";

function AccountPage() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("user signed out successfully");
            navigate("/login");
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    }
    return (
        <div className="p-6 pt-38 flex items-center justify-center">
            <h1>Welcome to your personal skincare diary!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default AccountPage