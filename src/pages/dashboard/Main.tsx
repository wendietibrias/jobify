import { Outlet,Navigate,useLocation } from "react-router-dom";
import { Sidebar,Navbar } from "../../components";
import useAuthStore from "../../store/useAuthStore";
import useAlertStore from "../../store/useAlertStore";
import { useEffect,useState } from "react";
import APIUserCall from "../../api/APIUser";

const Main = () => {
    const { closeAlertHandler } : any = useAlertStore();
    const { token,setName } : any = useAuthStore();
    const { pathname } = useLocation();

    const [openSidebar,setOpenSidebar] = useState<boolean>(true);

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

    window.onresize = function() {
        if(window.innerWidth < 1250) {
            setOpenSidebar(false);
        } else {
            setOpenSidebar(true);
        }
    }

    const closeSidebarHandler = (e : any) => {
      if(openSidebar && window.innerWidth < 1250) {
          if(!e.target.className.includes("sidebar")) {
             setOpenSidebar(false);
          }
      }
    }
 
    useEffect(() => {
        closeAlertHandler();
        fetchUser();

        if(window.innerWidth < 1250) {
             setOpenSidebar(false);
        }
    } ,[pathname]);

    if(!token) {
        return (
            <Navigate to="/auth/login"/>
        )
    }

    return (
        <div className="main" onClick={closeSidebarHandler}>
           <Sidebar open={openSidebar} />
           <main className={`content ${openSidebar ? '' : 'active'}`}>
              <Navbar open={openSidebar} setOpenSidebar={setOpenSidebar} />
              <Outlet/>
           </main>
        </div>
    )
}

export default Main;