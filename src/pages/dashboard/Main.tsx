import { Outlet,Navigate,useLocation } from "react-router-dom";
import { Sidebar,Navbar } from "../../components";
import useAuthStore from "../../store/useAuthStore";
import useAlertStore from "../../store/useAlertStore";
import { useEffect } from "react";
import APIUserCall from "../../api/APIUser";

const Main = () => {
    const { closeHandler } : any = useAlertStore();
    const { token,setName } : any = useAuthStore();
    const { pathname } = useLocation();

    const APIUser = APIUserCall(token);

    const fetchUser = async () => {
        if(token) {
            try {
                const { data } = await APIUser.get(`/detail`);
                if(data && data.statusCode === 200) {
                    setName(data.data?.name);
                }

            } catch(err : any) {
                return err;
            }
        }

        return null;
    }
 
    useEffect(() => {
        closeHandler();
        fetchUser();
    } ,[pathname])

    if(!token) {
        return (
            <Navigate to="/auth/login"/>
        )
    }

    return (
        <div className="main">
           <Sidebar/>
           <main className="content">
              <Navbar/>
              <Outlet/>
           </main>
        </div>
    )
}

export default Main;