import "../../assets/scss/pages/auth.scss";
import { useState,useEffect, ChangeEvent } from "react";
import Logo from "../../assets/image/logo.svg";
import { Input,Alert,Loading } from "../../components";
import { ILoginState } from "../../interfaces/useStateInterfaces";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import APIAuth from "../../api/APIAuth";
import useAuthStore from "../../store/useAuthStore";
import useAlertStore from "../../store/useAlertStore";

const Login = () => {
   const navigate = useNavigate();
   const { setToken } : any = useAuthStore();
   const { open,openHandler,closeHandler } : any = useAlertStore();
  
   const [loading,setLoading] = useState<boolean>(false);
   const [form,setForm] = useState<ILoginState>({
     email:"",
     password:""
   });

   const changeHandler = (e : ChangeEvent) => {
      const value = (e.target as HTMLInputElement).value;
      const name = (e.target as HTMLInputElement).name;

      setForm({
        ...form,
        [name]:value 
      });
   }

   const submitHandler = async (e : any) => {
      e.preventDefault();

      if(form.email === '' || form.password === '') {
         return openHandler({
            open:true,
            message:"Please provide all value",
            variant:"error"
        });
      }

      setLoading(true);

      openHandler({
        open:true,
        message:"Redirecting...",
        variant:"wait"
      });

      try {
        const { data } = await APIAuth.post(`/login`,form);
        
        if(data && data.statusCode >= 200) {
          setLoading(false);
           openHandler({
              open:true,
              message:"Success login",
              variant:"success"
           });

           setToken(data?.data?.access_token);
           localStorage.setItem("jobify_token"  ,JSON.stringify(data?.data?.access_token));

           return setTimeout(() => {
               closeHandler();
               navigate("/");
           },  3000);
        }


      } catch(err : any) {
        setLoading(false);
        if(err) {
          openHandler({
              open:true,
              message:err?.response?.data?.message,
              variant:"error"
          });
        }
      }

   }

    return (
        <div className="container">
            <section className="container-auth">
                <img src={Logo} alt="logo"/>
                {open && <Alert/>}
                <div className='container-form-auth'>
                    <h3>Login</h3>
                    <form onSubmit={submitHandler} className="form-container">
                        <div className="form-control">
                            <label>Email</label>
                            <Input type="email" value={form.email} name="email" changeEvent={changeHandler} />
                        </div>
                        <div className="form-control">
                            <label>Password</label>
                            <Input type="password" value={form.password} name="password" changeEvent={changeHandler} />
                        </div>
                        <button type="submit" className="auth-button">
                          {loading ? <Loading type="small" width="20px" height="20px" color="#fff" />  : "Submit"}
                        </button>
                        <p className="redirect-btn">
                            Don't have account? 
                            <Link to="/auth/register"><span>Register</span></Link>
                        </p>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Login;