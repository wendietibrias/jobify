import "../../assets/scss/pages/auth.scss";
import { useState,ChangeEvent } from "react";
import { IRegisterState } from "../../interfaces/useStateInterfaces";
import { Input,Alert,Loading } from "../../components";
import Logo from "../../assets/image/logo.svg";
import { Link,Navigate,useNavigate } from "react-router-dom";
import useAlertStore from "../../store/useAlertStore";
import useAuthStore from "../../store/useAuthStore";
import APIAuth from "../../api/APIAuth";

const Register = () => {
    const navigate = useNavigate();
    const { token } : any = useAuthStore();
    const { openHandler,closeHandler,open } : any = useAlertStore();

    const [loading,setLoading] = useState<boolean>(false);
    const [form,setForm] = useState<IRegisterState>({
     email:"",
     password:"",
     confirm:"",
     name:""
   });

   const changeHandler = (e : ChangeEvent) => {
      const value = (e.target as HTMLInputElement).value;
      const name = (e.target as HTMLInputElement).name;

      setForm({
        ...form,
        [name]:value 
      });
   }

   const submitHandler =  async (e : any) => {
      e.preventDefault();

      if(
        form.name === '' ||
        form.email === '' ||
        form.password === '' ||
        form.confirm === ''
      ) {
        return openHandler({
            open:true,
            message:"Please provides all values",
            variant:"error"
        });
      }

      openHandler({
        open:true,
        message:"Redirecting...",
        variant:"wait"
      });

      setLoading(true);

      try {

        const { data } = await APIAuth.post(`/register` , form);

        if(data.statusCode >= 200) {
             openHandler({
              open:true,
              message:"Success login",
              variant:"success"
           });

           setTimeout(() => {
             closeHandler();
             navigate("/auth/login");
           } ,3000)
        }

      } catch(err : any) {
         const { response:{ data } } = err;
         openHandler({
            open:true,
            message:data.message,
            variant:"error"
        });
      }

      setLoading(false);
   }

   if(token) {
     return <Navigate to="/" />
   }

    return (
        <div className="container">
            <section className="container-auth">
                <img src={Logo} alt="logo"/>
                {open && <Alert/>}
                <div className='container-form-auth'>
                    <h3>Register</h3>
                    <form onSubmit={submitHandler} className="form-container">
                         <div className="form-control">
                            <label>Name</label>
                            <Input type="text" value={form.name} name="name" changeEvent={changeHandler} />
                        </div>
                        <div className="form-control">
                            <label>Email</label>
                            <Input type="email" value={form.email} name="email" changeEvent={changeHandler} />
                        </div>
                        <div className="form-control">
                            <label>Password</label>
                            <Input type="password" value={form.password} name="password" changeEvent={changeHandler} />
                        </div>
                         <div className="form-control">
                            <label>Confirm</label>
                            <Input type="password" value={form.confirm} name="confirm" changeEvent={changeHandler} />
                        </div>
                        <button type="submit" className="auth-button">
                            {loading ? <Loading type="small" width="20px" height="20px" color="#fff" />  : "Submit"}
                        </button>
                        <p className="redirect-btn">
                            Already have account? 
                            <Link to="/auth/login"><span>Login</span></Link>
                        </p>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Register;