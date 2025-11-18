import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { ChevronLeft } from "lucide-react";

const LoginPage = () => {
    
  //initialize Firebase Auth and navigation
  const navigate = useNavigate();

  //variables for authentication management
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // sign in with email and password
  const signInWithEmail = async () => {
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user.uid);
        navigate("/account");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  }

  const handleClick = () => {
    navigate("/register")
  }

  return (
    <div className="bg-gradient-to-b from-[#694F5D] to-[#FFE5D4] min-h-screen">
    <div className="p-6 pt-38 flex items-center justify-center flex-col">
      {/*App name*/}
      <div className="inline-block border-3 border-white rounded-full px-20 py-4 mb-6">
        <h1 className="text-6xl font-bold text-white"
            style={{fontFamily: "Limelight"}}>TITLE</h1>
      </div>
      <p className="text-white text-sm tracking-wider">A digital skincare manager</p>

      {/*Login form*/}
      <div className="w-full max-w-2xl space-y-6 mb-8 mt-6">
        <input type="email"
               placeholder="Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)} 
               className="w-full bg-[#694F5D]/20 rounded-full px-8 py-5 text-[#694F5D] placeholder-[#694F5D] placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"></input>
        
        <input type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full bg-[#694F5D]/20 rounded-full px-8 py-5 text-[#694F5D] placeholder-[#694F5D] placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"></input>
      
      {error && <p className="text-red-500">{error}</p>}
      </div>
       
      {/*Sign up link*/} 
      <div className="w-full max-w-2xl text-right mb-32">
          <button type="button" onClick={handleClick} className="text-[#694F5D] text-sm hover:underline">
            I'm new here!
          </button>
      </div>

      {/*Sign in button*/}
      <button type="button" 
              onClick={signInWithEmail}
              className="bg-[#8B7583] hover:bg-[#7A6572] transition-colors rounded-full px-8 py-5 flex items-center gap-4 text-white tracking-wider">
              <span className="text-sm font-medium">SWIPE TO UNLOCK</span>
              <div className="bg-[#FFE5D4] rounded-full p-3">
                <ChevronLeft className="w-6 h-6 text-[#694F5D]" />
              </div>
      </button>
    </div>
    </div>
  );
}

export default LoginPage;
