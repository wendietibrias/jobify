import useAlertStore from "../../store/useAlertStore";
import { useEffect } from "react";
import { useLocation,Outlet,Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const Auth = () => {
    const { token } : any = useAuthStore();
    const { pathname } = useLocation();
    const { closeAlertHandler } : any = useAlertStore();

    useEffect(() => {
        closeAlertHandler();
    },[pathname]);

    if(token) {
      return <Navigate to="/"/>
    }

    return (
        <Outlet/>
    )
}

export default Auth;