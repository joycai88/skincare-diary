import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";

function SignupPage() {
    const navigate = useNavigate();

    //state variables for authentication
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    // Google sign up
    const signUpWithGoogle = async () => {
      setLoading(true);
      
      signInWithPopup(auth, new GoogleAuthProvider())
      .then(response => {
        console.log(response.user.uid);
        navigate('/account');
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      })
    }

    // Email and password sign up
    const signUpWithEmail = async() => {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      setLoading(true);
      setError("");

      createUserWithEmailAndPassword(auth, email, password)
      .then(response => {
        console.log(response.user.uid);
        navigate("/");
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      })
    }

    const handleAccount = () => {
      navigate('/account')
    }

    return (
      <div className="p-6 pt-20 flex flex-col items-center justify-center min-h-screen">
        <form className="flex flex-col">
          <h1 className="text-xl font-bold mb-4">CREATE AN ACCOUNT</h1>
          <p>Email</p>
          <input 
          type="email" 
          className="bg-white border border-black mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
          <p>Password</p>
          <input 
          type="password"
          className="bg-white border border-black mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
          <p>Confirm Password</p>
          <input 
          type="password"
          className="bg-white border border-black mb-4" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)}/>
          <button type="button" onClick={signUpWithEmail} className="p-2 bg-green-200 mb-2">Sign Up</button>
          <button type="button" onClick={signUpWithGoogle} disabled={loading} className="p-2 bg-green-200 mb-2">Sign Up with Google</button>
          {error && <p className="text-red-500">{error}</p>}
          <p className="text-sm">
            Already have an account?{' '}
            <button type="button" onClick={handleAccount} className="text-blue-500 underline">
              Login
            </button>
          </p>
        </form>
      </div>
    );
  }
  
  export default SignupPage;