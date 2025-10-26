import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export interface IAuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
    const { children } = props;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
            } else {
                console.log("unauthorized");
                setLoading(false);
                navigate('/login');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    if (loading) return <p>Loading...</p>

    return <div>{ children }</div>
}

export default AuthRoute;