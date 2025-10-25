import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const LoginPage = () => {
    
  //initialize Firebase Auth and navigation
  const navigate = useNavigate();

  //variables for authentication management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //sign in with google
  const signInWithGoogle = async () => {
    setLoading(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        console.log(result.user.uid);
        navigate("/account");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  // sign in with email and password
  const signInWithEmail = async () => {
    setLoading(true);
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user.uid);
        navigate("/account");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  }

  const handleClick = () => {
    navigate("/register")
  }

  return (
    <div className="p-6 pt-38 flex items-center justify-center">
      <form>
        <h1 className="font-bold">LOGIN TO YOUR ACCOUNT</h1>
        <p>Email</p>
        <input type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)} 
               className="bg-white border border-black"></input>
        <p>Password</p>
        <input type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="bg-white border border-black"></input>
        <br /><br />
        <button type="button" onClick={signInWithEmail} className="p-2 bg-blue-200">Login</button>
        <button onClick={signInWithGoogle} 
                className="p-2 bg-blue-200"
                disabled={loading}>
                Sign in with Google
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <p>
            Don't have an account?{' '}
            <button type="button" onClick={handleClick} className="underline text-blue-500">Sign Up</button>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
