import useAlertStore from "../../store/useAlertStore";
import { useEffect } from "react";
import { useLocation,Outlet,Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const Auth = () => {
    const { token } : any = useAuthStore();
    const { pathname } = useLocation();
    const { closeHandler } : any = useAlertStore();

    useEffect(() => {
        closeHandler();
    },[pathname]);

    if(token) {
      return <Navigate to="/"/>
    }

    return (
        <Outlet/>
    )
}

export default Auth;